/**
 * Project Detail Dynamic Loading
 */

const projectsData = {
  'rod-el-farag': {
    title: 'Rod El Farag Axis Bridge',
    subtitle: "The World's Widest Cable-Stayed Bridge",
    heroImg: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920',
    overview: "The Rod El Farag Axis Bridge is one of the most significant infrastructure projects in Egypt's modern history. It serves as a vital link connecting East Cairo to West Cairo, significantly reducing travel time and congestion.",
    overview2: "Awarded the Guinness World Record for the widest cable-stayed bridge, it features a width of 67.3 meters and spans the Nile River with breathtaking engineering precision.",
    features: [
      'Width: 67.3 meters (World Record)',
      'Length: 540 meters (cable-stayed portion)',
      '6 lanes in each direction',
      'Pedestrian glass walkways on both sides'
    ],
    details: {
      client: 'Ministry of Defense',
      location: 'Cairo, Egypt',
      sector: 'Infrastructure',
      status: 'Completed',
      year: '2019'
    },
    sideImg: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=600',
      'https://images.unsplash.com/photo-1503387762-592dee582a7b?w=600',
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600',
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600'
    ]
  },
  'aswan-dam': {
    title: 'Aswan High Dam',
    subtitle: 'Iconic Hydro-electric Power Plant',
    heroImg: 'https://images.unsplash.com/photo-1584464431734-7c7036618e7e?w=1920',
    overview: "The Aswan High Dam is an embankment dam built across the Nile in Aswan, Egypt, between 1960 and 1970. Its significance in the history of modern Egypt is immense, providing flood control, irrigation water, and hydroelectric power.",
    overview2: "The dam has had a significant effect on the economy and culture of Egypt. Before the dam was built, the Nile flooded every year during late summer, which provided natural fertilization and water for agriculture but was unpredictable.",
    features: [
      'Height: 111 meters',
      'Length: 3,830 meters',
      'Reservoir capacity: 132 cubic kilometers',
      'Hydroelectric power: 2,100 megawatts'
    ],
    details: {
      client: 'Government of Egypt',
      location: 'Aswan, Egypt',
      sector: 'Energy',
      status: 'Completed',
      year: '1970'
    },
    sideImg: 'https://images.unsplash.com/photo-1584464431734-7c7036618e7e?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600',
      'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=600',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600'
    ]
  },
  'cairo-metro': {
    title: 'Cairo Metro Line 3',
    subtitle: 'Modern Urban Transit System',
    heroImg: 'https://images.unsplash.com/photo-1519011985187-444d62641929?w=1920',
    overview: "Cairo Metro Line 3 is a main line of the Cairo Metro network. It currently connects Attaba in central Cairo with Abbasia and Heliopolis to the northeast. The line will eventually extend from the northwest of Greater Cairo at Imbaba to the northeast at Cairo International Airport.",
    overview2: "The project uses state-of-the-art tunneling technology and station design to provide a safe, efficient, and comfortable transport solution for millions of Cairenes.",
    features: [
      'Total length: 40.6 km (when completed)',
      'Number of stations: 34 (when completed)',
      'Advanced signaling systems',
      'Air-conditioned rolling stock'
    ],
    details: {
      client: 'National Authority for Tunnels',
      location: 'Cairo, Egypt',
      sector: 'Transport',
      status: 'Ongoing',
      year: 'Ongoing'
    },
    sideImg: 'https://images.unsplash.com/photo-1519011985187-444d62641929?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1519011985187-444d62641929?w=600',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600',
      'https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=600',
      'https://images.unsplash.com/photo-1503387762-592dee582a7b?w=600'
    ]
  },
  'new-capital': {
    title: 'New Administrative Capital',
    subtitle: "Developing the Future of Egypt's Governance",
    heroImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920',
    overview: "The New Administrative Capital is a large-scale project in Egypt that has been under construction since 2015. It was announced by then-Egyptian housing minister Mostafa Madbouly at the Egypt Economic Development Conference on 13 March 2015.",
    overview2: "The city is located 45 kilometers east of Cairo and just outside the Second Greater Cairo Ring Road, in a currently largely undeveloped area halfway to the seaport city of Suez.",
    features: [
      'Smart city infrastructure',
      'Governmental district',
      'Business and financial center',
      'Green river park system'
    ],
    details: {
      client: 'Administrative Capital for Urban Development',
      location: 'New Capital, Egypt',
      sector: 'Buildings',
      status: 'Ongoing',
      year: 'Ongoing'
    },
    sideImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
      'https://images.unsplash.com/photo-1503387762-592dee58c162?w=600',
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600',
      'https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=600'
    ]
  },
  'grand-museum': {
    title: 'Grand Egyptian Museum',
    subtitle: 'The Largest Archaeological Museum in the World',
    heroImg: 'https://images.unsplash.com/photo-1503387762-592dee58c162?w=1920',
    overview: "The Grand Egyptian Museum (GEM), also known as the Giza Museum, is a planned museum of artifacts of ancient Egypt. Described as the largest archaeological museum in the world, it is under construction and is scheduled to be partially open in 2024.",
    overview2: "The museum is sited on 50 hectares of land approximately two kilometers from the Giza pyramid complex and is part of a new master plan for the plateau.",
    features: [
      'Total floor area: 81,000 square meters',
      'Over 100,000 artifacts',
      'Full Tutankhamun collection',
      'State-of-the-art conservation labs'
    ],
    details: {
      client: 'Ministry of Tourism and Antiquities',
      location: 'Giza, Egypt',
      sector: 'Cultural',
      status: 'Ongoing',
      year: 'Ongoing'
    },
    sideImg: 'https://images.unsplash.com/photo-1503387762-592dee58c162?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1503387762-592dee58c162?w=600',
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600',
      'https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=600',
      'https://images.unsplash.com/photo-1503387762-592dee58c162?w=600'
    ]
  },
  'bahr-baqar': {
    title: 'Bahr El Baqar Plant',
    subtitle: "World's Largest Water Treatment Plant",
    heroImg: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920',
    overview: "The Bahr El Baqar water treatment plant is the largest of its kind in the world. It is designed to treat agricultural drainage water to be reused for irrigation, contributing to the reclamation of hundreds of thousands of acres in Sinai.",
    overview2: "This project is a cornerstone of Egypt's strategy for water security and sustainable agricultural development.",
    features: [
      'Capacity: 5.6 million cubic meters per day',
      'Reclaims 400,000 acres of land',
      'Advanced triple treatment technology',
      'Guinness World Record holder'
    ],
    details: {
      client: 'Ministry of Water Resources and Irrigation',
      location: 'Sinai, Egypt',
      sector: 'Water',
      status: 'Completed',
      year: '2021'
    },
    sideImg: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600',
      'https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=600',
      'https://images.unsplash.com/photo-1503387762-592dee58c162?w=600',
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600'
    ]
  },
  'fattah-mosque': {
    title: 'Al-Fattah Al-Aleem Mosque',
    subtitle: 'One of the Largest Mosques in the Region',
    heroImg: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920',
    overview: "Al-Fattah Al-Aleem Mosque is a mosque in the New Administrative Capital of Egypt. It was inaugurated by Abdel Fattah el-Sisi, the President of Egypt, on 6 January 2019.",
    overview2: "The mosque is considered one of the largest in the world and serves as a major landmark in the new capital, reflecting Islamic architectural heritage with a modern touch.",
    features: [
      'Capacity: Over 17,000 worshippers',
      '4 Minarets (95m height)',
      'Large central dome',
      'Extensive marble and wood work'
    ],
    details: {
      client: 'Administrative Capital for Urban Development',
      location: 'New Capital, Egypt',
      sector: 'Buildings',
      status: 'Completed',
      year: '2019'
    },
    sideImg: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600',
      'https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=600',
      'https://images.unsplash.com/photo-1503387762-592dee58c162?w=600'
    ]
  },
  'borg-stadium': {
    title: 'Borg El Arab Stadium',
    subtitle: 'A World-Class Multi-Purpose Stadium',
    heroImg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920',
    overview: "Borg El Arab Stadium is a stadium commissioned in 2005 in the Mediterranean Sea resort of Borg El Arab; 25 km west of Alexandria, Egypt. It is the largest stadium in Egypt and the second largest in Africa.",
    overview2: "The stadium was built by the Egyptian Armed Forces Corps of Engineers and Arab Contractors. It is a multi-purpose stadium used primarily for football matches.",
    features: [
      'Capacity: 86,000 spectators',
      'Olympic track',
      'Modern locker rooms and media centers',
      'Extensive parking and facilities'
    ],
    details: {
      client: 'Egyptian Armed Forces',
      location: 'Alexandria, Egypt',
      sector: 'Infrastructure',
      status: 'Completed',
      year: '2007'
    },
    sideImg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600',
      'https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=600',
      'https://images.unsplash.com/photo-1503387762-592dee58c162?w=600'
    ]
  },
  'suez-tunnels': {
    title: 'Suez Canal Tunnels',
    subtitle: 'Strategic Tunnels Connecting Sinai to the Mainland',
    heroImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920',
    overview: "The Suez Canal Tunnels are a series of tunnels constructed under the Suez Canal to facilitate the movement of people and goods between the Sinai Peninsula and the rest of Egypt.",
    overview2: "These tunnels are vital for the development of Sinai and represent a major engineering feat, overcoming complex geological challenges under the canal.",
    features: [
      'Multiple tunnel locations (Port Said, Ismailia)',
      'Advanced TBM (Tunnel Boring Machine) technology',
      'Dual-lane traffic in each direction',
      'Enhanced safety and ventilation systems'
    ],
    details: {
      client: 'Engineering Authority of the Armed Forces',
      location: 'Suez Canal, Egypt',
      sector: 'Infrastructure',
      status: 'Completed',
      year: '2019'
    },
    sideImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600',
      'https://images.unsplash.com/photo-1541888086225-f6404f45af53?w=600',
      'https://images.unsplash.com/photo-1503387762-592dee58c162?w=600',
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600'
    ]
  }
};

