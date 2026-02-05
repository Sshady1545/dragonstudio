import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Youtube, 
  MessageCircle, 
  Users, 
  Server, 
  Shield, 
  Zap, 
  Star,
  ChevronDown,
  Code2,
  Palette,
  FileText,
  ExternalLink,
  Box,
  Activity,
  Globe,
  Swords
} from 'lucide-react';
import './App.css';

// Enhanced Particle Component with more particles and connections
const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; pulse: number }[] = [];
    const particleCount = 120;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2
      });
    }
    
    let animationId: number;
    let time = 0;
    
    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.pulse += 0.05;
        const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, pulseSize * 3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${particle.alpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha + 0.3})`;
        ctx.fill();
        
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const lineAlpha = 0.15 * (1 - distance / 150) * (0.8 + Math.sin(time * 2) * 0.2);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="particles-canvas" />;
};

// Floating Orbs Component
const FloatingOrbs = () => {
  const orbs = [
    { size: 300, x: '10%', y: '20%', delay: 0 },
    { size: 200, x: '80%', y: '60%', delay: 2 },
    { size: 150, x: '60%', y: '10%', delay: 4 },
    { size: 250, x: '30%', y: '70%', delay: 1 },
    { size: 180, x: '90%', y: '30%', delay: 3 },
  ];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full orb-gradient"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Animated Grid Lines
const GridLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{ top: `${(i + 1) * 10}%` }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"
          style={{ left: `${(i + 1) * 7}%` }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 5 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let startTime: number;
            const animate = (currentTime: number) => {
              if (!startTime) startTime = currentTime;
              const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              setCount(Math.floor(easeOutQuart * end));
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);
  
  return (
    <span ref={countRef} className="font-orbitron font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img 
              src="/images/logo.png" 
              alt="Dragon Studios" 
              className="w-10 h-10 object-contain logo-glow"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="font-orbitron font-bold text-xl tracking-wider">DRAGON STUDIOS</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Ana Sayfa', 'Sunucular', 'Hakkımızda', 'İletişim'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${['home', 'servers', 'about', 'contact'][index]}`}
                className="font-rajdhani text-lg font-medium text-white/70 hover:text-white transition-colors relative group"
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.5 }}
              >
                {item}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-white to-transparent"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <motion.a
              href="https://discord.gg/JUj7SHGdF6"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@ofc-ExeLuX"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Youtube className="w-6 h-6" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.8]);
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Particles />
      <FloatingOrbs />
      <GridLines />
      
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 grid-pattern"
      />
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ scale }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
            className="mb-8"
          >
            <motion.img 
              src="/images/logo.png" 
              alt="Dragon Studios Logo" 
              className="w-32 h-32 md:w-48 md:h-48 mx-auto logo-glow"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black mb-6 glow-text tracking-wider"
          >
            {'BİZİ TANIYIN'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-rajdhani text-xl md:text-2xl text-white/70 mb-4 max-w-2xl mx-auto"
          >
            Dragon Studios Ekibi olarak en kaliteli Minecraft sunucu deneyimini sunuyoruz
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {['Skibidi Tuvalet Sunucusu', 'SMP Sunucusu', '7/24 Aktif'].map((tag, i) => (
              <motion.span 
                key={tag}
                className="px-4 py-2 border border-white/20 rounded-full text-sm font-rajdhani text-white/60"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                whileHover={{ scale: 1.1, borderColor: 'rgba(255,255,255,0.5)' }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <motion.a
              href="#servers"
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Server className="w-5 h-5" />
              Sunucuları Keşfet
            </motion.a>
            <motion.a
              href="https://discord.gg/JUj7SHGdF6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              Discord'a Katıl
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/50"
          >
            <span className="font-rajdhani text-sm tracking-widest">AŞAĞI KAYDIR</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-48 h-48 border border-white/5 rounded-full"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/3 right-20 w-3 h-3 bg-white rounded-full"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 left-20 w-2 h-2 bg-white/50 rounded-full"
        animate={{ 
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { icon: Users, label: 'Discord Üyesi', value: 1000, suffix: '+' },
    { icon: Server, label: 'Sunucu', value: 2, suffix: '' },
    { icon: Activity, label: 'Uptime', value: 99, suffix: '%' },
  ];
  
  return (
    <section className="py-20 relative overflow-hidden">
      <FloatingOrbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: '0 20px 40px rgba(255,255,255,0.1)'
              }}
              className="text-center p-6 glow-border rounded-xl card-hover"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="w-10 h-10 mx-auto mb-4 text-white/60" />
              </motion.div>
              <div className="text-4xl md:text-5xl font-orbitron font-bold mb-2 glow-text">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-rajdhani text-white/60 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Servers Section
const ServersSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const servers = [
    {
      id: 0,
      name: 'Skibidi Tuvalet Sunucusu',
      icon: '/images/icon1.png',
      ip: 'skibiditoilet.shock.gg',
      link: 'https://dragonskibiditoilet.vercel.app',
      description: 'En eğlenceli ve aksiyon dolu Skibidi Tuvalet deneyimi! Özel modlar, haritalar ve çok daha fazlası sizi bekliyor.',
      features: [
        'Özel Skibidi Tuvalet Modları',
        '7/24 Aktif Sunucu',
        'Anti-Cheat Koruması',
        'Özel Eşyalar ve Yetenekler',
        'Etkinlikler ve Ödüller',
        'Türkçe Destek'
      ],
      color: 'from-yellow-500/20 to-yellow-600/10',
      borderColor: 'border-yellow-500/30',
      glowColor: 'shadow-yellow-500/20'
    },
    {
      id: 1,
      name: 'SMP Sunucusu',
      icon: '/images/icon2.png',
      ip: 'dragonsmp.shock.gg',
      link: 'https://dragonsmp.vercel.app',
      description: 'Survival Multiplayer deneyiminin en saf hali! Arkadaşlarınla birlikte hayatta kal ve krallığını kur.',
      features: [
        'Vanilla+ Deneyimi',
        'Ekonomi Sistemi',
        'Savaş',
        'PVP ve PVE Alanları',
        'Haftalık Etkinlikler',
        'Aktif Admin Ekibi'
      ],
      color: 'from-red-500/20 to-red-600/10',
      borderColor: 'border-red-500/30',
      glowColor: 'shadow-red-500/20'
    }
  ];
  
  return (
    <section id="servers" className="py-24 relative">
      <FloatingOrbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-orbitron text-4xl md:text-6xl font-bold mb-4 glow-text"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            SUNUCULARIMIZ
          </motion.h2>
          <motion.p 
            className="font-rajdhani text-xl text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            İki farklı sunucu, iki farklı deneyim. Sana en uygun olanı seç ve hemen başla!
          </motion.p>
        </motion.div>
        
        <div className="flex justify-center gap-4 mb-12">
          {servers.map((server, index) => (
            <motion.button
              key={server.id}
              onClick={() => setActiveTab(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative px-6 py-4 rounded-xl font-orbitron font-bold text-lg transition-all duration-500 ${
                activeTab === index 
                  ? `bg-gradient-to-r ${server.color} ${server.borderColor} border-2` 
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-3">
                <motion.img 
                  src={server.icon} 
                  alt={server.name}
                  className={`w-8 h-8 object-contain ${activeTab === index ? 'logo-glow' : 'opacity-60'}`}
                  animate={activeTab === index ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="hidden sm:inline">{server.name}</span>
                <span className="sm:hidden">{index === 0 ? 'Skibidi' : 'SMP'}</span>
              </div>
              {activeTab === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl border-2 border-white/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 100, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100, rotateY: 15 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`relative p-8 md:p-12 rounded-2xl border-2 ${servers[activeTab].borderColor} bg-gradient-to-br ${servers[activeTab].color} glow-box`}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                  className="mb-6"
                >
                  <motion.img 
                    src={servers[activeTab].icon}
                    alt={servers[activeTab].name}
                    className="w-32 h-32 md:w-48 md:h-48 object-contain logo-glow"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 3, -3, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                <motion.h3 
                  className="font-orbitron text-3xl md:text-4xl font-bold mb-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {servers[activeTab].name}
                </motion.h3>
                <motion.div
                  className="flex items-center gap-2 mb-4 text-white/60 font-rajdhani"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{servers[activeTab].ip}</span>
                </motion.div>
                <motion.p 
                  className="font-rajdhani text-lg text-white/70 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {servers[activeTab].description}
                </motion.p>
                <motion.a
                  href={servers[activeTab].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-5 h-5" />
                  Sunucuya Katıl
                </motion.a>
              </div>
              
              <div>
                <motion.h4 
                  className="font-orbitron text-xl font-bold mb-6 text-white/80"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  ÖZELLİKLER
                </motion.h4>
                <div className="space-y-4">
                  {servers[activeTab].features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-colors"
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        {feature === 'Savaş' ? (
                          <Swords className="w-5 h-5 text-white/60 flex-shrink-0" />
                        ) : (
                          <Star className="w-5 h-5 text-white/60 flex-shrink-0" />
                        )}
                      </motion.div>
                      <span className="font-rajdhani text-lg">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Güvenlik',
      description: 'En üst düzey koruma sistemleri ile hesaplarınız ve verileriniz güvende.'
    },
    {
      icon: Zap,
      title: 'Performans',
      description: 'Yüksek performanslı sunucular ile lag sorunu olmadan oyna.'
    },
    {
      icon: Users,
      title: 'Topluluk',
      description: 'Aktif ve dost canlısı bir topluluğun parçası ol.'
    },
    {
      icon: Code2,
      title: 'Geliştirme',
      description: 'Sürekli güncellenen ve geliştirilen içerikler.'
    }
  ];
  
  return (
    <section id="about" className="py-24 relative">
      <FloatingOrbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-orbitron text-4xl md:text-6xl font-bold mb-4 glow-text"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            NEDEN BİZ?
          </motion.h2>
          <motion.p 
            className="font-rajdhani text-xl text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Dragon Studios olarak kalite ve oyuncu memnuniyetini ön planda tutuyoruz.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                boxShadow: '0 25px 50px rgba(255,255,255,0.1)'
              }}
              className="p-8 glow-border rounded-2xl card-hover bg-gradient-to-br from-white/5 to-transparent"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-6"
              >
                <feature.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="font-orbitron text-xl font-bold mb-3">{feature.title}</h3>
              <p className="font-rajdhani text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Social Section
const SocialSection = () => {
  const socials = [
    {
      name: 'Discord',
      icon: MessageCircle,
      description: 'Topluluğumuza katıl ve diğer oyuncularla tanış!',
      link: 'https://discord.gg/JUj7SHGdF6',
      members: 1000,
      color: 'from-indigo-500/20 to-purple-500/20'
    },
    {
      name: 'YouTube - Robotic',
      icon: Youtube,
      description: 'Robotic kanalından en yeni videoları izle!',
      link: 'https://www.youtube.com/@ofc-ExeLuX',
      subscribers: 3000,
      color: 'from-red-500/20 to-pink-500/20'
    },
    {
      name: 'YouTube - Shady',
      icon: Youtube,
      description: 'Shady kanalından içerikleri keşfet!',
      link: 'https://youtube.com/@Sshady1545',
      subscribers: 4000,
      color: 'from-red-500/20 to-orange-500/20'
    }
  ];
  
  return (
    <section className="py-24 relative">
      <FloatingOrbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-orbitron text-4xl md:text-6xl font-bold mb-4 glow-text"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            BİZİ TAKİP ET
          </motion.h2>
          <motion.p 
            className="font-rajdhani text-xl text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Sosyal medya hesaplarımızdan bizi takip et ve güncel kal!
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
              className={`group relative p-8 rounded-2xl border border-white/10 bg-gradient-to-br ${social.color} overflow-hidden card-hover`}
              whileHover={{ scale: 1.03, y: -10 }}
            >
              <motion.div 
                className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                whileHover={{ scale: 1.1 }}
              />
              
              <motion.div
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-6"
              >
                <social.icon className="w-8 h-8" />
              </motion.div>
              
              <h3 className="font-orbitron text-2xl font-bold mb-2">{social.name}</h3>
              <p className="font-rajdhani text-white/60 mb-4">{social.description}</p>
              
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-5 h-5" />
                <span className="font-rajdhani font-bold">
                  <AnimatedCounter 
                    end={social.members || social.subscribers || 0} 
                    suffix={social.subscribers ? ' Abone' : ' Üye'} 
                  />
                </span>
              </div>
              
              <motion.div
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ExternalLink className="w-6 h-6" />
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Section
const TeamSection = () => {
  const team = [
    {
      role: 'Kod',
      name: 'Bay4lly',
      icon: Code2,
      description: 'Tüm teknik altyapı ve kodlama işlemleri',
      link: 'https://www.youtube.com/channel/UCfHdYntuT4V7M2Qdy_NLdbg'
    },
    {
      role: 'Tasarım',
      name: 'Shady',
      icon: Palette,
      description: 'Görsel tasarım ve kullanıcı deneyimi',
      link: 'https://youtube.com/@Sshady1545'
    },
    {
      role: 'İçerik',
      name: 'Robotic',
      icon: FileText,
      description: 'İçerik üretimi ve topluluk yönetimi',
      link: 'https://www.youtube.com/@ofc-ExeLuX'
    }
  ];
  
  return (
    <section id="contact" className="py-24 relative">
      <FloatingOrbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-orbitron text-4xl md:text-6xl font-bold mb-4 glow-text"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            EKİBİMİZ
          </motion.h2>
          <motion.p 
            className="font-rajdhani text-xl text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Bu harika projeyi oluşturan yetenekli ekibimiz
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <motion.a
              key={member.name}
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: '0 25px 50px rgba(255,255,255,0.15)'
              }}
              className="p-8 glow-border rounded-2xl card-hover text-center bg-gradient-to-br from-white/5 to-transparent block"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6"
              >
                <member.icon className="w-10 h-10" />
              </motion.div>
              
              <motion.div 
                className="font-orbitron text-sm text-white/50 mb-2 tracking-wider"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {member.role}
              </motion.div>
              <h3 className="font-orbitron text-2xl font-bold mb-3">{member.name}</h3>
              <p className="font-rajdhani text-white/60">{member.description}</p>
              
              <motion.div
                className="mt-4 flex items-center justify-center gap-2 text-white/40 text-sm"
                whileHover={{ color: 'rgba(255,255,255,0.8)' }}
              >
                <Youtube className="w-4 h-4" />
                <span>Kanala Git</span>
              </motion.div>
            </motion.a>
          ))}
        </div>
        
        {/* Modrinth Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.a
            href="https://modrinth.com/user/Shady1545"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modrinth inline-flex items-center gap-3"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(27, 217, 106, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Box className="w-6 h-6" />
            <span className="font-orbitron font-bold">MODRINTH SAYFAMIZ</span>
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
        
        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center p-12 glow-border rounded-2xl bg-gradient-to-br from-white/5 to-transparent"
        >
          <motion.img 
            src="/images/logo.png" 
            alt="Dragon Studios" 
            className="w-24 h-24 mx-auto mb-6 logo-glow"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.h3 
            className="font-orbitron text-3xl md:text-4xl font-bold mb-4 glow-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            DRAGON STUDIOS
          </motion.h3>
          <motion.p 
            className="font-rajdhani text-xl text-white/60 mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Saygılarımızla
          </motion.p>
          <motion.p 
            className="font-orbitron text-lg text-white/40 tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Dragon Studios Ekibi
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10 relative">
      <FloatingOrbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img 
              src="/images/logo.png" 
              alt="Dragon Studios" 
              className="w-10 h-10 object-contain"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <span className="font-orbitron font-bold text-lg">DRAGON STUDIOS</span>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <motion.a 
              href="https://discord.gg/JUj7SHGdF6" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.a>
            <motion.a 
              href="https://www.youtube.com/@ofc-ExeLuX" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: -10 }}
            >
              <Youtube className="w-6 h-6" />
            </motion.a>
            <motion.a 
              href="https://youtube.com/@Sshady1545" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <Youtube className="w-6 h-6" />
            </motion.a>
          </div>
          
          <p className="font-rajdhani text-white/40 text-sm">
            © 2026 Dragon Studios. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Enhanced Protection Script
const ProtectionScript = () => {
  useEffect(() => {
    // Disable right click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    
    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || 
          (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+S (Save)
      if (e.ctrlKey && e.key === 'S') {
        e.preventDefault();
        return false;
      }
    };
    
    // Disable drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };
    
    // Disable select
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };
    
    // Disable copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };
    
    // Disable cut
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };
    
    // Disable developer tools detection
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        console.clear();
      }
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    window.addEventListener('resize', detectDevTools);
    
    // Console warning
    console.log('%c⚠️ UYARI!', 'color: red; font-size: 30px; font-weight: bold;');
    console.log('%cBu sayfanın kodları korunmaktadır. Kopyalamaya çalışmayın.', 'color: white; font-size: 14px;');
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      window.removeEventListener('resize', detectDevTools);
    };
  }, []);
  
  return null;
};

// Main App
function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <ProtectionScript />
      <div className="noise-overlay" />
      
      <Navigation />
      
      <main>
        <HeroSection />
        <StatsSection />
        <ServersSection />
        <AboutSection />
        <SocialSection />
        <TeamSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
