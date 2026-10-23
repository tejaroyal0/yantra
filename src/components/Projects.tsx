import { useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ExternalLink, MessageCircle, X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Project {
  title: string;
  category: string;
  shortDescription: string;
  overview: string;
  bestFor: string[];
  deliverables: string[];
  tags: string[];
  image: string;
  year: string;
  website?: string;
}

const WHATSAPP_NUMBER = '918977843546';

const PROJECTS: Project[] = [
  {
    title: 'PresentTrip',
    category: 'Web Development',
    shortDescription: 'A polished travel platform designed to make trip discovery, planning, and enquiries easier.',
    overview: 'PresentTrip is a travel-focused digital experience built to present destinations, travel services, and trip opportunities in a clear and engaging way. Yantra can take the concept from visual design to a fast, responsive website with enquiry flows, content management, integrations, and analytics.',
    bestFor: ['Travel businesses', 'Tour operators', 'Destination discovery', 'Online trip enquiries'],
    deliverables: ['Responsive website', 'Travel packages and destination pages', 'Enquiry and lead capture forms', 'Admin-ready content structure', 'Search and performance optimisation'],
    tags: ['Web Design', 'Responsive UI', 'Lead Generation', 'SEO'],
    image: 'https://images.pexels.com/photos/12969403/pexels-photo-12969403.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    year: 'Featured',
    website: 'https://www.presenttrip.com',
  },
  {
    title: 'Sri Anantha Cart',
    category: 'Web Development',
    shortDescription: 'An online shopping experience for presenting products, building trust, and converting visitors into customers.',
    overview: 'Sri Anantha Cart demonstrates how a local business can build a stronger digital storefront. Yantra can create the complete shopping journey: product presentation, category browsing, enquiries or checkout, mobile-first design, and simple tools for keeping the catalogue updated.',
    bestFor: ['Retail stores', 'Local brands', 'Product catalogues', 'Online ordering'],
    deliverables: ['Product catalogue experience', 'Mobile-first storefront', 'Category and product detail pages', 'Order or enquiry flow', 'Business contact integration'],
    tags: ['E-commerce', 'Product UI', 'Mobile Ready', 'Business Growth'],
    image: 'https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    year: 'Featured',
    website: 'https://www.sriananthacart.com',
  },
  {
    title: 'PresentTrip Mobile App',
    category: 'Mobile App Development',
    shortDescription: 'A mobile-first travel companion for discovering, saving, and enquiring about trips from anywhere.',
    overview: 'The PresentTrip mobile app concept brings the travel journey into the customer’s pocket. Yantra can design and develop an Android and iOS experience with smooth navigation, location-aware discovery, saved trips, push notifications, and a connected web or admin system.',
    bestFor: ['Travel discovery', 'Customer engagement', 'Trip alerts', 'Repeat bookings'],
    deliverables: ['Android and iOS app', 'Destination and package browsing', 'Push notification setup', 'Enquiry and booking journey', 'App publishing support'],
    tags: ['Android', 'iOS', 'Push Notifications', 'App UX'],
    image: 'https://images.pexels.com/photos/969462/pexels-photo-969462.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    year: 'Mobile',
  },
  {
    title: 'Sri Anantha Cart Mobile App',
    category: 'Mobile App Development',
    shortDescription: 'A convenient shopping app experience that keeps products, offers, and customer enquiries close at hand.',
    overview: 'A dedicated mobile app can help Sri Anantha Cart build a direct relationship with customers. Yantra can create a simple, quick, and reliable shopping experience with product discovery, offers, order requests, notifications, and direct support.',
    bestFor: ['Repeat customers', 'Local commerce', 'Offers and announcements', 'Direct customer support'],
    deliverables: ['Product browsing app', 'Offers and notification area', 'Order or enquiry requests', 'Customer support shortcut', 'Store-ready release build'],
    tags: ['Shopping App', 'Customer Retention', 'Android', 'iOS'],
    image: 'https://images.pexels.com/photos/15092/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
    year: 'Mobile',
  },
  {
    title: 'Smart Water Monitoring System',
    category: 'Embedded Systems',
    shortDescription: 'Connected monitoring for water level, quality, usage, and alerts across homes, farms, and facilities.',
    overview: 'A smart water monitoring system uses sensors and a controller to turn physical water conditions into useful information. Yantra can build the hardware, firmware, dashboard, and alert flow so owners can monitor tanks, detect abnormal levels, reduce wastage, and make faster maintenance decisions.',
    bestFor: ['Water tanks', 'Agriculture', 'Apartments', 'Industrial facilities'],
    deliverables: ['Sensor and controller integration', 'Water level monitoring', 'Usage and threshold alerts', 'IoT dashboard or mobile view', 'Prototype documentation and demo'],
    tags: ['IoT', 'Sensors', 'ESP32', 'Real-time Alerts'],
    image: 'https://images.pexels.com/photos/12446172/pexels-photo-12446172.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    year: 'Embedded',
  },
];

const CATEGORIES = ['All', 'Web Development', 'Mobile App Development', 'Embedded Systems'];

function whatsappLink(project: Project) {
  const message = encodeURIComponent(`Hello Yantra Systems & Infrastructure, I want to discuss the ${project.title} project.`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function Projects() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-accent-700/8 blur-[120px]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        <div className={`mb-12 text-center reveal ${visible ? 'visible' : ''}`}>
          <span className="text-sm font-semibold tracking-widest text-accent-400 uppercase">Our Work</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink-50 sm:text-5xl md:text-6xl">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-300">
            Explore the digital products and connected systems Yantra can design, develop, and support for your business.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-accent-500 to-accent-700 text-white shadow-lg shadow-accent-500/30'
                  : 'glass text-ink-300 hover:border-accent-400/30 hover:text-accent-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              visible={visible}
              onView={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  index,
  visible,
  onView,
}: {
  project: Project;
  index: number;
  visible: boolean;
  onView: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = cardRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = ((event.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`);
  };

  return (
    <div className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 80}ms` }}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)')}
        className="group relative h-full overflow-hidden rounded-2xl glass transition-all duration-300 hover:border-accent-400/30"
        style={{ transform, transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="relative h-52 overflow-hidden">
          <img src={project.image} alt={`${project.title} project`} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-960 via-ink-960/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="rounded-lg glass-strong px-3 py-1.5 text-xs font-medium text-accent-300">{project.category}</span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="rounded-lg glass-strong px-3 py-1.5 text-xs font-medium text-ink-200">{project.year}</span>
          </div>
          <div className="absolute bottom-4 left-5 right-5">
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          </div>
        </div>

        <div className="relative z-10 p-6" style={{ transform: 'translateZ(30px)' }}>
          <p className="text-sm leading-relaxed text-ink-300">{project.shortDescription}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => <span key={tag} className="rounded-md border border-ink-700/40 bg-ink-900/40 px-2.5 py-1 text-[11px] font-medium text-ink-400">{tag}</span>)}
          </div>
          <button onClick={onView} className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-accent-400 transition-colors hover:text-accent-300">
            View Full Details <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-960/85 p-4 backdrop-blur-md" onClick={onClose}>
      <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl glass-strong shadow-2xl shadow-black/50" onClick={(event) => event.stopPropagation()}>
        <button onClick={onClose} aria-label="Close project details" className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl glass text-ink-100 transition hover:text-accent-300"><X size={20} /></button>
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-64 md:min-h-full">
            <img src={project.image} alt={`${project.title} project detail`} className="h-full min-h-64 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-960 via-transparent to-transparent md:bg-gradient-to-r" />
          </div>
          <div className="p-7 md:p-10">
            <span className="text-xs font-semibold tracking-widest text-accent-400 uppercase">{project.category}</span>
            <h3 className="mt-3 text-3xl font-bold text-ink-50">{project.title}</h3>
            <p className="mt-5 text-base leading-relaxed text-ink-200">{project.overview}</p>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-ink-100">Best for</h4>
                <ul className="mt-3 space-y-2">{project.bestFor.map((item) => <li key={item} className="flex gap-2 text-sm text-ink-300"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success-400" />{item}</li>)}</ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink-100">What we can deliver</h4>
                <ul className="mt-3 space-y-2">{project.deliverables.map((item) => <li key={item} className="flex gap-2 text-sm text-ink-300"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent-400" />{item}</li>)}</ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappLink(project)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-ink-960 transition hover:scale-[1.02] hover:shadow-lg hover:shadow-[#25D366]/25"><MessageCircle size={18} />Discuss on WhatsApp</a>
              {project.website && <a href={project.website} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl glass px-5 py-3 text-sm font-semibold text-ink-100 transition hover:border-accent-400/30 hover:text-accent-300"><ExternalLink size={17} />Visit website</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
