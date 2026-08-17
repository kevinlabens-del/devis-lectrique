(async()=>{
  try{
    const response=await fetch('./app-data.b64',{cache:'no-store'});
    if(!response.ok)throw new Error(`Chargement du moteur impossible (${response.status})`);
    const b64=(await response.text()).replace(/\s+/g,'');
    const binary=atob(b64);
    const bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    if(!('DecompressionStream' in window))throw new Error('Ce navigateur ne prend pas en charge le moteur V12. Mets Chrome/Android System WebView à jour.');
    const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    const code=await new Response(stream).text();
    (0,eval)(code);
  }catch(error){
    console.error('Erreur de chargement V12',error);
    const box=document.createElement('div');
    box.style.cssText='margin:20px;padding:16px;border:1px solid #ef4444;background:#fff1f2;color:#991b1b;border-radius:12px;font:14px system-ui';
    box.textContent='Impossible de charger Devis Électrique V12 : '+(error?.message||error);
    document.body.prepend(box);
  }
})();
