self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("clock-app").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./styles.css",
        "./script.js",
        "./manifest.json",
        "./icon-512.png",
        "./icon-192.png",
        "./cloud-frame.png",
        "./clock-bg.png",
        "./icon-helper.png",
        "./icon-unicorn.png",
        "./icon-clock.png",
        "./Font/BKOODB.woff2"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
