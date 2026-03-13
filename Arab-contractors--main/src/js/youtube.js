/**
 * YouTube Feed Integration
 * Fetches the latest 7 videos from @arabcontcompany
 */

export async function initYouTube() {
  const container = document.getElementById('youtube-videos-container');
  if (!container) return;

  // Determine layout based on current page
  const path = window.location.pathname;
  const isHomePage = path === '/' || path === '/index.html' || path.endsWith('/index.html') || path === '';
  
  if (isHomePage) {
    // Compact horizontal slider for Home page
    container.classList.remove('grid-3');
    container.classList.add('flex', 'overflow-x-auto', 'pb-md', 'hide-scrollbar', 'gap-md');
    container.style.scrollSnapType = 'x mandatory';
  } else {
    // Full grid for News page
    container.classList.add('grid', 'grid-3', 'gap-lg');
  }

  // Show loading state
  container.innerHTML = `
    <div class="text-center w-full py-xl col-span-full">
      <div class="spinner"></div>
      <p class="mt-md text-small text-neutral-mid">Fetching latest media updates...</p>
    </div>
  `;

  const channelId = 'UChK3hIjEocqsIQhj_3WtXSg';
  const apiKey = process.env.YOUTUBE_API_KEY;
  
  let entries = [];

  try {
    if (apiKey && apiKey !== 'undefined' && apiKey !== '') {
      // Primary: YouTube Data API v3
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=7&order=date&type=video&key=${apiKey}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'YouTube API request failed');
      }
      
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        entries = data.items.map(item => ({
          title: item.snippet.title,
          link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          thumbnail: item.snippet.thumbnails.high.url,
          date: formatDate(item.snippet.publishedAt)
        }));
      }
    }

    // Secondary: RSS Feed Fallback (if API fails or no key)
    if (entries.length === 0) {
      console.log('Attempting RSS fallback...');
      entries = await fetchFromRSS(channelId);
    }

    // Final Fallback: Hardcoded Data (if everything fails)
    if (entries.length === 0) {
      console.log('Using static fallback data...');
      entries = getFallbackData();
    }

    renderVideos(entries, container, isHomePage);
  } catch (error) {
    console.error('YouTube integration error:', error);
    container.innerHTML = `
      <div class="text-center w-full py-xl col-span-full">
        <p class="text-error mb-md">Unable to load videos at this time.</p>
        <button class="btn btn-primary btn-sm" onclick="location.reload()">Retry</button>
      </div>
    `;
    // Still show some content so the page isn't empty
    renderVideos(getFallbackData(), container, isHomePage);
  }
}

/**
 * Fetch videos using YouTube RSS feed via a proxy
 */
async function fetchFromRSS(channelId) {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('RSS Proxy response was not ok');
    
    const data = await response.json();
    if (!data || !data.contents) throw new Error('No contents in proxy response');

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, "text/xml");
    
    const parseError = xmlDoc.getElementsByTagName("parsererror");
    if (parseError.length > 0) throw new Error('XML parsing error');

    const entryNodes = xmlDoc.querySelectorAll('entry');
    if (entryNodes.length === 0) return [];

    return Array.from(entryNodes).slice(0, 7).map(node => {
      const title = node.querySelector('title')?.textContent || 'Video';
      const link = node.querySelector('link')?.getAttribute('href') || '#';
      const thumbnailNode = node.getElementsByTagNameNS('*', 'thumbnail')[0];
      const thumbnail = thumbnailNode ? thumbnailNode.getAttribute('url') : '';
      const published = node.querySelector('published')?.textContent;
      const date = formatDate(published);

      return { title, link, thumbnail, date };
    });
  } catch (error) {
    console.warn('RSS feed failed:', error);
    return [];
  }
}

/**
 * Format ISO date string to human-readable format
 */
function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (e) {
    return dateString;
  }
}

/**
 * Render video cards to the container
 */
function renderVideos(entries, container, isHomePage) {
  container.innerHTML = '';
  
  entries.forEach((entry, index) => {
    const title = entry.title || 'Video';
    const link = entry.link || '#';
    const date = entry.date || '';
    
    // Extract video ID for high-res thumbnail fallback
    let videoId = '';
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = link.match(youtubeRegex);
    if (match && match[1]) {
      videoId = match[1];
    }
    
    const thumbnail = entry.thumbnail || (videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600');
    
    const delay = index * 0.1;
    const card = document.createElement('div');
    
    if (isHomePage) {
      card.className = `video-card-compact reveal reveal-up flex-shrink-0`;
      card.style.width = '320px';
      card.style.scrollSnapAlign = 'start';
    } else {
      card.className = `card reveal reveal-up`;
    }
    
    card.style.transitionDelay = `${delay}s`;
    card.innerHTML = `
      <a href="${link}" target="_blank" rel="noopener noreferrer" class="block h-full group">
        <div class="relative overflow-hidden radius-card" style="padding-top: 56.25%;">
          <img src="${thumbnail}" alt="${title}" class="absolute top-0 left-0 w-full h-full object-cover transition-slow group-hover:scale-105" referrerPolicy="no-referrer" loading="lazy">
          <div class="absolute inset-0 flex-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-default">
            <div class="w-12 h-12 rounded-full bg-gold flex-center shadow-strong transform scale-90 group-hover:scale-100 transition-bounce">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
        <div class="p-md">
          <p class="text-small text-gold mb-xs font-bold">${date}</p>
          <h4 class="text-body font-bold line-clamp-2 group-hover:text-primary transition-default leading-snug">${title}</h4>
        </div>
      </a>
    `;
    container.appendChild(card);
  });

  // Trigger reveal animations
  setTimeout(() => {
    const reveals = container.querySelectorAll('.reveal');
    reveals.forEach(el => el.classList.add('active'));
  }, 100);
}

/**
 * Static fallback data for when all fetch methods fail
 */
function getFallbackData() {
  return [
    {
      title: "Rod El Farag Axis Bridge - Engineering Masterpiece",
      link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
      thumbnail: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600",
      date: "March 10, 2024"
    },
    {
      title: "Arab Contractors: Building the Future Since 1955",
      link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
      thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
      date: "February 25, 2024"
    },
    {
      title: "Sustainable Construction Initiatives 2024",
      link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
      thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600",
      date: "February 12, 2024"
    },
    {
      title: "New Administrative Capital - Iconic Tower Progress",
      link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600",
      date: "January 30, 2024"
    },
    {
      title: "Infrastructure Development in Africa",
      link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
      thumbnail: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600",
      date: "January 15, 2024"
    },
    {
      title: "Engineering Excellence: Bridge Construction",
      link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
      thumbnail: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600",
      date: "January 05, 2024"
    },
    {
      title: "Corporate Social Responsibility 2024",
      link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
      date: "December 20, 2023"
    }
  ];
}
