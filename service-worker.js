self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("clock-cache").then((cache) =>
      cache.addAll([
        "index.html",
        "style.css",
        "script.js",
        "manifest.json",
        "assets/images/clock-face.png",
        "assets/sounds/correct.mp3",
        "assets/sounds/wrong.mp3",
        "assets/sounds/bg-music.mp3"
      ])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
