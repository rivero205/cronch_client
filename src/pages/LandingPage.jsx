/**
 * CRONCH Landing Page
 * 
 * Rewritten to reflect real product capabilities.
 * Copy based on actual system analysis: production tracking,
 * sales, expenses, financial reports, RBAC, multi-business.
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_compañia.png';
import {
  Menu, X, ChevronRight, BarChart3, Package,
  ShoppingCart, Receipt, FileText, TrendingUp, Shield,
  Check, ArrowRight, Zap, Users, Bell, Building2,
  Mail, Phone, MapPin, Store, Scissors, Coffee,
  Hammer, ShoppingBag, Palette
} from 'lucide-react';

// ========== ESTILOS INLINE ==========
const styles = {
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
  gradients: {
    primary: 'linear-gradient(135deg, #f97316, #fbbf24)',
    hero: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fff7ed 100%)',
    dark: 'linear-gradient(135deg, #0f172a, #1e293b)',
  }
};

// ========== DATOS ==========
const features = [
  { icon: BarChart3, title: 'Dashboard en Tiempo Real', description: 'Visualiza ventas, gastos, utilidad y producción del día, la semana o el mes en una sola pantalla.', color: '#3b82f6' },
  { icon: Package, title: 'Registro de Producción', description: 'Registra cada lote con producto, cantidad y costo unitario. Sabrás exactamente cuánto te cuesta producir.', color: '#f97316' },
  { icon: ShoppingCart, title: 'Control de Ventas Diarias', description: 'Registra cada venta con producto, cantidad y precio. Consulta históricos con filtros por fecha.', color: '#22c55e' },
  { icon: Receipt, title: 'Gastos Operativos', description: 'Registra insumos y costos operativos. Filtra por fecha y ve el impacto real en tu utilidad.', color: '#a855f7' },
  { icon: FileText, title: '5 Tipos de Reportes', description: 'Semanal, mensual, rentabilidad por producto, tendencia diaria y producto más rentable. Listos para descargar.', color: '#f59e0b' },
  { icon: Users, title: 'Multi-usuario con Roles', description: 'Admins gestionan el equipo, aprueban usuarios y supervisan. Empleados registran la operación diaria.', color: '#6366f1' },
  { icon: Bell, title: 'Recordatorio de Cierre', description: 'Notificación automática para que nunca olvides registrar la producción y ventas del día.', color: '#ef4444' },
  { icon: Shield, title: 'Datos Aislados por Negocio', description: 'Cada negocio ve solo su información. Seguridad a nivel de base de datos con permisos por rol.', color: '#14b8a6' },
];

const targetUsers = [
  { icon: Coffee, title: 'Cafeterías y Panaderías', description: 'Controla costos de producción y márgenes reales por producto.' },
  { icon: Scissors, title: 'Talleres de Confección', description: 'Registra lo que produces, lo que vendes y lo que gastas en materiales.' },
  { icon: Palette, title: 'Manufactura Artesanal', description: 'Sabe cuánto te cuesta cada pieza y cuál te deja más ganancia.' },
  { icon: Store, title: 'Tiendas de Productos Propios', description: 'Lleva el control de inventario, ventas y gastos en un solo lugar.' },
  { icon: Hammer, title: 'Talleres y Microempresas', description: 'Deja el cuaderno y ten reportes financieros automáticos.' },
  { icon: ShoppingBag, title: 'Food Trucks y Negocios Móviles', description: 'Accede desde cualquier dispositivo. Funciona como app instalable (PWA).' },
];

const navLinks = [
  { label: 'Características', href: '#features' },
  { label: 'Cómo Funciona', href: '#how-it-works' },
  { label: 'Para Quién', href: '#target-users' },
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
            <img src={logo} alt="Cronch" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: styles.colors.dark }}>CRONCH</span>
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
                Crear Cuenta Gratis
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
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <button style={{
                  background: styles.gradients.primary, color: 'white',
                  border: 'none', padding: '0.8rem', borderRadius: '8px',
                  fontWeight: 600, cursor: 'pointer', width: '100%'
                }}>
                  Crear Cuenta Gratis
                </button>
              </Link>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', width: '100%' }}>
                <button style={{
                  background: 'white', color: styles.colors.primary, border: `1px solid ${styles.colors.primary}`,
                  padding: '0.8rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', width: '100%',
                  display: 'block'
                }}>
                  Iniciar Sesión
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
            Gestión simple para negocios que producen y venden
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
            Deja de adivinar cuánto ganas.{' '}
            <span style={{ background: styles.gradients.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Empieza a saberlo.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: '1.1rem', color: styles.colors.muted, marginBottom: '2rem', lineHeight: 1.7 }}
          >
            Registra tu producción, ventas y gastos diarios. CRONCH calcula
            automáticamente tu ganancia real por producto y genera reportes
            financieros listos para tomar decisiones.
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
                Crea tu Cuenta Gratis
                <ChevronRight size={18} />
              </button>
            </Link>
            <a href="#how-it-works" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'white', color: styles.colors.dark,
                border: `1px solid ${styles.colors.border}`, padding: '1rem 2rem', borderRadius: '10px',
                fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                transition: 'transform 0.2s'
              }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Ver cómo funciona
              </button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}
          >
            {[
              { icon: '✓', label: '100% Gratuito' },
              { icon: '✓', label: 'Listo en 2 minutos' },
              { icon: '✓', label: 'Funciona desde el celular' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: styles.colors.primary, fontWeight: 700 }}>{item.icon}</span>
                <span style={{ fontSize: '0.9rem', color: styles.colors.muted }}>{item.label}</span>
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
                  <p style={{ fontSize: '0.8rem', color: styles.colors.muted }}>Resumen de esta semana</p>
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
                  { label: 'Utilidad', value: '$1,560', color: '#3b82f6', change: '+18%' },
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
              <p style={{ fontSize: '0.8rem', fontWeight: 500, color: styles.colors.dark }}>Producto más rentable</p>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#22c55e' }}>Pan de Bono +42%</p>
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
          Características Reales
        </span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: styles.colors.dark, marginBottom: '1rem' }}>
          Todo lo que necesitas para saber{' '}
          <span style={{ background: styles.gradients.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>cuánto ganas</span>
        </h2>
        <p style={{ fontSize: '1.1rem', color: styles.colors.muted, maxWidth: '600px', margin: '0 auto' }}>
          Sin funciones de relleno. Cada herramienta existe para resolver un problema real de tu operación diaria.
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
              cursor: 'default'
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
              <feature.icon size={24} color="white" />
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
          De registrar en cuaderno a{' '}
          <span style={{ background: styles.gradients.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>reportes automáticos</span>
        </h2>
      </motion.div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {[
          { num: '01', icon: Building2, title: 'Crea tu cuenta y selecciona tu negocio', desc: 'Regístrate gratis, elige el negocio al que perteneces y espera la aprobación de tu administrador. En minutos estás operando.' },
          { num: '02', icon: Package, title: 'Registra producción, ventas y gastos cada día', desc: 'Ingresa lo que produjiste (con costo unitario), lo que vendiste (con precio) y tus gastos operativos. Toma menos de 5 minutos.' },
          { num: '03', icon: FileText, title: 'Consulta tus reportes de rentabilidad', desc: 'CRONCH calcula tu utilidad semanal, mensual, por producto y la tendencia diaria. Descarga reportes listos para tomar decisiones.' },
          { num: '04', icon: Users, title: 'Tu equipo opera, tú supervisas', desc: 'Como admin, apruebas usuarios, asignas roles y ves los reportes consolidados. Tu equipo solo registra la operación diaria.' },
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
                <step.icon size={60} color={styles.colors.primary} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Target Users Section (replaces fake testimonials)
const TargetUsersSection = () => (
  <section id="target-users" style={{ padding: '6rem 0', background: 'white' }}>
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
          ¿Para Quién?
        </span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: styles.colors.dark, marginBottom: '1rem' }}>
          CRONCH es para negocios que{' '}
          <span style={{ background: styles.gradients.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>producen y venden</span>
        </h2>
        <p style={{ fontSize: '1.1rem', color: styles.colors.muted, maxWidth: '600px', margin: '0 auto' }}>
          Si tu negocio fabrica productos, los vende y necesita saber cuánto gana realmente, CRONCH es para ti.
        </p>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {targetUsers.map((user, i) => (
          <motion.div
            key={user.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            style={{
              background: 'white', padding: '1.5rem', borderRadius: '16px',
              border: `1px solid ${styles.colors.border}`,
              display: 'flex', alignItems: 'flex-start', gap: '1rem',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = styles.colors.primary; }}
            onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = styles.colors.border; }}
          >
            <div style={{
              minWidth: '50px', height: '50px', borderRadius: '12px',
              background: 'rgba(249, 115, 22, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <user.icon size={24} color={styles.colors.primary} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: styles.colors.dark, marginBottom: '0.3rem' }}>{user.title}</h3>
              <p style={{ fontSize: '0.9rem', color: styles.colors.muted, lineHeight: 1.6 }}>{user.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Free CTA Section (replaces fake pricing)
const FreeCTASection = () => (
  <section style={{ padding: '5rem 0', background: '#fafafa' }}>
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          background: 'white', borderRadius: '24px', padding: '3rem 2rem',
          border: `2px solid ${styles.colors.primary}`,
          boxShadow: '0 25px 50px rgba(249, 115, 22, 0.1)',
          position: 'relative', overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', background: styles.colors.primary, opacity: 0.05, borderRadius: '50%' }} />
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(249, 115, 22, 0.1)', padding: '0.4rem 1rem',
            borderRadius: '50px', fontSize: '0.85rem', color: styles.colors.primary,
            fontWeight: 600, marginBottom: '1.5rem'
          }}>
            <Zap size={14} /> Sin planes, sin trucos
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: styles.colors.dark, marginBottom: '0.5rem' }}>
            CRONCH es{' '}
            <span style={{ background: styles.gradients.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>gratuito</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: styles.colors.muted, marginBottom: '2rem', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 2rem' }}>
            Sin período de prueba. Sin límites artificiales. Crea tu cuenta y empieza a registrar tu operación hoy.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {['Productos ilimitados', 'Usuarios ilimitados', 'Reportes completos', 'Notificaciones'].map((text) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: styles.colors.muted }}>
                <Check size={16} color={styles.colors.primary} />
                <span style={{ fontSize: '0.9rem' }}>{text}</span>
              </div>
            ))}
          </div>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button style={{
              background: styles.gradients.primary, color: 'white',
              border: 'none', padding: '1rem 2.5rem', borderRadius: '10px',
              fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)',
              transition: 'transform 0.2s'
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Crear Cuenta Gratis <ArrowRight size={18} />
            </button>
          </Link>
        </div>
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
          ¿Sigues llevando tus cuentas en un cuaderno?
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', lineHeight: 1.7 }}>
          Cada día sin registro es un día sin saber si tu negocio está ganando o perdiendo.
          Con CRONCH, en 5 minutos al día tienes tu operación bajo control.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'white', color: styles.colors.primary,
              border: 'none', padding: '1rem 2rem', borderRadius: '10px',
              fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              Crear Cuenta Gratis <ArrowRight size={18} />
            </button>
          </Link>
          <a href="https://wa.me/573234389020?text=Hola,%20quiero%20saber%20más%20sobre%20Cronch" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'transparent', color: 'white',
              border: '2px solid rgba(255,255,255,0.3)', padding: '1rem 2rem', borderRadius: '10px',
              fontSize: '1rem', fontWeight: 600, cursor: 'pointer'
            }}>
              Hablar por WhatsApp
            </button>
          </a>
        </div>
        <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
          ✓ Gratis para siempre &nbsp;&nbsp; ✓ Sin tarjeta de crédito &nbsp;&nbsp; ✓ Listo en 2 minutos
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
            <img src={logo} alt="Cronch" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>CRONCH</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Gestión simple para negocios que producen y venden. Registra, mide y crece.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
            <a href="mailto:maicolviv695@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              <Mail size={16} /> maicolviv695@gmail.com
            </a>
            <a href="https://wa.me/573234389020" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              <Phone size={16} /> +57 323 438 9020
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> Cartagena, Colombia</div>
          </div>
        </div>
        {/* Links */}
        <div>
          <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Producto</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: 'Características', href: '#features' },
              { label: 'Cómo Funciona', href: '#how-it-works' },
              { label: 'Para Quién', href: '#target-users' },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.target.style.color = styles.colors.primary}
                  onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Cuenta</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: 'Crear Cuenta', to: '/register' },
              { label: 'Iniciar Sesión', to: '/login' },
            ].map((link) => (
              <li key={link.label}>
                <Link to={link.to} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.target.style.color = styles.colors.primary}
                  onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Soporte</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <a href="https://wa.me/573234389020?text=Hola,%20necesito%20ayuda%20con%20Cronch" target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.target.style.color = styles.colors.primary}
                onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:maicolviv695@gmail.com"
                style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.target.style.color = styles.colors.primary}
                onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} CRONCH. Todos los derechos reservados.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
          Hecho con 🧡 en Cartagena, Colombia
        </p>
      </div>
    </div>
  </footer>
);

// ========== ESTILOS CSS (para responsive) ==========
const ResponsiveStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
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
    
    html { scroll-behavior: smooth; overflow-x: hidden; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; overflow-x: hidden; max-width: 100vw; }
  `}</style>
);

// ========== COMPONENTE PRINCIPAL ==========
const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'white', overflowX: 'hidden' }}>
      <ResponsiveStyles />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TargetUsersSection />
      <FreeCTASection />
      <CTASection />
      <Footer />
    </div>
  );
};
export default LandingPage;