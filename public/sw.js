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
      registration.showNotification('File downloaded!');

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
  clients.openWindow('http://localhost:3000/');
});

self.addEventListener('fetch', function(event) {
  console.log(event);
  if (event.request.url.match(/images/)) {
    console.log('hello');
    event.respondWith(
      caches.open('downloads').then(cache => {
        return cache.match(event.request).then(response => {
          console.log(response);
          console.log(event.request);
          return response || fetch(event.request);
        });
      })
    );
  } else {
    event.respondWith(caches.match(event.request));
  }
});
