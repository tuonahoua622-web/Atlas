// ===== Données des universités de Côte d'Ivoire (sans emoji) =====
const UNIV = [
  {name:"Université Félix Houphouët-Boigny", short:"UFHB", city:"Abidjan · Cocody", type:"public",
   img:"img/u-fhb.webp", x:78, y:78,
   tags:["Médecine","Droit","Sciences","Lettres"],
   desc:"La plus grande université publique du pays, héritière de l'Université de Cocody. Pôle d'excellence scientifique et médicale.",
   detail:"Fondée en 1964. Plus de 80 000 étudiants. Campus de Cocody, bibliothèques, laboratoires de recherche, et une faculté de médecine réputée (UFR Médecine)."},
  {name:"Université Nangui Abrogoua", short:"UNA", city:"Abidjan · Abobo-Adjamé", type:"public",
   img:"img/u-una.webp", x:74, y:70,
   tags:["Sciences","Agronomie","Pharmacie"],
   desc:"Spécialisée dans les sciences et technologies, l'agronomie et la pharmacie.",
   detail:"Ancienne Université d'Abobo-Adjamé. Forte en sciences fondamentales, biologie, chimie et formations d'ingénieurs agro."},
  {name:"Université Alassane Ouattara", short:"UAO", city:"Bouaké", type:"public",
   img:"img/u-uao.webp", x:52, y:48,
   tags:["Polytechnique","Sciences","Gestion","Lettres"],
   desc:"L'université de Bouaké, au Centre de la Côte d'Ivoire. En pleine expansion.",
   detail:"Deux campus à Ahougnansou. UFR Sciences et Technologies, Polytechnique, Sciences économiques, Lettres et sciences humaines. Rentrée 2025-2026 fixée au 15 septembre."},
  {name:"Université Péléforo Gon Coulibaly", short:"UPGC", city:"Korhogo", type:"public",
   img:"img/u-upgc.webp", x:48, y:18,
   tags:["Agronomie","Sciences","Gestion"],
   desc:"Université du Nord, à Korhogo. Axée sur l'agriculture, les sciences et le développement régional.",
   detail:"Située dans le chef-lieu du district des Savanes. UFR Agronomie, Sciences, Sciences économiques."},
  {name:"Université Jean Lorougnon Guédé", short:"UJLoG", city:"Daloa", type:"public",
   img:"img/u-ujlog.webp", x:38, y:62,
   tags:["Sciences","Santé","Lettres"],
   desc:"Université de l'Ouest, à Daloa. Sciences, technologies et santé.",
   detail:"Importante pour le Centre-Ouest. UFR Sciences, Médecine, Lettres, Sciences économiques."},
  {name:"Université de Man", short:"UMan", city:"Man", type:"public",
   img:"img/u-uman.webp", x:30, y:50,
   tags:["Tourisme","Sciences","Gestion"],
   desc:"Université de l'Ouest montagneux, à Man. Proche du pays Dan et du Mont Tonkoui.",
   detail:"UFR Sciences, Sciences économiques, Lettres. Dynamique autour du tourisme et de l'environnement."},
  {name:"Université Catholique de l'Afrique de l'Ouest", short:"UCAO-UUA", city:"Abidjan · Cocody", type:"prive",
   img:"img/u-ucao.webp", x:80, y:80,
   tags:["Droit","Gestion","Communication","Théologie"],
   desc:"Université privée confessionnelle de référence, unité d'Abidjan.",
   detail:"Réseau UCAO présent dans plusieurs pays. Formations en droit, gestion, communication, informatique."},
  {name:"Institut National Polytechnique", short:"INP-HB", city:"Yamoussoukro", type:"public",
   img:"img/u-inphb.webp", x:58, y:60,
   tags:["Ingénierie","Agronomie","Mines"],
   desc:"À Yamoussoukro, la capitale politique. Grand pôle d'ingénierie et d'agronomie.",
   detail:"INP-HB regroupe plusieurs écoles d'ingénieurs (Agronomie, Mines, Génie). Campus moderne."},
  {name:"École Supérieure Africaine des TIC", short:"ESATIC", city:"Abidjan", type:"public",
   img:"img/u-tech.webp", x:76, y:74,
   tags:["Informatique","Télécoms","Réseaux"],
   desc:"École supérieure spécialisée dans les technologies de l'information et de la communication.",
   detail:"Formations d'ingénieurs en TIC, télécoms, réseaux et informatique. Très demandée pour l'intelligence artificielle et le développement."},
  {name:"Université Internationale de l'Atlantique", short:"UIA", city:"Abidjan", type:"prive",
   img:"img/u-ucao.webp", x:82, y:76,
   tags:["Gestion","Droit","Sciences"],
   desc:"Université privée internationale à Abidjan, aux standards anglo-saxons.",
   detail:"Formations en gestion, droit, sciences. Partenariats internationaux."},
];

