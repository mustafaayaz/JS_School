const CACHE ='JS_Class'
const FILES = ['/JS_School/CW1/CW1.png', '/JS_School/cmToInch.html', '/JS_School/mustafa_ayaz_corr.html',
 '/JS_School/ClassWork4.html', '/JS_School/FtoC&reverse.html','/JS_School/CW6','/JS_School/Database/CW7.html','/JS_School/CW8/CW8.html',
 '/JS_School/CW9_CountingJS.html', '/JS_School/CW10.html','/JS_School/CW11','/JS_School/CW12.html','/JS_School/PoissonTable.html','/JS_School/HW2/HW2-StudentDatabase.html'
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