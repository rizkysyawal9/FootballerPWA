const cache_name = "footballers-v4";
const urlsToCache = [
  // html pages
  "/",
  "/index.html",
  "/team.html",
  "/match.html",
  "/schedule.html",
  "/mainav.html",
  "/sidenav.html",
  "/pages/about.html",
  "/pages/home.html",
  "/pages/saved.html",
  //css
  "/css/materialize.min.css",
  "/css/custom.css",
  //javascript
  "/js/materialize.min.js",
  "/js/navbar.js",
  "/js/mainApi.js",
  "/js/savedApi.js",
  "/js/teamApi.js",
  "/js/scheduleApi.js",
  "/js/idb.js",
  "/js/db.js",
  // icons
  "/icons/home-white-24dp.svg",
  "/icons/info-white-24dp.svg",
  "/icons/list-white-36dp.svg",
  "/icons/keyboard_backspace-white-24dp.svg",
  "/icons/bookmark-white-24dp.svg",
  "/icons/delete-white-24dp.svg",

  // assets
  "/assets/code.jpg",
  "/assets/banner.jpg",
  "/assets/int-1.png",
  "/assets/int-2.png",
  "/assets/int-3.png",
  "/assets/profile.png",
  "/assets/sidenav-bg.jpg",
  "/manifest.json",
  //App icon
  "/icon-192x192.png",
  "/icon-512x512.png"
];

// Registering service worker to browser
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cache_name).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// use assets from cache or from server
self.addEventListener("fetch", function (event) {
  const base_url = "https://api.football-data.org/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(cache_name).then(function (cache) {
        return fetch(event.request).then(function (response) {
          console.log("Response :" + response);
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function (response) {
          return response || fetch(event.request);
        })
    );
  }
});

// delete old cache
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != cache_name) {
            console.log(`Service Worker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//Push notification
self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "img/notification.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
