import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Lightbulb, Cpu, Leaf, Globe2 } from 'lucide-react';

const InnovationPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="innovation-page">
      {/* Hero Section */}
      <section className="hero relative" style={{ minHeight: '40vh' }}>
        <div className="hero-slide active" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1920')" }}>
          <div className="overlay"></div>
          <div className="container h-full flex-center text-center">
            <div className="hero-content">
              <h1 className="animate-fade-up">{t('innovation_page_title')}</h1>
              <p className="text-white animate-fade-up" style={{ animationDelay: '100ms' }}>{t('innovation_page_subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Pillars */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2 items-center mb-3xl">
            <div className="reveal">
              <span className="text-small text-gold">OUR APPROACH</span>
              <h2>Driving the Future of Construction</h2>
              <p className="text-body mb-lg">At Arab Contractors, innovation is not just a buzzword; it's our core strategy. We continuously invest in research and development to stay at the forefront of the global construction industry.</p>
              <div className="flex gap-lg items-start mb-md">
                <div className="w-12 h-12 bg-gold/10 text-gold radius-circle flex-center flex-shrink-0">
                  <Cpu size={24} />
                </div>
                <div>
                  <h4 className="mb-xs">Advanced Technology</h4>
                  <p className="text-small text-muted">Utilizing BIM, AI, and IoT to optimize project lifecycles and ensure precision.</p>
                </div>
              </div>
              <div className="flex gap-lg items-start">
                <div className="w-12 h-12 bg-gold/10 text-gold radius-circle flex-center flex-shrink-0">
                  <Leaf size={24} />
                </div>
                <div>
                  <h4 className="mb-xs">Sustainability</h4>
                  <p className="text-small text-muted">Implementing green building practices and sustainable materials in every project.</p>
                </div>
              </div>
            </div>
            <div className="reveal">
              <img src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800" alt="Innovation" className="radius-card shadow-strong" referrerPolicy="no-referrer" />
            </div>
          </div>

          <div className="grid grid-3 stagger-container">
            <div className="card p-xl">
              <Lightbulb size={40} className="text-gold mb-lg" />
              <h3 className="mb-md">R&D Center</h3>
              <p className="text-body">Our dedicated research center focuses on material science and structural engineering breakthroughs.</p>
            </div>
            <div className="card p-xl">
              <Globe2 size={40} className="text-gold mb-lg" />
              <h3 className="mb-md">Digital Transformation</h3>
              <p className="text-body">Fully integrated digital workflows that connect our global teams in real-time.</p>
            </div>
            <div className="card p-xl">
              <Leaf size={40} className="text-gold mb-lg" />
              <h3 className="mb-md">Eco-Friendly Tech</h3>
              <p className="text-body">Pioneering carbon-neutral construction methods and renewable energy integration.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InnovationPage;
