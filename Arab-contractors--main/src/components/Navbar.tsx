import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_about'), path: '/about' },
    { name: t('nav_projects'), path: '/projects', hasMegaMenu: true },
    { name: t('nav_sectors'), path: '/sectors' },
    { name: t('nav_gallery'), path: '/gallery' },
    { name: t('nav_news'), path: '/news' },
    { name: t('nav_contact'), path: '/contact' },
  ];

  return (
    <>
      <header className={`header z-1000 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container flex-between h-full">
          <Link to="/" className="logo flex-center">
            <svg width="180" height="60" viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="25" fill="#003366" />
              <text x="30" y="38" font-family="Arial" font-size="24" fill="white" text-anchor="middle" font-weight="bold">AC</text>
              <text x="65" y="28" font-family="Arial" font-size="18" fill="#003366" font-weight="bold">ARAB CONTRACTORS</text>
              <text x="65" y="48" font-family="Arial" font-size="14" fill="#E8A317" font-weight="bold">المقاولون العرب</text>
            </svg>
          </Link>

          <nav className="nav-desktop">
            <ul className="flex gap-xl">
              {navLinks.map((link) => (
                <li key={link.path} className={link.hasMegaMenu ? 'has-mega-menu' : ''}>
                  <NavLink 
                    to={link.path} 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                  </NavLink>
                  {link.hasMegaMenu && (
                    <div className="mega-menu">
                      <div className="container grid grid-3">
                        <div>
                          <h4 className="mb-md">{t('nav_by_sector')}</h4>
                          <ul>
                            <li><Link to="/projects?sector=infrastructure">{t('sector_infrastructure')}</Link></li>
                            <li><Link to="/projects?sector=buildings">{t('sector_buildings')}</Link></li>
                            <li><Link to="/projects?sector=energy">{t('sector_energy')}</Link></li>
                            <li><Link to="/projects?sector=water">{t('sector_water')}</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-md">{t('nav_by_region')}</h4>
                          <ul>
                            <li><Link to="/projects?region=egypt">{t('region_egypt')}</Link></li>
                            <li><Link to="/projects?region=africa">{t('region_africa')}</Link></li>
                            <li><Link to="/projects?region=middle-east">{t('region_middle_east')}</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-md">{t('nav_featured')}</h4>
                          <div className="featured-nav-item">
                            <img src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400" alt="Rod El Farag Bridge" referrerPolicy="no-referrer" />
                            <p className="text-small mt-sm">Rod El Farag Axis Bridge</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions flex items-center gap-md">
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="search-trigger">
              <Search size={20} />
            </button>
            <button onClick={toggleLanguage} className="lang-toggle notranslate">
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <button className="nav-mobile-toggle lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`nav-drawer ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="p-lg flex-between border-bottom">
          <h3 className="mb-0">{t('menu')}</h3>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="p-lg">
          <ul className="drawer-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-1000" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
