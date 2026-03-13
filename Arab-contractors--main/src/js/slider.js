/**
 * Hero Slider / Carousel
 */

export function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  let currentSlide = 0;
  const interval = 6000;

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide].classList.add('active');
    
    // Re-trigger animations
    const content = slides[currentSlide].querySelector('.hero-content');
    if (content) {
      content.style.animation = 'none';
      content.offsetHeight; /* trigger reflow */
      content.style.animation = null; 
    }
  }

  setInterval(nextSlide, interval);
}
