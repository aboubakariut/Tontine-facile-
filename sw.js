// sw.js - Service Worker simple pour PWA (cache basique + offline)
const CACHE_NAME = 'tontine-facile-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/login.html',
    '/dashboard.html',
    '/css/style.css',
    '/js/main.js',
    // Ajoute ici tes autres fichiers JS/CSS importants
    // (pas besoin de tout lister au début, le SW va apprendre)
];
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Cache ouvert');
            return cache.addAll(urlsToCache);
        })
    );
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Cache hit → retourne la version en cache
            if (response) {
                return response;
            }
            // Sinon on fetch depuis le réseau
            return fetch(event.request).then(
                networkResponse => {
                    // Vérifie si la réponse est valide
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }
                    // Clone la réponse pour la mettre en cache
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    return networkResponse;
                }
            );
        })
    );
});
// Mise à jour du SW quand nouvelle version
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});