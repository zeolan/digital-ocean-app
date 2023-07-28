// Establish a cache name
const CACHE_VERSION = 1;
const CURRENT_CACHE = `main-${CACHE_VERSION}`;

const cacheFiles = [
  "/",
  //"/static",
  //"/static/*",
  //"/static/js/*",
  //"/static/css/*",
];

self.addEventListener("install", (evt) => {
  console.log("=== install event");
  return evt.waitUntil(
    caches.open(CURRENT_CACHE).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Check if this is a navigation request
  console.log("=== fetch event");
  if (event.request.mode === "navigate") {
    // Open the cache
    console.log("=== fetch event -> mode === navigate");
    event.respondWith(
      caches.open(CURRENT_CACHE).then((cache) => {
        // Go to the network first
        return fetch(event.request.url)
          .then((fetchedResponse) => {
            cache.put(event.request, fetchedResponse.clone());

            return fetchedResponse;
          })
          .catch(() => {
            // If the network is unavailable, get
            return cache.match(event.request.url);
          });
      })
    );
  } else {
    console.log("=== fetch event -> else");
    return;
  }
});
