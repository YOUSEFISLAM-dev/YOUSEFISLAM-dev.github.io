import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Target, Eye, ShieldCheck } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero relative" style={{ minHeight: '40vh' }}>
        <div className="hero-slide active" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920')" }}>
          <div className="overlay"></div>
          <div className="container h-full flex-center text-center">
            <div className="hero-content">
              <h1 className="animate-fade-up">{t('about_page_title')}</h1>
              <p className="text-white animate-fade-up" style={{ animationDelay: '100ms' }}>{t('about_page_subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="section">
        <div className="container grid grid-2 items-center">
          <div className="reveal">
            <span className="text-small text-gold">{t('about_history_subtitle')}</span>
            <h2>{t('about_history_title')}</h2>
            <p className="text-body mb-md">{t('about_history_p1')}</p>
            <p className="text-body">{t('about_history_p2')}</p>
          </div>
          <div className="reveal">
            <img src="https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=800" alt="History" className="radius-card shadow-strong" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="section section-light">
        <div className="container">
          <div className="grid grid-3 stagger-container">
            <div className="card p-xl text-center">
              <div className="flex-center mb-lg">
                <Target size={48} className="text-gold" />
              </div>
              <h3 className="mb-md">{t('about_mission_title')}</h3>
              <p className="text-body">{t('about_mission_desc')}</p>
            </div>
            <div className="card p-xl text-center">
              <div className="flex-center mb-lg">
                <Eye size={48} className="text-gold" />
              </div>
              <h3 className="mb-md">{t('about_vision_title')}</h3>
              <p className="text-body">{t('about_vision_desc')}</p>
            </div>
            <div className="card p-xl text-center">
              <div className="flex-center mb-lg">
                <ShieldCheck size={48} className="text-gold" />
              </div>
              <h3 className="mb-md">{t('about_values_title')}</h3>
              <p className="text-body">{t('about_values_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="text-small text-gold">{t('about_leadership_subtitle')}</span>
            <h2>{t('about_leadership_title')}</h2>
          </div>
          <div className="grid grid-4 stagger-container">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center group">
                <div className="overflow-hidden radius-card mb-md">
                  <img 
                    src={`https://images.unsplash.com/photo-${i === 1 ? '1507003211169-0a1dd7228f2d' : i === 2 ? '1500648767791-00dcc994a43e' : i === 3 ? '1472099645785-5658abf4ff4e' : '1544005313-94ddf0286df2'}?w=400&h=500&fit=crop`} 
                    alt="Leader" 
                    className="w-full h-full object-cover transition-slow group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="mb-xs">{t(`about_leader_${i}_name`)}</h4>
                <p className="text-small text-gold">{t(`about_leader_${i}_role`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
