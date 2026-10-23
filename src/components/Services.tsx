import { useRef, useState, type ReactNode } from 'react';
import {
  Code2,
  Smartphone,
  Cpu,
  GraduationCap,
  Building2,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Service {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  gradient: string;
  glow: string;
}

const SERVICES: Service[] = [
  {
    icon: Code2,
    title: 'Web Development',
    tagline: 'Scalable Digital Platforms',
    description:
      'High-performance websites and web applications built with modern frameworks, optimized for speed, SEO, and conversion.',
    features: ['React / Next.js', 'E-commerce', 'CMS Integration', 'API Development'],
    gradient: 'from-accent-400/20 to-accent-700/5',
    glow: 'glow-cyan',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    tagline: 'iOS & Android Native',
    description:
      'Cross-platform and native mobile applications with intuitive UI, offline support, and seamless backend integration.',
    features: ['React Native', 'Flutter', 'Push Notifications', 'App Store Deploy'],
    gradient: 'from-success-400/20 to-success-600/5',
    glow: 'shadow-lg shadow-success-500/20',
  },
  {
    icon: Cpu,
    title: 'Embedded Systems',
    tagline: 'Hardware + Software Fusion',
    description:
      'Custom embedded solutions — IoT devices, firmware, PCB design, and real-time control systems for industrial and consumer use.',
    features: ['Arduino / ESP32', 'IoT & Sensors', 'PCB Design', 'Firmware Dev'],
    gradient: 'from-gold-400/20 to-gold-600/5',
    glow: 'glow-gold',
  },
  {
    icon: GraduationCap,
    title: 'B.Tech & Degree Projects',
    tagline: 'Academic Project Support',
    description:
      'Complete academic project guidance — from concept and design to implementation, documentation, and presentation prep.',
    features: ['IoT Projects', 'ML / AI Models', 'Full Documentation', 'Presentation Prep'],
    gradient: 'from-accent-300/20 to-accent-600/5',
    glow: 'glow-cyan',
  },
  {
    icon: Building2,
    title: 'Civil Works',
    tagline: 'Infrastructure Engineering',
    description:
      'End-to-end civil engineering services — structural design, site supervision, estimation, and construction management.',
    features: ['Structural Design', 'Site Supervision', 'Cost Estimation', 'Project Mgmt'],
    gradient: 'from-ink-400/20 to-ink-700/5',
    glow: 'shadow-lg shadow-ink-700/30',
  },
];

export function Services() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="services" className="relative py-28 md:py-36">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-accent-700/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-gold-600/5 blur-[100px]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className={`mb-16 text-center reveal ${visible ? 'visible' : ''}`}>
          <span className="text-sm font-semibold tracking-widest text-accent-400 uppercase">
            What We Do
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink-50 sm:text-5xl md:text-6xl">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-300">
            Five specialized divisions under one roof — covering the full spectrum
            from digital products to physical infrastructure.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              visible={visible}
              isLarge={i === 0 || i === 3}
            />
          ))}

          {/* CTA card */}
          <ServiceCTACard visible={visible} index={SERVICES.length} />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  visible,
  isLarge,
}: {
  service: Service;
  index: number;
  visible: boolean;
  isLarge: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
    );
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  const Icon = service.icon;

  return (
    <div
      className={`reveal ${visible ? 'visible' : ''} ${isLarge ? 'lg:col-span-1' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative h-full overflow-hidden rounded-2xl glass p-8 transition-all duration-300 hover:border-accent-400/30"
        style={{ transform, transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Gradient bg */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />

        {/* Glare effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(34, 211, 238, 0.12) 0%, transparent 50%)`,
          }}
        />

        {/* Content with depth */}
        <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
          {/* Icon */}
          <div
            className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} ${service.glow}`}
            style={{ transform: 'translateZ(30px)' }}
          >
            <Icon size={26} className="text-accent-300" />
          </div>

          {/* Tagline */}
          <span className="text-xs font-semibold tracking-widest text-accent-400 uppercase">
            {service.tagline}
          </span>

          {/* Title */}
          <h3 className="mt-2 text-2xl font-bold text-ink-50">{service.title}</h3>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-ink-300">
            {service.description}
          </p>

          {/* Features */}
          <div className="mt-6 flex flex-wrap gap-2">
            {service.features.map((feat) => (
              <span
                key={feat}
                className="rounded-lg border border-ink-700/50 bg-ink-900/50 px-3 py-1.5 text-xs font-medium text-ink-300"
              >
                {feat}
              </span>
            ))}
          </div>

          {/* Link */}
          <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-accent-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
            Learn more
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute -bottom-px -right-px h-24 w-24 rounded-tl-3xl border-l border-t border-accent-400/0 transition-all duration-500 group-hover:border-accent-400/20 group-hover:h-32 group-hover:w-32" />
      </div>
    </div>
  );
}

function ServiceCTACard({ visible, index }: { visible: boolean; index: number }) {
  return (
    <div
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="group relative flex h-full flex-col items-start justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent-600/20 to-ink-900/40 p-8 transition-all duration-300 hover:border-accent-400/30 border border-accent-400/10">
        <div className="absolute inset-0 bg-grid-pattern bg-grid-fade opacity-20" />
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-ink-50">
            Need a <span className="text-gradient">custom</span> solution?
          </h3>
          <p className="mt-3 text-sm text-ink-300">
            We handle cross-discipline projects that combine digital and physical
            engineering.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-accent-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/40 hover:scale-105"
          >
            Talk to Us
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
