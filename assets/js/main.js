const menuBtn=document.querySelector('.menu-btn');const navLinks=document.querySelector('.nav-links');menuBtn?.addEventListener('click',()=>navLinks?.classList.toggle('open'));document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks?.classList.remove('open')));

(()=>{const root=document.documentElement;const btn=document.querySelector('.theme-settings-btn');const panel=document.querySelector('.theme-panel');const close=document.querySelector('.theme-panel-close');const choices=[...document.querySelectorAll('.theme-option')];const media=window.matchMedia('(prefers-color-scheme: dark)');
const readPref=()=>{try{return localStorage.getItem('resco-theme')||'system'}catch(e){return 'system'}};
const resolved=p=>p==='minecraft'?'minecraft':(p==='dark'||(p==='system'&&media.matches)?'dark':'light');
const paint=p=>{root.dataset.theme=resolved(p);root.dataset.themePreference=p;choices.forEach(c=>c.setAttribute('aria-checked',String(c.dataset.themeChoice===p)));const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',root.dataset.theme==='minecraft'?'#24351f':'#101010')};
const save=p=>{try{localStorage.setItem('resco-theme',p)}catch(e){}paint(p)};
const setOpen=open=>{if(!panel||!btn)return;panel.hidden=!open;btn.setAttribute('aria-expanded',String(open));if(open)choices.find(c=>c.dataset.themeChoice===readPref())?.focus()};
paint(readPref());
btn?.addEventListener('click',e=>{e.stopPropagation();setOpen(panel?.hidden!==false)});close?.addEventListener('click',()=>setOpen(false));choices.forEach(c=>c.addEventListener('click',()=>{save(c.dataset.themeChoice);setOpen(false)}));
document.addEventListener('click',e=>{if(panel&&!panel.hidden&&!panel.contains(e.target)&&e.target!==btn)setOpen(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});media.addEventListener?.('change',()=>{if(readPref()==='system')paint('system')});})();


document.querySelectorAll('[data-dev-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  const f=btn.dataset.devFilter;
  document.querySelectorAll('[data-dev-filter]').forEach(x=>x.classList.toggle('active',x===btn));
  document.querySelectorAll('[data-dev-labels]').forEach(post=>{post.hidden=f!=='All'&&!String(post.dataset.devLabels||'').split('|').includes(f)});
}));
