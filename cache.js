const CACHE ='JS_Class'
const FILES = ['/CW1/CW1.png', '/cmToInch.html', '/mustafa_ayaz_corr.html',
 '/ClassWork4.html', '/FtoC&reverse.html','/CW6','/Database/CW7.html','/CW8/CW8.html',
 '/CW9_CountingJS.html', '/CW10.html','/CW11','/CW12.html','/PoissonTable.html','/HW2/HW2-StudentDatabase.html'
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