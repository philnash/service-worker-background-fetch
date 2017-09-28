self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('files').then(function(cache) {
      return cache.add('/');
    })
  );
});

self.addEventListener('backgroundfetched', function(event) {
  event.waitUntil(
    caches.open('downloads').then(function(cache) {
      event.updateUI('Large file downloaded');
      registration.showNotification('File downloaded!', {
        data: {
          url: event.fetches[0].request.url
        }
      });

      const promises = event.fetches.map(({ request, response }) => {
        if (response && response.ok) {
          return cache.put(request, response.clone());
        }
      });

      return Promise.all(promises);
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = new URL(event.notification.data.url);
  clients.openWindow(url.origin);
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.match(/images/)) {
    event.respondWith(
      caches.open('downloads').then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request);
        });
      })
    );
  } else {
    event.respondWith(caches.match(event.request));
  }
});
