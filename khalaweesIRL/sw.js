const CACHE_VERSION = "khirl-pwa-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./firebase.js",
  "./firebase-config.js",
  "./manifest.json",
  "./icon.png",
  "./icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await cache.addAll(CORE_ASSETS);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      const cached = await cache.match(req, { ignoreSearch: true });
      if (cached) return cached;

      try {
        const res = await fetch(req);
        if (res && res.ok) {
          const copy = res.clone();
          cache.put(req, copy);
        }
        return res;
      } catch {
        return cached || Response.error();
      }
    })()
  );
});
