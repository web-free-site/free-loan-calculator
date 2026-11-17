/* SPDX-License-Identifier: Apache-2.0 — derived from TekiDeki/Loan-Calculator, scoped for Free Loan Calculator */
'use strict';
const PREFIX = 'free-loan-calc-';
const CACHE = PREFIX + 'v1';
const AD_HOSTS = ['bauval.org', 'abscloud.org', 'araplhn.org'];
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './ads.json',
  './js/ads.js',
];

function isAdUrl(url) {
  try {
    const host = new URL(url).hostname;
    return AD_HOSTS.some((h) => host === h || host.endsWith('.' + h));
  } catch {
    return false;
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key.startsWith(PREFIX) && key !== CACHE).map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = request.url;
  if (isAdUrl(url)) return;
  let origin;
  try {
    origin = new URL(url).origin;
  } catch {
    return;
  }
  if (origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(request, { ignoreSearch: true }).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            if (response && response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => cached);
        return cached || network;
      }),
    ),
  );
});