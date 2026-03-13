import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, TrendingUp, Globe, Users, Award, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920',
      subtitle: t('hero_subtitle'),
      title: t('hero_title'),
      desc: t('hero_desc')
    },
    {
      image: 'https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=1920',
      subtitle: 'INNOVATION AT CORE',
      title: 'Pioneering Sustainable Construction',
      desc: 'Integrating advanced technologies and green building practices to create a better world for future generations.'
    },
    {
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1920',
      subtitle: 'GLOBAL EXPERTISE',
      title: 'Connecting Continents & Communities',
      desc: 'From iconic bridges to expansive transport networks, we build the arteries of modern civilization.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero relative">
        <div className="hero-slider h-full w-full">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="overlay"></div>
              <div className="container h-full flex-center text-center">
                <div className="hero-content">
                  <span className="text-small text-gold mb-md block animate-fade-up">{slide.subtitle}</span>
                  <h1 className="animate-fade-up" style={{ animationDelay: '100ms' }}>{slide.title}</h1>
                  <p className="text-white mb-xl max-w-7xl mx-auto animate-fade-up" style={{ animationDelay: '200ms' }}>{slide.desc}</p>
                  <div className="hero-actions flex flex-wrap flex-center gap-md animate-fade-up" style={{ animationDelay: '300ms' }}>
                    <Link to="/projects" className="btn btn-primary">{t('btn_explore')}</Link>
                    <Link to="/contact" className="btn btn-outline">{t('btn_story')}</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="scroll-indicator animate-bounce">
          <ChevronRight size={30} className="rotate-90 text-white" />
        </div>
      </section>

      {/* About Overview */}
      <section className="section">
        <div className="container grid grid-2 items-center">
          <div className="reveal">
            <span className="text-small text-gold">WHO WE ARE</span>
            <h2>Seven Decades of Construction Excellence</h2>
            <p className="text-body mb-lg">Founded in 1955 by Osman Ahmed Osman, Arab Contractors has grown into a global engineering powerhouse. We are committed to delivering high-quality infrastructure that shapes nations and empowers communities.</p>
            <ul className="mb-xl">
              <li className="flex items-center gap-sm mb-sm"><CheckCircle size={20} className="text-gold" /> <span>Leading construction company in MEA</span></li>
              <li className="flex items-center gap-sm mb-sm"><CheckCircle size={20} className="text-gold" /> <span>70+ years of engineering heritage</span></li>
              <li className="flex items-center gap-sm mb-sm"><CheckCircle size={20} className="text-gold" /> <span>Operating in over 30 countries</span></li>
            </ul>
            <Link to="/about" className="btn btn-primary">Read More</Link>
          </div>
          <div className="reveal">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800" alt="Arab Contractors HQ" className="radius-card shadow-strong" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="section-dark py-xl">
        <div className="container">
          <div className="grid grid-4 text-center stagger-container">
            <div className="stat-box">
              <TrendingUp size={40} className="text-gold mb-md" />
              <div className="stat-number">70+</div>
              <p className="stat-label">Years Experience</p>
            </div>
            <div className="stat-box">
              <CheckCircle size={40} className="text-gold mb-md" />
              <div className="stat-number">2000+</div>
              <p className="stat-label">Projects Completed</p>
            </div>
            <div className="stat-box">
              <Globe size={40} className="text-gold mb-md" />
              <div className="stat-number">29+</div>
              <p className="stat-label">Countries</p>
            </div>
            <div className="stat-box">
              <Users size={40} className="text-gold mb-md" />
              <div className="stat-number">70,000+</div>
              <p className="stat-label">Employees</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section section-light">
        <div className="container">
          <div className="section-title">
            <span className="text-small text-gold">PORTFOLIO</span>
            <h2>Landmark Projects</h2>
          </div>
          <div className="grid grid-3 stagger-container">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card">
                <div className="card-img-wrapper">
                  <img src={`https://images.unsplash.com/photo-${i === 1 ? '1545558014-8692077e9b5c' : i === 2 ? '1584464431734-7c7036618e7e' : '1519011985187-444d62641929'}?w=600`} alt="Project" className="card-img" referrerPolicy="no-referrer" />
                  <div className="badge absolute top-md left-md">Infrastructure</div>
                </div>
                <div className="card-content">
                  <h3 className="mb-sm">Project Title {i}</h3>
                  <p className="text-body mb-lg">A masterpiece of modern engineering and construction excellence.</p>
                  <div className="mt-auto">
                    <Link to="/projects" className="text-primary font-bold hover:text-gold transition-default">VIEW DETAILS →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-3xl">
            <Link to="/projects" className="btn btn-primary">View All Projects</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
