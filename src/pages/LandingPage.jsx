/**
 * CRUNCH Landing Page
 * 
 * Archivo único con toda la landing page.
 * Copia este archivo a tu carpeta client/src/pages/
 * 
 * Dependencias necesarias (si no las tienes):
 * npm install framer-motion lucide-react
 * 
 * Uso en tu router:
 * import LandingPage from './pages/LandingPage';
 * <Route path="/" element={<LandingPage />} />
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_compañia.png';
import { 
  ChefHat, Menu, X, ChevronRight, Play, BarChart3, Package, 
  ShoppingCart, Receipt, FileText, TrendingUp, Clock, Shield,
  Star, Quote, Check, Sparkles, ArrowRight, Zap, 
  Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin
} from 'lucide-react';
// ========== ESTILOS INLINE ==========
const styles = {
  // Colores del tema
  colors: {
    primary: '#f97316',
    primaryDark: '#ea580c',
    secondary: '#fbbf24',
    dark: '#0f172a',
    light: '#fefce8',
    muted: '#64748b',
    border: '#e2e8f0',
    card: '#ffffff',
  },
  
  // Gradientes
  gradients: {
    primary: 'linear-gradient(135deg, #f97316, #fbbf24)',
    hero: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fff7ed 100%)',
    dark: 'linear-gradient(135deg, #0f172a, #1e293b)',
  }
};
// ========== DATOS ==========
const features = [
  { icon: BarChart3, title: 'Dashboard Interactivo', description: 'Métricas clave (ventas, margen, productos top) en una vista clara y accionable.', color: '#3b82f6' },
  { icon: Package, title: 'Gestión de Producción', description: 'Registra lotes, calcula costo de producción y ajusta inventarios automáticamente.', color: '#f97316' },
  { icon: ShoppingCart, title: 'Control de Ventas', description: 'Registro rápido de ventas con histórico por producto y soporte para puntos de venta móviles.', color: '#22c55e' },
  { icon: Receipt, title: 'Administración de Gastos', description: 'Control de insumos y costos operativos para entender verdaderas utilidades.', color: '#a855f7' },
  { icon: FileText, title: 'Reportes Financieros', description: 'Reportes listos para tomar decisiones: ventas, gastos, rentabilidad y tendencias.', color: '#f59e0b' },
  { icon: TrendingUp, title: 'Análisis de Tendencias', description: 'Detecta picos, productos estacionales y ventanas para promociones.', color: '#ef4444' },
  { icon: Clock, title: 'Historial Completo', description: 'Accede a registros de producción, ventas y ajustes con orden consistente y paginación eficiente.', color: '#6366f1' },
  { icon: Shield, title: 'Datos Seguros', description: 'Roles, permisos y datos protegidos; cumple con buenas prácticas de seguridad.', color: '#14b8a6' },
];
const testimonials = [
  { name: 'María González', role: 'Dueña de Cafetería', content: 'CRUNCH transformó mi negocio. Ahora sé exactamente cuánto gano cada día.', avatar: 'MG' },
  { name: 'Carlos Ramírez', role: 'Chef Ejecutivo', content: 'El control de producción es increíble. Ya no tenemos desperdicios.', avatar: 'CR' },
  { name: 'Ana Martínez', role: 'Administradora', content: 'Los reportes financieros me ahorran horas de trabajo cada semana.', avatar: 'AM' },
  { name: 'Roberto Silva', role: 'Food Truck Owner', content: 'Desde que uso CRUNCH, mis ganancias aumentaron un 30%.', avatar: 'RS' },
];
const plans = [
  { 
    name: 'Básico', description: 'Perfecto para empezar', price: 'Gratis', period: '',
    features: ['Hasta 50 productos', 'Control de producción básico', 'Registro de ventas', 'Reportes mensuales', 'Soporte por email'],
    cta: 'Comenzar Gratis', popular: false 
  },
  { 
    name: 'Profesional', description: 'Para negocios en crecimiento', price: '$29', period: '/mes',
    features: ['Productos ilimitados', 'Control avanzado', 'Gestión de gastos completa', 'Reportes personalizados', 'Dashboard en tiempo real', 'Múltiples usuarios', 'Soporte prioritario'],
    cta: 'Comenzar Prueba', popular: true 
  },
  { 
    name: 'Empresarial', description: 'Para grandes operaciones', price: '$99', period: '/mes',
    features: ['Todo del plan Profesional', 'Multi-sucursales', 'API de integración', 'Reportes avanzados con IA', 'Gestor de cuenta dedicado', 'Capacitación personalizada'],
    cta: 'Contactar Ventas', popular: false 
  },
];
const navLinks = [
  { label: 'Características', href: '#features' },
  { label: 'Cómo Funciona', href: '#how-it-works' },
  { label: 'Precios', href: '#pricing' },
  { label: 'Testimonios', href: '#testimonials' },
];
// ========== COMPONENTES ==========
// Navbar
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s',
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <img src={logo} alt="Crunch" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: styles.colors.dark }}>CRUNCH</span>
          </a>
          {/* Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ 
                  color: styles.colors.muted, 
                  textDecoration: 'none', 
                  fontSize: '0.9rem', 
                  fontWeight: 500,
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.color = styles.colors.primary}
                onMouseOut={(e) => e.target.style.color = styles.colors.muted}
              >
                {link.label}
              </a>
            ))}
          </div>
          {/* CTA Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="desktop-nav">
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button style={{ 
                background: 'transparent', border: 'none', color: styles.colors.muted, 
                fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer' 
              }}>
                Iniciar Sesión
              </button>
            </Link>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <button style={{ 
                background: styles.gradients.primary, color: 'white', 
                border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px',
                fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)'
              }}>
                Crear Cuenta
              </button>
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} style={{ color: styles.colors.muted, textDecoration: 'none', fontSize: '1rem' }}
                  onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <button style={{ 
                  background: 'transparent', border: 'none', color: styles.colors.muted, 
                  fontSize: '1rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left', padding: '0.6rem 0'
                }}>
                  Iniciar Sesión
                </button>
              </Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <button style={{ 
                  background: styles.gradients.primary, color: 'white', 
                  border: 'none', padding: '0.8rem', borderRadius: '8px',
                  fontWeight: 600, cursor: 'pointer', width: '100%'
                }}>
                  Crear Cuenta
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
// Hero Section
const HeroSection = () => (
  <section style={{ 
    minHeight: '100vh', 
    background: styles.gradients.hero,
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '120px',
    paddingBottom: '80px'
  }}>
    {/* Background blobs */}
    <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: styles.colors.primary, opacity: 0.1, borderRadius: '50%', filter: 'blur(80px)' }} />
    <div style={{ position: 'absolute', bottom: '0', left: '-100px', width: '300px', height: '300px', background: styles.colors.secondary, opacity: 0.1, borderRadius: '50%', filter: 'blur(80px)' }} />
    
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center' }}
          className="hero-text"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(249, 115, 22, 0.1)', 
              padding: '0.5rem 1rem', borderRadius: '50px',
              marginBottom: '1.5rem', fontSize: '0.9rem', color: styles.colors.primary, fontWeight: 500
            }}
          >
            <span style={{ width: '8px', height: '8px', background: styles.colors.primary, borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            Sistema de Gestión #1 en Gastronomía
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.2, 
              marginBottom: '1.5rem',
              color: styles.colors.dark 
            }}
          >
            Gestiona tu negocio de{' '}
            <span style={{ background: styles.gradients.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              alimentos
            </span>{' '}
            como un profesional
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: '1.1rem', color: styles.colors.muted, marginBottom: '2rem', lineHeight: 1.7 }}
          >
            CRUNCH te permite controlar producción, ventas, gastos y generar reportes 
            financieros en tiempo real. Todo en una sola plataforma intuitiva.
          </motion.p>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}
            className="hero-buttons"
          >
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <button style={{ 
                background: styles.gradients.primary, color: 'white', 
                border: 'none', padding: '1rem 2rem', borderRadius: '10px',
                fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(249, 115, 22, 0.4)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(249, 115, 22, 0.3)'; }}
              >
                Crear Cuenta
                <ChevronRight size={18} />
              </button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}
          >
            {[{ num: '500+', label: 'Negocios activos' }, { num: '98%', label: 'Satisfacción' }, { num: '24/7', label: 'Soporte' }].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: styles.colors.dark }}>{stat.num}</p>
                <p style={{ fontSize: '0.85rem', color: styles.colors.muted }}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
        {/* Right - Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ position: 'relative' }}
        >
          <div style={{ 
            position: 'relative', 
            background: 'white', 
            borderRadius: '20px', 
            padding: '1rem',
            boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
            border: `1px solid ${styles.colors.border}`
          }}>
            {/* Dashboard Preview */}
            <div style={{ 
              background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', 
              borderRadius: '12px', 
              padding: '1.5rem',
              minHeight: '350px'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: styles.colors.dark }}>Dashboard</h3>
                  <p style={{ fontSize: '0.8rem', color: styles.colors.muted }}>Resumen del día</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['#f97316', '#22c55e', '#3b82f6'].map((c, i) => (
                    <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />
                  ))}
                </div>
              </div>
              
              {/* Stats Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Ventas', value: '$2,450', color: '#22c55e', change: '+12%' },
                  { label: 'Producción', value: '156 uds', color: '#3b82f6', change: '+8%' },
                  { label: 'Gastos', value: '$890', color: '#f97316', change: '-5%' }
                ].map((stat, i) => (
                  <div key={i} style={{ 
                    background: 'white', padding: '1rem', borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                  }}>
                    <p style={{ fontSize: '0.7rem', color: styles.colors.muted, marginBottom: '0.3rem' }}>{stat.label}</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700, color: styles.colors.dark }}>{stat.value}</p>
                    <p style={{ fontSize: '0.7rem', color: stat.color, fontWeight: 600 }}>{stat.change}</p>
                  </div>
                ))}
              </div>
              
              {/* Chart placeholder */}
              <div style={{ background: 'white', borderRadius: '10px', padding: '1rem', height: '120px', display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                    style={{ 
                      flex: 1, 
                      background: i === 11 ? styles.gradients.primary : '#e2e8f0',
                      borderRadius: '4px'
                    }} 
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            style={{ 
              position: 'absolute', bottom: '-20px', left: '-20px',
              background: 'white', padding: '1rem', borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', gap: '0.75rem'
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={20} color="#22c55e" />
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: 500, color: styles.colors.dark }}>Ventas del mes</p>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#22c55e' }}>+24.5%</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
    {/* Wave */}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
      <svg viewBox="0 0 1440 120" fill="none" style={{ display: 'block' }}>
        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
      </svg>
    </div>
  </section>
);
// Features Section
const FeaturesSection = () => (
  <section id="features" style={{ padding: '6rem 0', background: 'white' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <span style={{ 
          display: 'inline-block', background: 'rgba(249, 115, 22, 0.1)', 
          padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '1rem',
          fontSize: '0.9rem', color: styles.colors.primary, fontWeight: 500
        }}>
          Características
        </span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: styles.colors.dark, marginBottom: '1rem' }}>
          Todo lo que necesitas para{' '}
          <span style={{ background: styles.gradients.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>gestionar</span>{' '}
          tu negocio
        </h2>
        <p style={{ fontSize: '1.1rem', color: styles.colors.muted, maxWidth: '600px', margin: '0 auto' }}>
          Herramientas potentes y fáciles de usar diseñadas específicamente para negocios de alimentos y bebidas.
        </p>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ 
              background: 'white', padding: '1.5rem', borderRadius: '16px',
              border: `1px solid ${styles.colors.border}`,
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => { 
              e.currentTarget.style.transform = 'translateY(-5px)'; 
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = styles.colors.primary;
            }}
            onMouseOut={(e) => { 
              e.currentTarget.style.transform = 'translateY(0)'; 
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = styles.colors.border;
            }}
          >
            <div style={{ 
              width: '50px', height: '50px', borderRadius: '12px', 
              background: feature.color, marginBottom: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 8px 20px ${feature.color}40`
            }}>
              {/* Use ChefHat icon as visual anchor for product features */}
              <ChefHat size={24} color="white" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: styles.colors.dark, marginBottom: '0.5rem' }}>{feature.title}</h3>
            <p style={{ fontSize: '0.9rem', color: styles.colors.muted, lineHeight: 1.6 }}>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
// How It Works Section
const HowItWorksSection = () => (
  <section id="how-it-works" style={{ padding: '6rem 0', background: '#fafafa' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <span style={{ 
          display: 'inline-block', background: 'rgba(249, 115, 22, 0.1)', 
          padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '1rem',
          fontSize: '0.9rem', color: styles.colors.primary, fontWeight: 500
        }}>
          Cómo Funciona
        </span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: styles.colors.dark }}>
          Simple como{' '}
          <span style={{ background: styles.gradients.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>1, 2, 3</span>
        </h2>
      </motion.div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {[
          { num: '01', title: 'Registra tu producción', desc: 'Ingresa diariamente lo que produces. El sistema calcula automáticamente inventarios y costos.' },
          { num: '02', title: 'Registra tus ventas', desc: 'Lleva el control de cada venta realizada. Visualiza tendencias y productos más vendidos.' },
          { num: '03', title: 'Obtén reportes automáticos', desc: 'Genera reportes financieros detallados con un clic. Toma decisiones basadas en datos reales.' },
        ].map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '2rem',
              flexDirection: i % 2 === 1 ? 'row-reverse' : 'row',
              flexWrap: 'wrap', justifyContent: 'center'
            }}
          >
            <div style={{ flex: '1 1 300px', textAlign: i % 2 === 1 ? 'right' : 'left' }} className="step-text">
              <div style={{ 
                display: 'inline-flex', width: '60px', height: '60px', borderRadius: '16px',
                background: styles.gradients.primary, alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '1rem',
                boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)'
              }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: styles.colors.dark, marginBottom: '0.5rem' }}>{step.title}</h3>
              <p style={{ fontSize: '1rem', color: styles.colors.muted, lineHeight: 1.7 }}>{step.desc}</p>
            </div>
            <div style={{ 
              flex: '1 1 300px', background: 'white', borderRadius: '20px', 
              padding: '2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
              border: `1px solid ${styles.colors.border}`
            }}>
              <div style={{ 
                height: '200px', background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', 
                borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {step.num === '01' && <Package size={60} color={styles.colors.primary} />}
                {step.num === '02' && <ShoppingCart size={60} color={styles.colors.primary} />}
                {step.num === '03' && <FileText size={60} color={styles.colors.primary} />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
// Testimonials Section
const TestimonialsSection = () => (
  <section id="testimonials" style={{ padding: '6rem 0', background: 'white' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <span style={{ 
          display: 'inline-block', background: 'rgba(249, 115, 22, 0.1)', 
          padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '1rem',
          fontSize: '0.9rem', color: styles.colors.primary, fontWeight: 500
        }}>
          Testimonios
        </span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: styles.colors.dark }}>
          Lo que dicen nuestros{' '}
          <span style={{ background: styles.gradients.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>clientes</span>
        </h2>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ 
              background: 'white', padding: '1.5rem', borderRadius: '16px',
              border: `1px solid ${styles.colors.border}`,
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Quote size={30} color="#f9731620" style={{ marginBottom: '1rem' }} />
            <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
              {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#fbbf24" color="#fbbf24" />)}
            </div>
            <p style={{ fontSize: '0.95rem', color: styles.colors.muted, marginBottom: '1.5rem', lineHeight: 1.7, fontStyle: 'italic' }}>
              "{t.content}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '45px', height: '45px', borderRadius: '50%', 
                background: styles.gradients.primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', fontWeight: 600, color: 'white'
              }}>
                {t.avatar}
              </div>
              <div>
                <p style={{ fontWeight: 600, color: styles.colors.dark }}>{t.name}</p>
                <p style={{ fontSize: '0.85rem', color: styles.colors.muted }}>{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
// Pricing Section
const PricingSection = () => (
  <section id="pricing" style={{ padding: '6rem 0', background: '#fafafa' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <span style={{ 
          display: 'inline-block', background: 'rgba(249, 115, 22, 0.1)', 
          padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '1rem',
          fontSize: '0.9rem', color: styles.colors.primary, fontWeight: 500
        }}>
          Precios
        </span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: styles.colors.dark }}>
          Un plan para cada{' '}
          <span style={{ background: styles.gradients.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>negocio</span>
        </h2>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ 
              background: 'white', padding: '2rem', borderRadius: '20px',
              border: plan.popular ? `2px solid ${styles.colors.primary}` : `1px solid ${styles.colors.border}`,
              boxShadow: plan.popular ? '0 25px 50px rgba(249, 115, 22, 0.15)' : 'none',
              position: 'relative',
              display: 'flex', flexDirection: 'column'
            }}
          >
            {plan.popular && (
              <div style={{ 
                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                background: styles.gradients.primary, padding: '0.4rem 1rem', borderRadius: '50px',
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                fontSize: '0.8rem', fontWeight: 600, color: 'white'
              }}>
                <Sparkles size={14} /> Más Popular
              </div>
            )}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: styles.colors.dark }}>{plan.name}</h3>
              <p style={{ fontSize: '0.9rem', color: styles.colors.muted }}>{plan.description}</p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: styles.colors.dark }}>{plan.price}</span>
              <span style={{ color: styles.colors.muted }}>{plan.period}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', flex: 1 }}>
              {plan.features.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(249, 115, 22, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={12} color={styles.colors.primary} />
                  </div>
                  <span style={{ fontSize: '0.9rem', color: styles.colors.muted }}>{f}</span>
                </li>
              ))}
            </ul>
            <button style={{ 
              width: '100%', padding: '1rem', borderRadius: '10px', border: 'none',
              background: plan.popular ? styles.gradients.primary : styles.colors.dark,
              color: 'white', fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
              boxShadow: plan.popular ? '0 10px 30px rgba(249, 115, 22, 0.3)' : 'none',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}
      >
        {['Sin tarjeta de crédito', '14 días de prueba gratis', 'Cancela en cualquier momento'].map((text) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: styles.colors.muted }}>
            <Check size={16} color={styles.colors.primary} />
            <span style={{ fontSize: '0.9rem' }}>{text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);
// CTA Section
const CTASection = () => (
  <section style={{ 
    padding: '6rem 0', 
    background: styles.gradients.primary,
    position: 'relative', overflow: 'hidden'
  }}>
    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(60px)' }} />
    <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '250px', height: '250px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(60px)' }} />
    
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div style={{ 
          width: '70px', height: '70px', margin: '0 auto 1.5rem',
          background: 'rgba(255,255,255,0.2)', borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Zap size={35} color="white" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
          ¿Listo para transformar tu negocio?
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', lineHeight: 1.7 }}>
          Únete a más de 500 negocios que ya optimizaron sus operaciones con CRUNCH.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{ 
            background: 'white', color: styles.colors.primary, 
            border: 'none', padding: '1rem 2rem', borderRadius: '10px',
            fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            Comenzar Gratis <ArrowRight size={18} />
          </button>
          <a href="mailto:maicolviv695@gmail.com" style={{ textDecoration: 'none' }}>
            <button style={{ 
              background: 'transparent', color: 'white', 
              border: '2px solid rgba(255,255,255,0.3)', padding: '1rem 2rem', borderRadius: '10px',
              fontSize: '1rem', fontWeight: 600, cursor: 'pointer'
            }}>
              Contactar Ventas
            </button>
          </a>
        </div>
        <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
          ✓ Sin tarjeta de crédito &nbsp;&nbsp; ✓ Configuración en 5 minutos &nbsp;&nbsp; ✓ Soporte 24/7
        </p>
      </motion.div>
    </div>
  </section>
);
// Footer
const Footer = () => (
  <footer style={{ background: styles.colors.dark, color: 'white', padding: '4rem 0 2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <img src={logo} alt="Crunch" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>CRUNCH</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            El sistema de gestión más completo para negocios de alimentos y bebidas.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> maicolviv695@gmail.com</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} /> +57 3234389020</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> Cartagena, Colombia</div>
          </div>
        </div>
        {/* Links */}
        {[
          { title: 'Producto', links: ['Características', 'Precios', 'Integraciones', 'API'] },
          { title: 'Empresa', links: ['Sobre Nosotros', 'Blog', 'Carreras', 'Contacto'] },
          { title: 'Legal', links: ['Términos', 'Privacidad', 'Cookies'] },
        ].map((col) => (
          <div key={col.title}>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>{col.title}</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = styles.colors.primary}
                    onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} CRUNCH. Todos los derechos reservados.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
            <a key={i} href="#" style={{ 
              width: '40px', height: '40px', borderRadius: '50%', 
              background: 'rgba(255,255,255,0.1)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.6)', transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = styles.colors.primary; e.currentTarget.style.color = 'white'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
// ========== ESTILOS CSS (para responsive) ==========
const ResponsiveStyles = () => (
  <style>{`
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @media (max-width: 768px) {
      .desktop-nav { display: none !important; }
      .mobile-menu-btn { display: block !important; }
      .hero-text { text-align: center !important; }
      .hero-buttons { justify-content: center !important; }
      .step-text { text-align: center !important; }
    }
    
    @media (min-width: 769px) {
      .hero-text { text-align: left !important; }
      .hero-buttons { justify-content: flex-start !important; }
    }
    
    html { scroll-behavior: smooth; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; }
  `}</style>
);
// ========== COMPONENTE PRINCIPAL ==========
const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <ResponsiveStyles />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};
export default LandingPage;