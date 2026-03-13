import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Building2, Construction, Zap, Droplets, Ship, Plane } from 'lucide-react';

const SectorsPage: React.FC = () => {
  const { t } = useLanguage();

  const sectors = [
    { icon: <Construction size={40} />, title: t('sector_infra_title'), desc: t('sector_infra_desc'), image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600' },
    { icon: <Building2 size={40} />, title: t('sector_buildings_title'), desc: t('sector_buildings_desc'), image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600' },
    { icon: <Zap size={40} />, title: t('sector_energy_title'), desc: t('sector_energy_desc'), image: 'https://images.unsplash.com/photo-1584464431734-7c7036618e7e?w=600' },
    { icon: <Droplets size={40} />, title: t('sector_water_title'), desc: t('sector_water_desc'), image: 'https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=600' },
    { icon: <Ship size={40} />, title: t('sector_maritime_title'), desc: t('sector_maritime_desc'), image: 'https://images.unsplash.com/photo-1519011985187-444d62641929?w=600' },
    { icon: <Plane size={40} />, title: t('sector_airports_title'), desc: t('sector_airports_desc'), image: 'https://images.unsplash.com/photo-1503387762-592dee58c162?w=600' },
  ];

  return (
    <div className="sectors-page">
      {/* Hero Section */}
      <section className="hero relative" style={{ minHeight: '40vh' }}>
        <div className="hero-slide active" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1920')" }}>
          <div className="overlay"></div>
          <div className="container h-full flex-center text-center">
            <div className="hero-content">
              <h1 className="animate-fade-up">{t('sectors_page_title')}</h1>
              <p className="text-white animate-fade-up" style={{ animationDelay: '100ms' }}>{t('sectors_page_subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2 stagger-container">
            {sectors.map((sector, index) => (
              <div key={index} className="card flex-row items-center gap-lg p-lg overflow-hidden">
                <div className="w-1/3 h-full hidden sm:block">
                  <img src={sector.image} alt={sector.title} className="w-full h-full object-cover radius-card" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <div className="text-gold mb-md">{sector.icon}</div>
                  <h3 className="mb-sm">{sector.title}</h3>
                  <p className="text-body mb-lg">{sector.desc}</p>
                  <button className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.8rem' }}>Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectorsPage;
