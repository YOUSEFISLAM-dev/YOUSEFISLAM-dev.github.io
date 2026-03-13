import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, Filter, MapPin } from 'lucide-react';

const ProjectsPage: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const projects = [
    { id: 'rod', title: t('project_rod_title'), desc: t('project_rod_desc'), category: 'infrastructure', image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600' },
    { id: 'aswan', title: t('project_aswan_title'), desc: t('project_aswan_desc'), category: 'energy', image: 'https://images.unsplash.com/photo-1584464431734-7c7036618e7e?w=600' },
    { id: 'metro', title: t('project_metro_title'), desc: t('project_metro_desc'), category: 'infrastructure', image: 'https://images.unsplash.com/photo-1519011985187-444d62641929?w=600' },
    { id: 'nac', title: t('project_nac_title'), desc: t('project_nac_desc'), category: 'buildings', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600' },
    { id: 'gem', title: t('project_gem_title'), desc: t('project_gem_desc'), category: 'buildings', image: 'https://images.unsplash.com/photo-1503387762-592dee58c162?w=600' },
    { id: 'bahr', title: t('project_bahr_title'), desc: t('project_bahr_desc'), category: 'infrastructure', image: 'https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=600' },
  ];

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="hero relative" style={{ minHeight: '40vh' }}>
        <div className="hero-slide active" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=1920')" }}>
          <div className="overlay"></div>
          <div className="container h-full flex-center text-center">
            <div className="hero-content">
              <h1 className="animate-fade-up">{t('projects_page_title')}</h1>
              <p className="text-white animate-fade-up" style={{ animationDelay: '100ms' }}>{t('projects_page_subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="section py-xl bg-card border-bottom sticky top-[var(--nav-height)] z-10">
        <div className="container flex-between sm:flex-row gap-lg">
          <div className="flex gap-md overflow-x-auto hide-scrollbar py-sm">
            {['all', 'infrastructure', 'buildings', 'energy'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '8px 20px', fontSize: '0.8rem', color: filter === cat ? 'white' : 'var(--text-main)', borderColor: filter === cat ? 'var(--color-primary)' : 'var(--border-color)' }}
              >
                {t(`projects_filter_${cat}`)}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-auto">
            <input 
              type="text" 
              placeholder={t('projects_search_placeholder')} 
              className="form-control pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3 stagger-container">
            {filteredProjects.map((project) => (
              <div key={project.id} className="card">
                <div className="card-img-wrapper">
                  <img src={project.image} alt={project.title} className="card-img" referrerPolicy="no-referrer" />
                  <div className="badge absolute top-md left-md">{project.category}</div>
                </div>
                <div className="card-content">
                  <div className="flex items-center gap-xs text-gold text-small mb-xs">
                    <MapPin size={14} />
                    <span>Egypt</span>
                  </div>
                  <h3 className="mb-sm">{project.title}</h3>
                  <p className="text-body mb-lg">{project.desc}</p>
                  <div className="mt-auto">
                    <button className="text-primary font-bold hover:text-gold transition-default">VIEW DETAILS →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
