const CACHE_NAME = 'digital-store-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/main.tsx',
  '/logo.png',
  '/logo.svg',
  '/logo2.svg',
  '/offline.html'
];

// Instalar o Service Worker e cachear arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('Erro ao cachear arquivos:', error);
      })
  );
  self.skipWaiting();
});

// Ativar o Service Worker e limpar caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar requisições e servir do cache
self.addEventListener('fetch', event => {
  // Ignorar requisições que não são GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Estratégia: Cache first, network fallback
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retornar do cache se disponível
        if (response) {
          return response;
        }

        // Caso contrário, fazer requisição de rede
        return fetch(event.request)
          .then(response => {
            // Não cachear respostas inválidas
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clonar a resposta
            const responseToCache = response.clone();

            // Cachear a nova resposta
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Se a rede falhar, tentar servir uma página offline
            return caches.match('/offline.html')
              .then(response => response || new Response('Você está offline', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'text/plain'
                })
              }));
          });
      })
  );
});

// Receber mensagens do cliente
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
