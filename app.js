(async()=>{
  const sources=[
    './app-data.b64',
    new URL('./app-data.b64',location.href).href,
    'https://raw.githubusercontent.com/kevinlabens-del/devis-lectrique/main/app-data.b64'
  ];
  try{
    let text='',lastError=null;
    for(const source of sources){
      try{
        const response=await fetch(source,{cache:'no-store',credentials:'omit'});
        if(!response.ok)throw new Error(`HTTP ${response.status}`);
        text=await response.text();
        if(text.trim())break;
      }catch(err){lastError=err;console.warn('Source moteur indisponible',source,err)}
    }
    if(!text.trim())throw new Error('Impossible de récupérer le moteur V12'+(lastError?` (${lastError.message})`:'');
    const b64=text.replace(/\s+/g,'');
    const binary=atob(b64);
    const bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    if(!('DecompressionStream' in window))throw new Error('Ce navigateur ne prend pas en charge la décompression du moteur V12. Mets Chrome/Android System WebView à jour.');
    const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    const code=await new Response(stream).text();
    (0,eval)(code);
  }catch(error){
    console.error('Erreur de chargement V12',error);
    const box=document.createElement('div');
    box.style.cssText='margin:20px;padding:16px;border:1px solid #ef4444;background:#fff1f2;color:#991b1b;border-radius:12px;font:14px system-ui';
    box.innerHTML='<strong>Impossible de charger Devis Électrique V12.</strong><br>'+String(error?.message||error)+'<br><br><button id="retryV12" style="border:0;border-radius:8px;padding:10px 14px;background:#172554;color:white;font-weight:700">Réessayer</button>';
    document.body.prepend(box);
    document.getElementById('retryV12')?.addEventListener('click',()=>location.reload());
  }
})();
