import { Code2, Smartphone, Cpu, GraduationCap, Building2, ArrowUp } from 'lucide-react';

const FOOTER_LINKS = [
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '#services' },
      { label: 'Mobile App Development', href: '#services' },
      { label: 'Embedded Systems', href: '#services' },
      { label: 'B.Tech / Degree Projects', href: '#services' },
      { label: 'Civil Works', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

const SERVICE_ICONS = [Code2, Smartphone, Cpu, GraduationCap, Building2];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-ink-800/50 pt-20 pb-8">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-accent-700/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-700 text-ink-960 font-bold text-lg glow-cyan">
                Y
              </div>
              <div>
                <div className="text-base font-bold text-ink-50">Yantra</div>
                <div className="text-[10px] tracking-widest text-accent-400 uppercase">
                  Systems & Infrastructure
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-400">
              Engineering digital and physical excellence. From web platforms to
              civil works — one team, multiple disciplines, zero handoffs.
            </p>

            {/* Service icons row */}
            <div className="mt-6 flex gap-3">
              {SERVICE_ICONS.map((Icon, i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-lg glass text-accent-400 transition-all duration-300 hover:scale-110 hover:glow-cyan"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold tracking-widest text-ink-200 uppercase">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNav(link.href)}
                      className="text-sm text-ink-400 transition-colors hover:text-accent-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-14 h-px bg-gradient-to-r from-transparent via-ink-700/40 to-transparent" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-ink-500">
            {new Date().getFullYear()} Yantra Systems & Infrastructure. All rights
            reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 rounded-xl glass px-4 py-2 text-sm font-medium text-ink-300 transition-all duration-300 hover:border-accent-400/30 hover:text-accent-300"
          >
            Back to Top
            <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
