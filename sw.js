"use strict";

// Bump the version to invalidate the previous cache on deploy.
const CACHE = "sample-pad-v2";
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// The page itself (navigations): network first, so an online launch always
// gets the latest deployed version; fall back to the cache within 3 s when
// offline or on a bad connection. `cache: "no-cache"` forces a conditional
// request to the server instead of trusting the HTTP cache — without it,
// Safari kept re-storing the stale copy its HTTP cache returned.
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 3000);
  try {
    const res = await fetch(req.url, { cache: "no-cache", signal: ctrl.signal });
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const cached = await cache.match(req, { ignoreSearch: true });
    if (cached) return cached;
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// Other assets (icons, manifest): cache first for speed, refresh in the
// background, also bypassing the HTTP cache.
async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req, { ignoreSearch: true });
  const fresh = fetch(req.url, { cache: "no-cache" })
    .then((res) => {
      if (res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => cached);
  return cached || fresh;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(req.mode === "navigate" ? networkFirst(req) : staleWhileRevalidate(req));
});
