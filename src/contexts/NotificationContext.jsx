import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const NotificationContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const { profile, user } = useAuth();
    const { showInfo, showSuccess, showWarning, showError } = useToast();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const businessId = profile?.business_id;
    const userId = user?.id;

    // Subscribe to Push Notifications
    const subscribeToPushNotifications = async () => {
        try {
            if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
                console.warn('Push notifications not supported');
                return null;
            }

            const registration = await navigator.serviceWorker.ready;

            // Check if already subscribed
            let subscription = await registration.pushManager.getSubscription();
            
            if (!subscription) {
                // VAPID public key - you'll need to generate this
                const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
                
                if (!vapidPublicKey) {
                    console.warn('VAPID public key not configured');
                    return null;
                }

                const urlBase64ToUint8Array = (base64String) => {
                    const padding = '='.repeat((4 - base64String.length % 4) % 4);
                    const base64 = (base64String + padding)
                        .replace(/-/g, '+')
                        .replace(/_/g, '/');
                    const rawData = window.atob(base64);
                    const outputArray = new Uint8Array(rawData.length);
                    for (let i = 0; i < rawData.length; ++i) {
                        outputArray[i] = rawData.charCodeAt(i);
                    }
                    return outputArray;
                };

                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
                });

                console.log('Push subscription created:', subscription);
            }

            // Save subscription to Supabase
            if (subscription && businessId && profile?.id) {
                const subscriptionData = {
                    user_id: profile.id,
                    business_id: businessId,
                    endpoint: subscription.endpoint,
                    keys: {
                        p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')))),
                        auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth'))))
                    },
                    user_agent: navigator.userAgent
                };

                const { error } = await supabase
                    .from('push_subscriptions')
                    .upsert(subscriptionData, { 
                        onConflict: 'endpoint',
                        ignoreDuplicates: false 
                    });

                if (error) {
                    console.error('Error saving push subscription:', error);
                } else {
                    console.log('Push subscription saved to database');
                }
            }

            return subscription;
        } catch (error) {
            console.error('Error subscribing to push notifications:', error);
            return null;
        }
    };

    const showBrowserNotification = (title, body) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            try {
                new Notification(title, {
                    body: body,
                    icon: '/AppIcons/playstore.png',
                    tag: 'cronch-reminder'
                });
            } catch (e) {
                console.error('Error showing browser notification:', e);
            }
        }
    };

    const handleNewNotification = (notification) => {
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);

        showBrowserNotification(notification.title, notification.message);

        switch (notification.type) {
            case 'success':
                showSuccess(notification.message);
                break;
            case 'warning':
                showWarning(notification.message);
                break;
            case 'error':
                showError(notification.message);
                break;
            default:
                showInfo(notification.message);
        }
    };

    useEffect(() => {
        if (!userId) {
            setNotifications([]);
            setUnreadCount(0);
            setLoading(false);
            return;
        }

        if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    subscribeToPushNotifications();
                }
            });
        }

        const fetchNotifications = async () => {
            try {
                const { data, error } = await supabase
                    .from('notifications')
                    .select('*')
                    .eq('user_id', userId)  // Cambio: usar user_id en lugar de business_id
                    .order('created_at', { ascending: false })
                    .limit(50);

                if (error) throw error;

                setNotifications(data || []);
                const count = (data || []).filter(n => !n.is_read).length;
                setUnreadCount(count);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        const checkDailyClosingReminder = () => {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();

            if (currentHour !== 16 || currentMinute > 10) return;

            const todayStr = now.toISOString().split('T')[0];
            const lastReminded = localStorage.getItem(`closing_reminder_${todayStr}`);

            if (!lastReminded) {
                const title = '🔔 Recordatorio: Registra tu día';
                const body = 'Son las 4 PM. No olvides registrar todas las ventas, gastos y producción de hoy.';

                showBrowserNotification(title, body);
                showInfo('Recordatorio: Ingresa todos los datos del día (Ventas, Gastos, Producción).');
                localStorage.setItem(`closing_reminder_${todayStr}`, 'true');
            }
        };

        fetchNotifications();
        checkDailyClosingReminder();

        const subscription = supabase
            .channel('public:notifications')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notifications',
                    filter: `user_id=eq.${userId}`  // Cambio: usar user_id en lugar de business_id
                },
                (payload) => {
                    handleNewNotification(payload.new);
                }
            )
            .subscribe();

        const reminderInterval = setInterval(() => {
            checkDailyClosingReminder();
        }, 5 * 60 * 1000);

        return () => {
            supabase.removeChannel(subscription);
            clearInterval(reminderInterval);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, showInfo, showSuccess, showWarning, showError]);

    const countUnread = (list) => {
        const count = list.filter(n => !n.is_read).length;
        setUnreadCount(count);
    };

    const markAsRead = async (id) => {
        // Optimistic update
        const updatedList = notifications.map(n =>
            n.id === id ? { ...n, is_read: true } : n
        );
        setNotifications(updatedList);
        countUnread(updatedList);

        try {
            const { error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            // Revert changes if needed? Usually low risk.
        }
    };

    const markAllAsRead = async () => {
        // Optimistic update
        const updatedList = notifications.map(n => ({ ...n, is_read: true }));
        setNotifications(updatedList);
        setUnreadCount(0);

        try {
            // Bulk update only unread ones to save resources? 
            // Or update all unread for this business.
            const { error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('business_id', businessId)
                .eq('is_read', false);

            if (error) throw error;
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const deleteNotification = async (id) => {
        // Optimistic update
        const updatedList = notifications.filter(n => n.id !== id);
        setNotifications(updatedList);
        countUnread(updatedList);

        try {
            const { error } = await supabase
                .from('notifications')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const value = {
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        deleteNotification
    };

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
