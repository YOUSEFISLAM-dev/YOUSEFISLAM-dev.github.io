/**
 * Navigation Logic
 * Handles sticky header, mobile menu, and mega menu
 */

export function initNavigation() {
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-mobile-toggle');
  const navDrawer = document.querySelector('.nav-drawer');
  const navClose = document.querySelector('.nav-close');
  const body = document.body;

  // Mobile Menu Toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navDrawer.classList.add('active');
      body.style.overflow = 'hidden';
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navDrawer.classList.remove('active');
      body.style.overflow = '';
    });
  }

  // Scroll Header Shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('shadow-medium');
      header.classList.remove('shadow-subtle');
    } else {
      header.classList.remove('shadow-medium');
      header.classList.add('shadow-subtle');
    }
  });

  // Close drawer on link click
  const drawerLinks = document.querySelectorAll('.nav-drawer a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      navDrawer.classList.remove('active');
      body.style.overflow = '';
    });
  });

  // Mega Menu Hover Logic (Desktop)
  const megaMenuTriggers = document.querySelectorAll('.has-mega-menu');
  megaMenuTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1024) {
        const menu = trigger.querySelector('.mega-menu');
        if (menu) menu.classList.add('active');
      }
    });
    trigger.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 1024) {
        const menu = trigger.querySelector('.mega-menu');
        if (menu) menu.classList.remove('active');
      }
    });
  });
}
