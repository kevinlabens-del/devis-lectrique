const CACHE='devis-electrique-v13-catalogue';
const ASSETS=['./','./index.html','./styles.css','./app.js','./catalog-v13.js','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)))});
self.addEventListener('activate',event=>{event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]))});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const req=event.request,url=new URL(req.url);
 if(req.mode==='navigate'){
  event.respondWith(fetch(req,{cache:'no-store'}).then(async res=>{let html=await res.text();if(!html.includes('catalog-v13.js'))html=html.replace('</body>','<script src="./catalog-v13.js"></script></body>');return new Response(html,{status:res.status,statusText:res.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})}).catch(async()=>{const cached=await caches.match('./index.html');if(!cached)return new Response('Application hors ligne',{status:503});let html=await cached.text();if(!html.includes('catalog-v13.js'))html=html.replace('</body>','<script src="./catalog-v13.js"></script></body>');return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8'}})}));return;
 }
 if(/\/(index\.html|app\.js|catalog-v13\.js|styles\.css|manifest\.webmanifest|sw\.js)$/.test(url.pathname)){
  event.respondWith(fetch(req,{cache:'no-store'}).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));return res}).catch(()=>caches.match(req)));return;
 }
 event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));return res})));
});