/* Solar Layunta — Service Worker
   Estrategia:
   - Precache del shell de la aplicación en la instalación.
   - Network-first para navegación (para recibir actualizaciones).
   - Cache-first para recursos estáticos y CDN.
   - Limpieza automática de cachés antiguas.
*/

const VERSION = "v3.1.0";
const SHELL_CACHE = `solar-layunta-shell-${VERSION}`;
const RUNTIME_CACHE = `solar-layunta-runtime-${VERSION}`;

const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon.svg"
];

const CDN_ASSETS = [
  "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    // Uno a uno: si un recurso falla, los demás sí se cachean.
    await Promise.all(SHELL_ASSETS.map(url => cache.add(url).catch(() => {})));

    // Los CDN se cachean de forma tolerante a fallos (sin red, la app sigue funcionando).
    const runtime = await caches.open(RUNTIME_CACHE);
    await Promise.all(CDN_ASSETS.map(url =>
      runtime.add(new Request(url, { mode: "cors" })).catch(() => {})
    ));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(k => k !== SHELL_CACHE && k !== RUNTIME_CACHE)
      .map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Navegación: red primero, caché como respaldo.
  if (request.mode === "navigate"){
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        // Solo se guarda si la respuesta es correcta: evita cachear un 404.
        if (fresh && fresh.ok){
          const cache = await caches.open(SHELL_CACHE);
          cache.put("./index.html", fresh.clone()).catch(() => {});
        }
        return fresh;
      } catch {
        const cache = await caches.open(SHELL_CACHE);
        return (await cache.match("./index.html")) || (await cache.match("./")) ||
               new Response("Sin conexión", { status: 503, headers: { "Content-Type": "text/plain" } });
      }
    })());
    return;
  }

  // Recursos propios y CDN: caché primero.
  const sameOrigin = url.origin === self.location.origin;
  const isCdn = CDN_ASSETS.some(u => request.url.startsWith(u.split("?")[0]));
  if (sameOrigin || isCdn){
    event.respondWith((async () => {
      const cache = await caches.open(isCdn ? RUNTIME_CACHE : SHELL_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const fresh = await fetch(request);
        if (fresh && fresh.status === 200) cache.put(request, fresh.clone());
        return fresh;
      } catch {
        return cached || new Response("", { status: 504 });
      }
    })());
  }
});
