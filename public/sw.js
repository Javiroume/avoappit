const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

function limpiarCache ( cacheName, numeroItems ) {

    caches.open( cacheName )
            .then( cache => {

                cache.keys()
                        .then ( keys => {

                            if ( keys.length > numeroItems ){
                                cache.delete ( keys[0] )
                                        .then ( limpiarCache(cacheName, numeroItems) )
                            }

                        });

            });

}


self.addEventListener('install', event => {

    const CacheProm = caches.open(CACHE_STATIC_NAME)
            .then( cache => {

                return cache.addAll([

                    
                    '/index.html',
                    

                ]);

            });

    

    const CacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
            .then( cache => cache.add('https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'));

            

    event.waitUntil(Promise.all([CacheProm, CacheInmutable]));

});

self.addEventListener('fetch', event => {

    // 2- Cache with Network Fallback

    const Respuesta = caches.match( event.request )
            .then (res => {

                if (res) return res;

                return fetch (event.request).then(newResp => {

                    caches.open( CACHE_DYNAMIC_NAME )
                            .then ( cache => {

                                cache.put( event.request, newResp );
                                limpiarCache( CACHE_DYNAMIC_NAME,50 );

                            });

                    return newResp.clone();
                });

            });

    event.respondWith( Respuesta );

    // -----------------------------------------
    // 1- Cache Only

    // 
    


});

self.addEventListener('push', event => {
    
    console.log(event.data.text());
    const data = JSON.parse(event.data.text());

    const title = data.titulo;
    const options = {
       
        body: data.cuerpo,
        icon: 'img/icons/48.png',
        badge: 'img/icons/badge.png',
        image: data.imagen

    };

    event.waitUntil(self.registration.showNotification(title, options));

});


self.addEventListener('sync', event => {
    console.log("sync");
});