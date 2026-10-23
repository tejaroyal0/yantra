import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Cpu, Building2, Code2, Smartphone } from 'lucide-react';
import { ParticleField } from './ParticleField';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const parallax = (depth: number) => ({
    transform: `translate3d(${mouse.x * depth}px, ${mouse.y * depth}px, 0)`,
  });

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <ParticleField className="h-full w-full" />
      </div>

      {/* Perspective grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[50vh] z-0 perspective-grid bg-grid-fade opacity-60"
        style={{
          transform: 'perspective(400px) rotateX(70deg) translateY(20px)',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent-500/20 animate-pulse-glow z-0"
        style={parallax(30)}
      />
      <div
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gold-500/10 animate-pulse-glow z-0"
        style={{ ...parallax(-20), animationDelay: '1.5s' }}
      />

      {/* 3D floating shapes */}
      <FloatingShapes mouse={mouse} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-accent-300 reveal visible"
          style={parallax(10)}
        >
          <Sparkles size={16} className="text-gold-400" />
          <span>Engineering Digital & Physical Excellence</span>
        </div>

        {/* Heading */}
        <h1
          className="text-5xl font-bold leading-[1.1] tracking-tight text-ink-50 sm:text-6xl md:text-7xl lg:text-8xl"
          style={parallax(5)}
        >
          <span className="block">Building the</span>
          <span className="block text-gradient">Infrastructure</span>
          <span className="block">of Tomorrow</span>
        </h1>

        {/* Subheading */}
        <p
          className="mx-auto mt-8 max-w-2xl text-lg text-ink-300 sm:text-xl"
          style={parallax(8)}
        >
          From web platforms and mobile apps to embedded systems and civil works —
          Yantra Systems & Infrastructure is your end-to-end engineering partner.
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={parallax(12)}
        >
          <button
            onClick={scrollToServices}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-accent-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-accent-500/40 hover:scale-105"
          >
            Explore Services
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-xl glass px-8 py-4 text-base font-semibold text-ink-100 transition-all duration-300 hover:border-accent-400/40 hover:text-accent-300 hover:scale-105"
          >
            Get a Quote
          </button>
        </div>

        {/* Floating service icons */}
        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          style={parallax(15)}
        >
          {[
            { icon: Code2, label: 'Web Dev' },
            { icon: Smartphone, label: 'Mobile Apps' },
            { icon: Cpu, label: 'Embedded' },
            { icon: Building2, label: 'Civil Works' },
          ].map((item, i) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-sm text-ink-400"
              style={{
                animation: `floatMedium 4s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            >
              <item.icon size={18} className="text-accent-400" />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium tracking-widest text-ink-400 uppercase">
            Scroll
          </span>
          <div className="h-12 w-6 rounded-full border-2 border-ink-600 flex justify-center pt-1.5">
            <div
              className="h-2 w-1 rounded-full bg-accent-400"
              style={{
                animation: 'floatFast 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingShapes({ mouse }: { mouse: { x: number; y: number } }) {
  const parallax = (depth: number, extraTransform = '') => ({
    transform: `translate3d(${mouse.x * depth}px, ${mouse.y * depth}px, 0) ${extraTransform}`,
  });

  return (
    <>
      {/* Floating cube - top left */}
      <div
        className="absolute top-[15%] left-[8%] z-[1] hidden md:block"
        style={parallax(40)}
      >
        <div
          className="h-20 w-20 animate-float-slow"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 rounded-2xl glass rotate-12 glow-cyan" />
          <div className="absolute inset-0 rounded-2xl border border-accent-400/30 rotate-12" />
        </div>
      </div>

      {/* Floating ring - top right */}
      <div
        className="absolute top-[20%] right-[10%] z-[1] hidden md:block"
        style={parallax(-30)}
      >
        <div className="h-24 w-24 rounded-full border-2 border-accent-400/40 animate-spin-slow">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-accent-400 glow-cyan-strong" />
        </div>
      </div>

      {/* Hexagon - bottom left */}
      <div
        className="absolute bottom-[20%] left-[12%] z-[1] hidden md:block"
        style={parallax(25)}
      >
        <div className="h-16 w-16 animate-float-medium">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <polygon
              points="50,5 90,27 90,73 50,95 10,73 10,27"
              fill="none"
              stroke="rgba(34,211,238,0.3)"
              strokeWidth="2"
            />
            <polygon
              points="50,15 80,32 80,68 50,85 20,68 20,32"
              fill="rgba(34,211,238,0.05)"
              stroke="rgba(34,211,238,0.2)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>

      {/* Rotating square - bottom right */}
      <div
        className="absolute bottom-[25%] right-[8%] z-[1] hidden md:block"
        style={parallax(-15)}
      >
        <div className="h-14 w-14 rounded-lg border border-gold-400/30 animate-spin-reverse-slow">
          <div className="absolute inset-2 rounded-md bg-gold-500/5" />
        </div>
      </div>

      {/* Small dot grid pattern - far left */}
      <div
        className="absolute top-1/2 left-[5%] z-[1] hidden lg:block"
        style={parallax(50)}
      >
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-accent-400/40"
              style={{
                animation: `pulseGlow 2s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
