import { useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  pattern: string;
  year: string;
}

const PROJECTS: Project[] = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description:
      'Full-stack e-commerce solution with real-time inventory, Stripe payments, and an admin dashboard. Handles 10k+ products.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    gradient: 'from-accent-500/30 via-accent-700/10 to-transparent',
    pattern: 'grid',
    year: '2025',
  },
  {
    title: 'Fleet Tracking App',
    category: 'Mobile App',
    description:
      'Cross-platform mobile app for real-time GPS fleet tracking with geofencing, route optimization, and driver analytics.',
    tags: ['React Native', 'Firebase', 'Maps SDK', 'Push'],
    gradient: 'from-success-500/30 via-success-600/10 to-transparent',
    pattern: 'dots',
    year: '2025',
  },
  {
    title: 'Smart Agriculture IoT',
    category: 'Embedded Systems',
    description:
      'ESP32-based soil monitoring system with sensor mesh, cloud telemetry, and automated irrigation control via mobile app.',
    tags: ['ESP32', 'LoRa', 'AWS IoT', 'Sensors'],
    gradient: 'from-gold-400/30 via-gold-600/10 to-transparent',
    pattern: 'hex',
    year: '2024',
  },
  {
    title: ' Autonomous Robot',
    category: 'B.Tech Project',
    description:
      'Final-year project — obstacle-avoiding autonomous robot with computer vision, SLAM navigation, and Android control interface.',
    tags: ['Raspberry Pi', 'OpenCV', 'ROS', 'Python'],
    gradient: 'from-accent-300/30 via-accent-600/10 to-transparent',
    pattern: 'circuit',
    year: '2024',
  },
  {
    title: 'Commercial Complex',
    category: 'Civil Works',
    description:
      'Structural design and site supervision for a 4-floor commercial complex — 20,000 sq ft with parking, HVAC, and fire safety.',
    tags: ['Structural Design', 'AutoCAD', 'Site Mgmt', 'BOQ'],
    gradient: 'from-ink-400/30 via-ink-700/10 to-transparent',
    pattern: 'blueprint',
    year: '2025',
  },
  {
    title: 'Healthcare Portal',
    category: 'Web Development',
    description:
      'HIPAA-compliant telemedicine platform with video consultations, appointment scheduling, and electronic health records.',
    tags: ['Next.js', 'WebRTC', 'Prisma', 'Auth'],
    gradient: 'from-accent-400/30 via-accent-700/10 to-transparent',
    pattern: 'grid',
    year: '2025',
  },
];

const CATEGORIES = ['All', 'Web Development', 'Mobile App', 'Embedded Systems', 'B.Tech Project', 'Civil Works'];

export function Projects() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-accent-700/8 blur-[120px]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className={`mb-12 text-center reveal ${visible ? 'visible' : ''}`}>
          <span className="text-sm font-semibold tracking-widest text-accent-400 uppercase">
            Our Work
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink-50 sm:text-5xl md:text-6xl">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-300">
            A selection of projects across all five disciplines — from digital
            platforms to physical infrastructure.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-accent-500 to-accent-700 text-white shadow-lg shadow-accent-500/30'
                  : 'glass text-ink-300 hover:text-accent-300 hover:border-accent-400/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  visible,
}: {
  project: Project;
  index: number;
  visible: boolean;
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
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
    );
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <div
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative h-full overflow-hidden rounded-2xl glass transition-all duration-300 hover:border-accent-400/30"
        style={{ transform, transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Visual header area */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
          <ProjectPattern type={project.pattern} />

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="rounded-lg glass-strong px-3 py-1.5 text-xs font-medium text-accent-300">
              {project.category}
            </span>
          </div>

          {/* Year badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="rounded-lg glass-strong px-3 py-1.5 text-xs font-medium text-ink-300">
              {project.year}
            </span>
          </div>

          {/* Glare */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(34, 211, 238, 0.15) 0%, transparent 60%)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-xl font-bold text-ink-50">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-300">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-ink-700/40 bg-ink-900/40 px-2.5 py-1 text-[11px] font-medium text-ink-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-5 flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-sm font-semibold text-accent-400 transition-colors hover:text-accent-300">
              View Details
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectPattern({ type }: { type: string }) {
  switch (type) {
    case 'grid':
      return (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      );
    case 'dots':
      return (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(rgba(52,211,153,0.3) 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px',
          }}
        />
      );
    case 'hex':
      return (
        <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 200 200">
          <defs>
            <pattern id="hex-pattern" x="0" y="0" width="40" height="34.64" patternUnits="userSpaceOnUse">
              <polygon
                points="20,2 38,12 38,22 20,32 2,22 2,12"
                fill="none"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#hex-pattern)" />
        </svg>
      );
    case 'circuit':
      return (
        <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 200 200">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M0,25 L15,25 L15,10 L35,10 L35,25 L50,25" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.8" />
              <path d="M25,0 L25,15 L10,15 L10,35 L25,35 L25,50" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="0.8" />
              <circle cx="15" cy="25" r="2" fill="rgba(34,211,238,0.4)" />
              <circle cx="35" cy="10" r="2" fill="rgba(34,211,238,0.4)" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#circuit-pattern)" />
        </svg>
      );
    case 'blueprint':
      return (
        <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 200 200">
          <defs>
            <pattern id="bp-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" stroke="rgba(130,154,177,0.2)" strokeWidth="0.5" />
              <line x1="0" y1="20" x2="40" y2="20" stroke="rgba(130,154,177,0.15)" strokeWidth="0.3" strokeDasharray="4,4" />
              <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(130,154,177,0.15)" strokeWidth="0.3" strokeDasharray="4,4" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#bp-pattern)" />
        </svg>
      );
    default:
      return null;
  }
}
