const CACHE ='JS_Class'
const FILES = ['/JS/CW1/CW1.png', '/JS/cmToInch.html', '/JS/mustafa_ayaz_corr.html',
 '/JS/ClassWork4.html', '/JS/FtoC&reverse.html','/JS/CW6','/JS/Database/CW7.html','/JS/CW8/CW8.html',
 '/JS/CW9_CountingJS.html', '/JS/CW10.html','/JS/CW11','/JS/CW12.html','/JS/PoissonTable.html','/JS/HW2/HW2-StudentDatabase.html'
]

function installCB(e) {
  e.waitUntil(
    caches.open(CACHE)
    .then(cache => cache.addAll(FILES))
    .catch(console.log)
  )
}
self.addEventListener('install', installCB)

function save(req, resp) {
  return caches.open(CACHE)
  .then(cache => {
    cache.put(req, resp.clone());
    return resp;
  })
  .catch(console.log)
}
function fetchCB(e) { //fetch first
  let req = e.request
  console.log('JS_Class', req.url);
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => { return caches.match(req).then(r1 => r1) })
  )
}
self.addEventListener('fetch', fetchCB)