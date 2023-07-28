// Establish a cache name
const CACHE_VERSION = 4;
const CURRENT_CACHE = `main-${CACHE_VERSION}`;

const cacheFiles = [
  "./index.html",
  "./manifest.json",
  "./static/js/",
  /*"/static",
  "/static/*",
  "./static/js/*",
  "./static/css/*",*/
];

self.addEventListener("install", (evt) => {
  console.log("=== install event");
  return evt.waitUntil(
    caches.open(CURRENT_CACHE).then((cache) => {
      //return cache.addAll(cacheFiles);
    })
  );
});

// on activation we clean up the previously registered service workers and clear cache
self.addEventListener("activate", (evt) =>
  evt.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CURRENT_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  )
);

self.addEventListener("fetch", (event) => {
  // Check if this is a navigation request
  console.log("=== fetch event");
  //if (event.request.mode === "navigate") {
  // Open the cache
  console.log("=== fetch event -> mode === navigate");
  event.respondWith(
    caches.open(CURRENT_CACHE).then((cache) => {
      // Go to the network first
      return fetch(event.request.url)
        .then((fetchedResponse) => {
          cache.match(event.request.url).then((response) => {
            if (response === undefined) {
              console.log("=== not match");
              cache.put(event.request, fetchedResponse.clone());
              //return response;
            } else {
              console.log("=== match");
            }
          });
          //cache.put(event.request, fetchedResponse.clone());

          return fetchedResponse.clone();
        })
        .catch(() => {
          // If the network is unavailable, get
          return cache.match(event.request.url);
        });
    })
  );
  //} else {
  //  console.log("=== fetch event -> else");
  //  return;
  //}
});
