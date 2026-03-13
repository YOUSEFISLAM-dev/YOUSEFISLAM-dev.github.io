import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, MapPin, Building, Users, ArrowLeft } from 'lucide-react';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();

  // Mock data for project details
  const project = {
    title: 'Rod El Farag Axis',
    subtitle: 'World Record Cable-Stayed Bridge',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920',
    desc: 'The Rod El Farag Axis is one of the most important projects in Egypt, featuring the world\'s widest cable-stayed bridge. It serves as a vital link connecting East and West Cairo, significantly reducing travel time and congestion.',
    location: 'Cairo, Egypt',
    date: '2016 - 2019',
    client: 'Engineering Authority of the Armed Forces',
    category: 'Infrastructure',
    stats: [
      { label: 'Length', value: '16.7 km' },
      { label: 'Width', value: '67.3 m' },
      { label: 'Lanes', value: '12 Lanes' },
      { label: 'Concrete', value: '1M m³' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800',
      'https://images.unsplash.com/photo-1584464431734-7c7036618e7e?w=800',
      'https://images.unsplash.com/photo-1519011985187-444d62641929?w=800'
    ]
  };

  return (
    <div className="project-detail-page">
      {/* Hero Section */}
      <section className="hero relative" style={{ minHeight: '60vh' }}>
        <div className="hero-slide active" style={{ backgroundImage: `url(${project.image})` }}>
          <div className="overlay"></div>
          <div className="container h-full flex items-end pb-3xl">
            <div className="hero-content text-left max-w-3xl">
              <Link to="/projects" className="flex items-center gap-xs text-gold font-bold mb-md hover:translate-x-[-5px] transition-default">
                <ArrowLeft size={18} /> BACK TO PROJECTS
              </Link>
              <h1 className="animate-fade-up">{project.title}</h1>
              <p className="text-white animate-fade-up" style={{ animationDelay: '100ms' }}>{project.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3 gap-3xl">
            {/* Main Content */}
            <div className="col-span-2 reveal">
              <h2 className="mb-lg">Project Overview</h2>
              <p className="text-body mb-xl leading-relaxed">{project.desc}</p>
              
              <h3 className="mb-lg">Key Highlights</h3>
              <ul className="grid grid-2 gap-md mb-2xl">
                <li className="flex items-center gap-sm"><div className="w-2 h-2 bg-gold radius-circle"></div> <span>World Record for widest cable-stayed bridge</span></li>
                <li className="flex items-center gap-sm"><div className="w-2 h-2 bg-gold radius-circle"></div> <span>Constructed by 4,000 engineers and workers</span></li>
                <li className="flex items-center gap-sm"><div className="w-2 h-2 bg-gold radius-circle"></div> <span>Advanced structural monitoring systems</span></li>
                <li className="flex items-center gap-sm"><div className="w-2 h-2 bg-gold radius-circle"></div> <span>Strategic link for national development</span></li>
              </ul>

              <div className="grid grid-3 gap-md stagger-container">
                {project.gallery.map((img, i) => (
                  <img key={i} src={img} alt="Gallery" className="radius-card shadow-md aspect-video object-cover" referrerPolicy="no-referrer" />
                ))}
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="reveal">
              <div className="card p-xl bg-card sticky top-[var(--nav-height)]">
                <h3 className="mb-xl border-bottom pb-md">Project Details</h3>
                
                <div className="mb-lg">
                  <div className="flex items-center gap-sm text-gold mb-xs">
                    <MapPin size={18} />
                    <span className="font-bold text-small">LOCATION</span>
                  </div>
                  <p className="text-body">{project.location}</p>
                </div>

                <div className="mb-lg">
                  <div className="flex items-center gap-sm text-gold mb-xs">
                    <Calendar size={18} />
                    <span className="font-bold text-small">TIMELINE</span>
                  </div>
                  <p className="text-body">{project.date}</p>
                </div>

                <div className="mb-lg">
                  <div className="flex items-center gap-sm text-gold mb-xs">
                    <Building size={18} />
                    <span className="font-bold text-small">CLIENT</span>
                  </div>
                  <p className="text-body">{project.client}</p>
                </div>

                <div className="mb-xl">
                  <div className="flex items-center gap-sm text-gold mb-xs">
                    <Users size={18} />
                    <span className="font-bold text-small">CATEGORY</span>
                  </div>
                  <p className="text-body">{project.category}</p>
                </div>

                <div className="grid grid-2 gap-md">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="bg-body/5 p-md radius-card text-center">
                      <div className="text-gold font-bold text-lg">{stat.value}</div>
                      <div className="text-xs text-muted uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
