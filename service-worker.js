const CACHE_NAME = 'obscura-cache-v1.1.0'; // Naikkan versi cache
const urlsToCache = [
  '/',
  '/index.html',
  '/main.html',
  '/api.html',
  '/sender.html',
  '/receiver.html',
  '/instructions.html',
  '/manifest.webmanifest', // Tambahkan manifest ke cache
  '/firebase-init.js', // Meskipun kita hapus, biarkan dulu untuk kompatibilitas
  '/icon-192.png',
  '/icon-512.png',
  '/icon-512-maskable.png'
];

// Hapus cache lama saat service worker baru diaktifkan
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Jika ada di cache, kembalikan dari cache. Jika tidak, ambil dari jaringan.
      return response || fetch(event.request);
    })
  );
});
