import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'yantrasysteminfrastructure@gmail.com',
    href: 'mailto:yantrasysteminfrastructure@gmail.com',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '8977843546',
    href: 'tel:+918977843546',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Tirupati, Andhra Pradesh',
    href: '#',
  },
];

export function Contact() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const message = encodeURIComponent(`Hello Yantra Systems & Infrastructure, my name is ${form.name}. I need help with ${form.service}. ${form.message}`);
    window.open(`https://wa.me/918977843546?text=${message}`, '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', service: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 700);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-accent-700/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gold-600/5 blur-[100px]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className={`mb-16 text-center reveal ${visible ? 'visible' : ''}`}>
          <span className="text-sm font-semibold tracking-widest text-accent-400 uppercase">
            Get In Touch
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink-50 sm:text-5xl md:text-6xl">
            Let's Build <span className="text-gradient">Together</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-300">
            Have a project in mind? Tell us about it — your project details will open directly in WhatsApp for a fast response.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Contact info cards */}
          <div className={`reveal ${visible ? 'visible' : ''} lg:col-span-2`} style={{ transitionDelay: '100ms' }}>
            <div className="flex h-full flex-col gap-4">
              {CONTACT_INFO.map((info, i) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="group flex items-center gap-4 rounded-2xl glass p-5 transition-all duration-300 hover:border-accent-400/30 hover:-translate-y-0.5"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/15 to-accent-700/5 transition-all duration-300 group-hover:scale-110 group-hover:glow-cyan">
                    <info.icon size={22} className="text-accent-400" />
                  </div>
                  <div>
                    <div className="text-xs font-medium tracking-widest text-ink-400 uppercase">
                      {info.label}
                    </div>
                    <div className="mt-0.5 text-base font-semibold text-ink-100">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}

              {/* Quick highlight */}
              <div className="mt-auto rounded-2xl bg-gradient-to-br from-accent-600/15 to-ink-900/30 p-6 border border-accent-400/10">
                <div className="flex items-center gap-2 text-accent-300">
                  <MessageSquare size={18} />
                  <span className="text-sm font-semibold">Fast Response</span>
                </div>
                <p className="mt-2 text-sm text-ink-300">
                  Your project details open directly in WhatsApp. For urgent projects, call 8977843546.
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div
            className={`reveal ${visible ? 'visible' : ''} lg:col-span-3`}
            style={{ transitionDelay: '200ms' }}
          >
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-2xl glass-strong p-8"
            >
              <div className="absolute inset-0 bg-grid-pattern bg-grid-fade opacity-10" />

              <div className="relative z-10 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    label="Full Name"
                    type="text"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    placeholder="John Doe"
                    required
                  />
                  <FormField
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-ink-200">
                    Service Needed
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    required
                    className="w-full rounded-xl border border-ink-700/50 bg-ink-900/60 px-4 py-3 text-ink-100 outline-none transition-all duration-300 focus:border-accent-400/50 focus:shadow-lg focus:shadow-accent-500/10"
                  >
                    <option value="">Select a service...</option>
                    <option>Web Development</option>
                    <option>Mobile App Development</option>
                    <option>Embedded Systems</option>
                    <option>B.Tech / Degree Projects</option>
                    <option>Civil Works</option>
                    <option>Other / Multiple</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-ink-200">
                    Project Details
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project, timeline, and budget..."
                    required
                    rows={4}
                    className="w-full resize-none rounded-xl border border-ink-700/50 bg-ink-900/60 px-4 py-3 text-ink-100 outline-none transition-all duration-300 focus:border-accent-400/50 focus:shadow-lg focus:shadow-accent-500/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-accent-700 px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-accent-500/40 disabled:opacity-70"
                >
                  {status === 'idle' && (
                    <>
                      Send to WhatsApp
                      <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                  {status === 'loading' && (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <CheckCircle2 size={18} />
                      Message Sent!
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-ink-200">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-ink-700/50 bg-ink-900/60 px-4 py-3 text-ink-100 outline-none transition-all duration-300 focus:border-accent-400/50 focus:shadow-lg focus:shadow-accent-500/10"
      />
    </div>
  );
}
