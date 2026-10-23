import { useEffect, useRef, useState } from 'react';
import {
  Award,
  Users,
  Briefcase,
  Clock,
  Shield,
  Zap,
  Target,
  Heart,
  type LucideIcon,
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Stat {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { icon: Briefcase, value: 120, suffix: '+', label: 'Projects Delivered' },
  { icon: Users, value: 50, suffix: '+', label: 'Happy Clients' },
  { icon: Award, value: 8, suffix: '', label: 'Years Experience' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Support Available' },
];

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

const VALUES: Value[] = [
  {
    icon: Target,
    title: 'Precision Engineering',
    description: 'Every project — digital or physical — is built to exact specifications with rigorous testing.',
  },
  {
    icon: Zap,
    title: 'Rapid Delivery',
    description: 'Agile workflows and cross-discipline teams mean faster turnaround without compromising quality.',
  },
  {
    icon: Shield,
    title: 'Built to Last',
    description: 'From code architecture to structural design, we engineer for longevity and maintainability.',
  },
  {
    icon: Heart,
    title: 'Client First',
    description: 'Transparent communication, honest timelines, and post-delivery support are non-negotiable.',
  },
];

export function About() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-accent-700/8 blur-[120px]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className={`mb-16 text-center reveal ${visible ? 'visible' : ''}`}>
          <span className="text-sm font-semibold tracking-widest text-accent-400 uppercase">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink-50 sm:text-5xl md:text-6xl">
            The <span className="text-gradient">Yantra</span> Difference
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-300">
            We bridge the gap between software and physical infrastructure — one
            team, multiple disciplines, zero handoffs.
          </p>
        </div>

        {/* Stats grid with 3D effect */}
        <div className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} visible={visible} />
          ))}
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {VALUES.map((value, i) => (
            <ValueCard key={value.title} value={value} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
  visible,
}: {
  stat: Stat;
  index: number;
  visible: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const Icon = stat.icon;

  useEffect(() => {
    if (!visible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(stat.value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [visible, stat.value]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} group relative`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl glass p-6 text-center transition-all duration-500 hover:border-accent-400/30 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-700/5">
            <Icon size={22} className="text-accent-400" />
          </div>
          <div className="text-4xl font-bold text-ink-50 md:text-5xl">
            {count}
            <span className="text-gradient">{stat.suffix}</span>
          </div>
          <div className="mt-2 text-sm text-ink-400">{stat.label}</div>
        </div>

        {/* Bottom accent bar */}
        <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-400 to-accent-600 transition-all duration-500 group-hover:w-3/4" />
      </div>
    </div>
  );
}

function ValueCard({
  value,
  index,
  visible,
}: {
  value: Value;
  index: number;
  visible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const Icon = value.icon;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({
      x: ((y - centerY) / centerY) * -6,
      y: ((x - centerX) / centerX) * 6,
    });
  };

  const handleLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <div
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${(index + 4) * 100}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group flex gap-5 rounded-2xl glass p-7 transition-all duration-300 hover:border-accent-400/25"
        style={{
          transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/15 to-accent-700/5 glow-cyan"
          style={{ transform: 'translateZ(30px)' }}
        >
          <Icon size={24} className="text-accent-300" />
        </div>
        <div style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-xl font-bold text-ink-50">{value.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-300">
            {value.description}
          </p>
        </div>
      </div>
    </div>
  );
}
