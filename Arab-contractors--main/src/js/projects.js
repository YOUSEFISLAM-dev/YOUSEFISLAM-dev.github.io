/**
 * Project Filtering Logic
 */

export function initProjects() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-card-wrapper');
  const searchInput = document.querySelector('#project-search');

  if (!projectItems.length) return;

  function filterProjects() {
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const searchTerm = searchInput?.value.toLowerCase() || '';

    projectItems.forEach(item => {
      const category = item.dataset.category;
      const title = item.querySelector('h3').textContent.toLowerCase();
      
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = title.includes(searchTerm);

      if (matchesFilter && matchesSearch) {
        item.style.display = 'block';
        setTimeout(() => item.style.opacity = '1', 10);
      } else {
        item.style.opacity = '0';
        setTimeout(() => item.style.display = 'none', 300);
      }
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterProjects);
  }
}
