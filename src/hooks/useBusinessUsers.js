import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

const storageKey = 'rq:businessUsers';

export function useBusinessUsers() {
  let placeholder = undefined;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) placeholder = JSON.parse(raw);
  } catch (e) {}

  return useQuery(['businessUsers'], () => api.getBusinessUsers(), {
    placeholderData: placeholder,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
    onSuccess(data) {
      try {
        const prev = localStorage.getItem(storageKey);
        const next = JSON.stringify(data || []);
        if (prev !== next) localStorage.setItem(storageKey, next);
      } catch (e) {}
    }
  });
}

export default useBusinessUsers;