export function initProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  if (!projectId || !projectsData[projectId]) {
    // Default to Rod El Farag if no ID or invalid ID
    return;
  }

  const data = projectsData[projectId];

  // Update Hero
  const heroSection = document.querySelector('.section-dark');
  if (heroSection) {
    heroSection.style.backgroundImage = `url('${data.heroImg}')`;
  }

  const heroTitle = document.querySelector('.section-dark h1');
  if (heroTitle) {
    heroTitle.textContent = data.title;
    heroTitle.removeAttribute('data-i18n'); // Disable translation for dynamic title
  }

  const heroSubtitle = document.querySelector('.section-dark p');
  if (heroSubtitle) {
    heroSubtitle.textContent = data.subtitle;
    heroSubtitle.removeAttribute('data-i18n');
  }

  // Update Overview
  const overviewTitle = document.querySelector('.reveal-left h2');
  if (overviewTitle) overviewTitle.textContent = 'Project Overview';

  const overviewParagraphs = document.querySelectorAll('.reveal-left p.text-body');
  if (overviewParagraphs[0]) overviewParagraphs[0].textContent = data.overview;
  if (overviewParagraphs[1]) overviewParagraphs[1].textContent = data.overview2;

  // Update Features
  const featuresList = document.querySelector('.reveal-left ul');
  if (featuresList) {
    featuresList.innerHTML = data.features.map(f => `<li>• ${f}</li>`).join('');
  }

  // Update Details Card
  const detailsList = document.querySelector('.card ul');
  if (detailsList) {
    detailsList.innerHTML = `
      <li class="flex-between"><strong>Client:</strong> <span>${data.details.client}</span></li>
      <li class="flex-between"><strong>Location:</strong> <span>${data.details.location}</span></li>
      <li class="flex-between"><strong>Sector:</strong> <span>${data.details.sector}</span></li>
      <li class="flex-between"><strong>Status:</strong> <span>${data.details.status}</span></li>
      <li class="flex-between"><strong>Year:</strong> <span>${data.details.year}</span></li>
    `;
  }

  // Update Side Image
  const sideImg = document.querySelector('.reveal-right img');
  if (sideImg) {
    sideImg.src = data.sideImg;
    sideImg.alt = data.title;
  }

  // Update Gallery
  const galleryContainer = document.querySelector('.grid.grid-3.gap-md');
  if (galleryContainer) {
    galleryContainer.innerHTML = data.gallery.map((img, index) => `
      <div class="reveal reveal-up overflow-hidden radius-card group cursor-pointer" style="transition-delay: ${index * 0.1}s;">
        <img src="${img}" alt="Gallery ${index + 1}" class="w-full h-full object-cover transition-slow group-hover:scale-110" referrerPolicy="no-referrer">
      </div>
    `).join('');

    // Setup Lightbox
    setupLightbox(data.gallery);
  }
}

function setupLightbox(images) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  if (!lightbox || !lightboxImg) return;

  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showNext = (e) => {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  };

  // Attach to gallery items
  const galleryItems = document.querySelectorAll('.grid.grid-3.gap-md .group');
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}
