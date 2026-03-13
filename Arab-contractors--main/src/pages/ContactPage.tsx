import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero relative" style={{ minHeight: '40vh' }}>
        <div className="hero-slide active" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516387933901-8266440cda50?w=1920')" }}>
          <div className="overlay"></div>
          <div className="container h-full flex-center text-center">
            <div className="hero-content">
              <h1 className="animate-fade-up">{t('contact_page_title')}</h1>
              <p className="text-white animate-fade-up" style={{ animationDelay: '100ms' }}>{t('contact_page_subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2 gap-3xl">
            {/* Contact Info */}
            <div className="reveal">
              <h2 className="mb-lg">{t('contact_info_title')}</h2>
              <p className="text-body mb-2xl">{t('contact_info_desc')}</p>
              
              <div className="stagger-container">
                <div className="flex gap-lg mb-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold/10 text-gold radius-circle flex-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="mb-xs">{t('contact_address_label')}</h4>
                    <p className="text-body">34 Adly St., Cairo, Egypt</p>
                  </div>
                </div>
                
                <div className="flex gap-lg mb-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold/10 text-gold radius-circle flex-center">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="mb-xs">{t('contact_phone_label')}</h4>
                    <p className="text-body">+20 2 23959500</p>
                  </div>
                </div>
                
                <div className="flex gap-lg mb-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold/10 text-gold radius-circle flex-center">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="mb-xs">{t('contact_email_label')}</h4>
                    <p className="text-body">info@arabcont.com</p>
                  </div>
                </div>
                
                <div className="flex gap-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold/10 text-gold radius-circle flex-center">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="mb-xs">{t('contact_hours_label')}</h4>
                    <p className="text-body">Sun - Thu: 8:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="reveal">
              <div className="card p-2xl shadow-strong">
                <h3 className="mb-xl">{t('contact_form_title')}</h3>
                <form className="stagger-container">
                  <div className="grid grid-2 gap-md mb-md">
                    <div>
                      <label className="block text-small font-bold mb-xs">First Name</label>
                      <input type="text" className="form-control" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-small font-bold mb-xs">Last Name</label>
                      <input type="text" className="form-control" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="mb-md">
                    <label className="block text-small font-bold mb-xs">Email Address</label>
                    <input type="email" className="form-control" placeholder="john@example.com" />
                  </div>
                  <div className="mb-md">
                    <label className="block text-small font-bold mb-xs">Subject</label>
                    <select className="form-control">
                      <option>General Inquiry</option>
                      <option>Project Proposal</option>
                      <option>Careers</option>
                      <option>Media Relations</option>
                    </select>
                  </div>
                  <div className="mb-xl">
                    <label className="block text-small font-bold mb-xs">Message</label>
                    <textarea className="form-control" rows={5} placeholder="How can we help you?"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-full flex-center gap-sm">
                    <Send size={18} /> {t('btn_send')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-card reveal overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.3323456789!2d31.23456789!3d30.0456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzQ0LjQiTiAzMcKwMTQnMDQuNCJF!5e0!3m2!1sen!2seg!4v1234567890123" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;