// ===== Lightbox =====
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
function openLightbox(src, cap){
  lbImg.src = src; lbImg.alt = cap; lbCap.textContent = cap; lb.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){ lb.hidden = true; lbImg.src=''; document.body.style.overflow=''; }
lb.querySelector('.lb-close').onclick = closeLightbox;
lb.addEventListener('click', e=>{ if(e.target===lb) closeLightbox(); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape' && !lb.hidden) closeLightbox(); });

// ===== Rendu de la liste éditoriale =====
const ledger = document.getElementById('ledger');
const entryObs = new IntersectionObserver((ents)=>{
  ents.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('show'); entryObs.unobserve(en.target); }});
},{threshold:.15});

function render(list){
  ledger.innerHTML = '';
  list.forEach((u,i)=>{
    const li = document.createElement('li');
    li.className = 'entry';
    const idx = String(i+1).padStart(2,'0');
    li.innerHTML = `
      <div class="entry-index">${idx}</div>
      <div class="entry-body">
        <h3>${u.name}</h3>
        <div class="entry-loc">${u.city} · ${u.short}</div>
        <p class="entry-desc">${u.desc}</p>
        <div class="entry-tags">${u.tags.map(t=>`<span>${t}</span>`).join('')}</div>
        <span class="entry-more">Lire la fiche ▾</span>
        <div class="entry-detail">${u.detail}</div>
      </div>
      <div class="entry-media" data-img="${u.img}" data-cap="${u.name} — ${u.city}">
        <span class="entry-status">${u.type==='public'?'Publique':'Privée'}</span>
        <img src="${u.img}" alt="Photographie de ${u.name}, ${u.city}" loading="lazy" width="1024" height="576">
      </div>`;
    ledger.appendChild(li);
    entryObs.observe(li);
    li.querySelector('.entry-media').onclick = ()=> openLightbox(u.img, `${u.name} — ${u.city}`);
    li.querySelector('.entry-more').onclick = ()=>{
      const d = li.querySelector('.entry-detail');
      const open = d.style.maxHeight;
      d.style.maxHeight = open ? null : d.scrollHeight + 'px';
      li.querySelector('.entry-more').textContent = open ? 'Lire la fiche ▾' : 'Replier ▴';
    };
  });
}
render(UNIV);

// ===== Filtres =====
document.getElementById('filters').addEventListener('click', e=>{
  const c = e.target.closest('.chip'); if(!c) return;
  document.querySelectorAll('.chip').forEach(x=>x.classList.remove('is-active'));
  c.classList.add('is-active');
  const f = c.dataset.f;
  render(f==='all' ? UNIV : UNIV.filter(u=>u.type===f));
});

// ===== Recherche =====
document.getElementById('search').addEventListener('input', e=>{
  const q = e.target.value.toLowerCase();
  render(UNIV.filter(u=> (u.name+u.city+u.short+u.tags.join(' ')).toLowerCase().includes(q)));
});

// ===== Chiffres animés =====
const nums = document.querySelectorAll('.fnum');
function animateNums(){
  nums.forEach(n=>{
    const target = +n.dataset.target; const dur=1300; const t0=performance.now();
    (function step(t){
      const p = Math.min((t-t0)/dur,1);
      n.textContent = Math.floor((1-Math.pow(1-p,3))*target).toLocaleString('fr-FR');
      if(p<1) requestAnimationFrame(step);
    })(performance.now());
  });
}
const figObs = new IntersectionObserver((ents)=>{
  ents.forEach(en=>{ if(en.isIntersecting){ animateNums(); figObs.disconnect(); }});
},{threshold:.4});
figObs.observe(document.querySelector('.figures'));

// ===== Reveal au scroll =====
const revObs = new IntersectionObserver((ents)=>{
  ents.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); revObs.unobserve(en.target); }});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

// ===== Carte : pins + liste =====
const pins = document.getElementById('pins');
const mapList = document.getElementById('mapList');
UNIV.forEach(u=>{
  const p = document.createElement('span');
  p.className='pin'; p.style.left=u.x+'%'; p.style.top=u.y+'%'; p.title = `${u.name} — ${u.city}`;
  pins.appendChild(p);
  const row = document.createElement('div');
  row.className='row';
  row.innerHTML = `<b>${u.short}</b><span>${u.city} — ${u.name}</span>`;
  mapList.appendChild(row);
});

// ===== Bascule thème =====
const btn = document.getElementById('themeBtn');
btn.onclick = ()=>{
  const cur = document.body.dataset.theme;
  const next = cur==='ink' ? 'paper' : 'ink';
  document.body.dataset.theme = next;
};
