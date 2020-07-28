// Import Workbox
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);
if (workbox) console.log("Workbox berhasil dimuat");
else console.log("Workbox gagal dimuat");

workbox.precaching.precacheAndRoute(
  [
    // html
    { url: "/", revision: "1" },
    { url: "/index.html", revision: "3" },
    { url: "/team.html", revision: "3" },
    { url: "/match.html", revision: "3" },
    { url: "/schedule.html", revision: "3" },
    { url: "/mainav.html", revision: "3" },
    { url: "/sidenav.html", revision: "3" },
    // css
    { url: "/css/materialize.min.css", revision: "3" },
    { url: "/css/custom.css", revision: "3" },
    // javascript
    { url: "/js/activateSw.js", revision: "3" },
    { url: "/js/materialize.min.js", revision: "3" },
    { url: "/js/navbar.js", revision: "3" },
    { url: "/js/mainApi.js", revision: "3" },
    { url: "/js/savedApi.js", revision: "3" },
    { url: "/js/teamApi.js", revision: "3" },
    { url: "/js/scheduleApi.js", revision: "3" },
    { url: "/js/db.js", revision: "3" },
    { url: "/js/idb.js", revision: "1" },
    // icons
    { url: "/icons/home-white-24dp.svg", revision: "3" },
    { url: "/icons/info-white-24dp.svg", revision: "3" },
    { url: "/icons/list-white-36dp.svg", revision: "3" },
    { url: "/icons/keyboard_backspace-white-24dp.svg", revision: "3" },
    { url: "/icons/bookmark-white-24dp.svg", revision: "3" },
    { url: "/icons/delete-white-24dp.svg", revision: "3" },
    // assets
    { url: "/assets/code.jpg", revision: "3" },
    { url: "/assets/banner.jpg", revision: "3" },
    { url: "/assets/int-1.png", revision: "3" },
    { url: "/assets/int-2.png", revision: "3" },
    { url: "/assets/int-3.png", revision: "3" },
    { url: "/assets/profile.png", revision: "3" },
    { url: "/assets/sidenav-bg.jpg", revision: "3" },
    { url: "/manifest.json", revision: "3" },

    // App icon
    { url: "/icon-192x192.png", revision: "3" },
    { url: "/icon-512x512.png", revision: "3" },
    { url: "/badge.png", revision: "3" }
  ],
  {
    ignoreURLParametersMatching: [/.*/]
  }
);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "footballers-page"
  })
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "footballers-api"
  })
);

workbox.routing.registerRoute(
  new RegExp("team.html"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "team-data"
  })
);
workbox.routing.registerRoute(
  new RegExp("schedule.html"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "schedule-data"
  })
);
workbox.routing.registerRoute(
  new RegExp("match.html"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "match-data"
  })
);

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

// SERVICE WORKER CODE
// const cache_name = "footballers-v5";
// const urlsToCache = [
//   // html pages
//   "/",
//   "/index.html",
//   "/team.html",
//   "/match.html",
//   "/schedule.html",
//   "/mainav.html",
//   "/sidenav.html",
//   "/pages/about.html",
//   "/pages/home.html",
//   "/pages/saved.html",
//   //css
//   "/css/materialize.min.css",
//   "/css/custom.css",
//   //javascript
//   "/js/materialize.min.js",
//   "/js/navbar.js",
//   "/js/mainApi.js",
//   "/js/savedApi.js",
//   "/js/teamApi.js",
//   "/js/scheduleApi.js",
//   "/js/idb.js",
//   "/js/db.js",
//   "/js/activateSw.js",
//   // icons
//   "/icons/home-white-24dp.svg",
//   "/icons/info-white-24dp.svg",
//   "/icons/list-white-36dp.svg",
//   "/icons/keyboard_backspace-white-24dp.svg",
//   "/icons/bookmark-white-24dp.svg",
//   "/icons/delete-white-24dp.svg",

//   // assets
//   "/assets/code.jpg",
//   "/assets/banner.jpg",
//   "/assets/int-1.png",
//   "/assets/int-2.png",
//   "/assets/int-3.png",
//   "/assets/profile.png",
//   "/assets/sidenav-bg.jpg",
//   "/manifest.json",
//   //App icon
//   "/icon-192x192.png",
//   "/icon-512x512.png"
// ];

// // Registering service worker to browser
// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open(cache_name).then(function (cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // use assets from cache or from server
// self.addEventListener("fetch", function (event) {
//   const base_url = "https://api.football-data.org/";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(cache_name).then(function (cache) {
//         return fetch(event.request).then(function (response) {
//           console.log("Response :" + response);
//           cache.put(event.request.url, response.clone());
//           return response;
//         });
//       })
//     );
//   } else {
//     event.respondWith(
//       caches
//         .match(event.request, { ignoreSearch: true })
//         .then(function (response) {
//           return response || fetch(event.request);
//         })
//     );
//   }
// });

// // delete old cache
// self.addEventListener("activate", function (event) {
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheName != cache_name) {
//             console.log(`Service Worker: cache ${cacheName} dihapus`);
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
