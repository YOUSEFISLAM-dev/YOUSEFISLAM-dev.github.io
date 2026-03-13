import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, User, ArrowRight } from 'lucide-react';

const NewsPage: React.FC = () => {
  const { t } = useLanguage();

  const news = [
    { id: 1, title: t('news_1_title'), date: 'Oct 24, 2023', author: 'Admin', image: 'https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=600', excerpt: t('news_1_desc') },
    { id: 2, title: t('news_2_title'), date: 'Oct 15, 2023', author: 'Admin', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600', excerpt: t('news_2_desc') },
    { id: 3, title: t('news_3_title'), date: 'Sep 30, 2023', author: 'Admin', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600', excerpt: t('news_3_desc') },
  ];

  return (
    <div className="news-page">
      {/* Hero Section */}
      <section className="hero relative" style={{ minHeight: '40vh' }}>
        <div className="hero-slide active" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920')" }}>
          <div className="overlay"></div>
          <div className="container h-full flex-center text-center">
            <div className="hero-content">
              <h1 className="animate-fade-up">{t('news_page_title')}</h1>
              <p className="text-white animate-fade-up" style={{ animationDelay: '100ms' }}>{t('news_page_subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3 stagger-container">
            {news.map((item) => (
              <div key={item.id} className="card group">
                <div className="card-img-wrapper overflow-hidden">
                  <img src={item.image} alt={item.title} className="card-img transition-slow group-hover:scale-110" referrerPolicy="no-referrer" />
                </div>
                <div className="card-content">
                  <div className="flex items-center gap-md text-small text-muted mb-sm">
                    <span className="flex items-center gap-xs"><Calendar size={14} /> {item.date}</span>
                    <span className="flex items-center gap-xs"><User size={14} /> {item.author}</span>
                  </div>
                  <h3 className="mb-md group-hover:text-primary transition-default">{item.title}</h3>
                  <p className="text-body mb-lg line-clamp-3">{item.excerpt}</p>
                  <button className="flex items-center gap-xs text-primary font-bold hover:text-gold transition-default">
                    READ MORE <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
