/**
 * Main Entry Point
 */

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initCounters } from './counters.js';
import { initSlider } from './slider.js';
import { initProjects } from './projects.js';
import { initForms } from './forms.js';
import { initYouTube } from './youtube.js';
import { initTranslation } from './translation.js';
import { initProjectDetail } from './project-detail.js';

function initApp() {
  console.log('Arab Contractors Website Initialized');
  
  // Page Transition Entry
  document.body.classList.add('is-ready');
  const main = document.querySelector('main');
  if (main) {
    main.classList.add('animate-fade-in');
  }
  
  initTranslation();
  initNavigation();
  initAnimations();
  initCounters();
  initSlider();
  initProjects();
  initForms();
  initYouTube();
  initProjectDetail();

  // Set current year in footer
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
