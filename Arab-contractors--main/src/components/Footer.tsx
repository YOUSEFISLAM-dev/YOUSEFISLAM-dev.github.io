import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer py-4xl">
      <div className="container">
        <div className="grid grid-4 gap-xl">
          <div className="reveal">
            <Link to="/" className="logo mb-lg block">
              <svg width="180" height="60" viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="25" fill="#003366" />
                <text x="30" y="38" font-family="Arial" font-size="24" fill="white" text-anchor="middle" font-weight="bold">AC</text>
                <text x="65" y="28" font-family="Arial" font-size="18" fill="#003366" font-weight="bold">ARAB CONTRACTORS</text>
                <text x="65" y="48" font-family="Arial" font-size="14" fill="#E8A317" font-weight="bold">المقاولون العرب</text>
              </svg>
            </Link>
            <p className="text-muted mb-lg">{t('footer_desc')}</p>
            <div className="flex gap-md">
              <a href="#" className="text-muted hover:text-gold transition-default"><Facebook size={20} /></a>
              <a href="#" className="text-muted hover:text-gold transition-default"><Twitter size={20} /></a>
              <a href="#" className="text-muted hover:text-gold transition-default"><Linkedin size={20} /></a>
              <a href="#" className="text-muted hover:text-gold transition-default"><Instagram size={20} /></a>
              <a href="#" className="text-muted hover:text-gold transition-default"><Youtube size={20} /></a>
            </div>
          </div>

          <div className="reveal delay-100">
            <h4 className="mb-lg">{t('footer_quick_links')}</h4>
            <ul className="flex flex-col gap-sm">
              <li><Link to="/" className="text-muted hover:text-gold transition-default">{t('nav_home')}</Link></li>
              <li><Link to="/about" className="text-muted hover:text-gold transition-default">{t('nav_about')}</Link></li>
              <li><Link to="/projects" className="text-muted hover:text-gold transition-default">{t('nav_projects')}</Link></li>
              <li><Link to="/sectors" className="text-muted hover:text-gold transition-default">{t('nav_sectors')}</Link></li>
              <li><Link to="/news" className="text-muted hover:text-gold transition-default">{t('nav_news')}</Link></li>
            </ul>
          </div>

          <div className="reveal delay-200">
            <h4 className="mb-lg">{t('footer_contact')}</h4>
            <ul className="flex flex-col gap-md">
              <li className="flex items-start gap-sm">
                <MapPin size={20} className="text-gold flex-shrink-0" />
                <span className="text-muted">{t('footer_address')}</span>
              </li>
              <li className="flex items-center gap-sm">
                <Phone size={20} className="text-gold flex-shrink-0" />
                <span className="text-muted">+20 2 23959500</span>
              </li>
              <li className="flex items-center gap-sm">
                <Mail size={20} className="text-gold flex-shrink-0" />
                <span className="text-muted">info@arabcont.com</span>
              </li>
            </ul>
          </div>

          <div className="reveal delay-300">
            <h4 className="mb-lg">{t('footer_follow')}</h4>
            <p className="text-muted mb-md">Subscribe to our newsletter for latest updates.</p>
            <form className="flex gap-xs">
              <input 
                type="email" 
                placeholder="Email address" 
                className="form-control" 
                style={{ padding: '8px 12px' }}
              />
              <button className="btn btn-primary" style={{ padding: '8px 16px' }}>Join</button>
            </form>
          </div>
        </div>

        <div className="border-top mt-4xl pt-xl flex-between text-small">
          <p className="text-muted">&copy; {new Date().getFullYear()} {t('footer_rights')}</p>
          <div className="flex gap-lg">
            <a href="#" className="text-muted hover:text-gold">{t('footer_privacy')}</a>
            <a href="#" className="text-muted hover:text-gold">{t('footer_terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
