import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Maximize2, X } from 'lucide-react';

const GalleryPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800', title: 'Rod El Farag Axis' },
    { url: 'https://images.unsplash.com/photo-1584464431734-7c7036618e7e?w=800', title: 'Aswan Solar Park' },
    { url: 'https://images.unsplash.com/photo-1519011985187-444d62641929?w=800', title: 'Cairo Metro' },
    { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', title: 'New Admin Capital' },
    { url: 'https://images.unsplash.com/photo-1503387762-592dee58c162?w=800', title: 'Grand Egyptian Museum' },
    { url: 'https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=800', title: 'Bahr El Baqar' },
    { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800', title: 'Construction Site' },
    { url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800', title: 'Engineering Team' },
    { url: 'https://images.unsplash.com/photo-1503387762-592dee58c162?w=800', title: 'Architecture' },
  ];

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="hero relative" style={{ minHeight: '40vh' }}>
        <div className="hero-slide active" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592dee58c162?w=1920')" }}>
          <div className="overlay"></div>
          <div className="container h-full flex-center text-center">
            <div className="hero-content">
              <h1 className="animate-fade-up">{t('gallery_page_title')}</h1>
              <p className="text-white animate-fade-up" style={{ animationDelay: '100ms' }}>{t('gallery_page_subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3 stagger-container">
            {images.map((img, index) => (
              <div 
                key={index} 
                className="relative group overflow-hidden radius-card cursor-pointer aspect-square"
                onClick={() => setSelectedImage(img.url)}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-slow group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-default flex-center">
                  <div className="text-center p-md">
                    <Maximize2 size={32} className="text-white mb-sm mx-auto" />
                    <p className="text-white font-bold">{img.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex-center p-xl animate-fade-in">
          <button 
            className="absolute top-xl right-xl text-white hover:text-gold transition-default"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full view" 
            className="max-w-full max-h-full radius-card shadow-strong"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
