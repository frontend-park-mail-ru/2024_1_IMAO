const CACHE_NAME = 'aaa';
const CACHE_URLS = ['public/bundle.js', '/'];

// eslint-disable-next-line no-invalid-this
this.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.addAll(CACHE_URLS);
          }),
  );
});

// eslint-disable-next-line no-invalid-this
this.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }

            return fetch(event.request);
          }),
  );
});
