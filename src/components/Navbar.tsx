import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { scrollY } = useScrollPosition();
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = scrollY > 60;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`mx-auto max-w-7xl px-6 transition-all duration-500 ${
            scrolled ? '' : ''
          }`}
        >
          <div
            className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${
              scrolled
                ? 'glass-strong shadow-2xl shadow-black/40'
                : 'bg-transparent'
            }`}
          >
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleClick('#hero');
              }}
              className="group flex items-center gap-3"
            >
              <div className="relative h-10 w-10 perspective-1000">
                <div className="preserve-3d h-full w-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                  <div className="backface-hidden absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-700 text-ink-960 font-bold text-lg shadow-lg glow-cyan">
                    Y
                  </div>
                  <div className="backface-hidden absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-ink-960 font-bold text-lg shadow-lg [transform:rotateY(180deg)]">
                    Y
                  </div>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight text-ink-50">
                  Yantra
                </span>
                <span className="text-[10px] font-medium tracking-widest text-accent-400 uppercase">
                  Systems & Infra
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className="group relative px-4 py-2 text-sm font-medium text-ink-200 transition-colors hover:text-accent-300"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-accent-400 transition-all duration-300 group-hover:w-3/4" />
                </button>
              ))}
              <button
                onClick={() => handleClick('#contact')}
                className="ml-3 rounded-xl bg-gradient-to-r from-accent-500 to-accent-700 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/40 hover:scale-105"
              >
                Get Quote
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg glass text-ink-100 md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-ink-960/80 backdrop-blur-xl" />
        <div className="relative flex h-full flex-col items-center justify-center gap-6">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className={`text-2xl font-semibold text-ink-100 transition-all duration-500 hover:text-accent-300 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleClick('#contact')}
            className="mt-4 rounded-xl bg-gradient-to-r from-accent-500 to-accent-700 px-8 py-3 text-lg font-semibold text-white"
          >
            Get Quote
          </button>
        </div>
      </div>
    </>
  );
}
