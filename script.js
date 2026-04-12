// ── PERFORMANCE UTILS ──
const debounce=(func,wait)=>{let timeout;return function(...args){const later=()=>{clearTimeout(timeout);func(...args);};clearTimeout(timeout);timeout=setTimeout(later,wait);}};
const throttle=(func,limit)=>{let inThrottle;return function(){const args=arguments,context=this;if(!inThrottle){func.apply(context,args);inThrottle=true;setTimeout(()=>inThrottle=false,limit);}};};

// ── TYPED.JS ──
new Typed('#typed5',{
  strings:['Software Engineer.','Salesforce Expert.','Full-Stack Developer.','CRM Architect.','Deep Learning Researcher.','Apex & LWC Specialist.'],
  typeSpeed:80,
  backSpeed:40,
  loop:true
});

// ── CUSTOM CURSOR ──
const csr=document.getElementById('csr'),cr=document.getElementById('csr-r');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',throttle((e)=>{mx=e.clientX;my=e.clientY;csr.style.left=mx+'px';csr.style.top=my+'px';},16));
(function loop(){rx+=(mx-rx)*0.09;ry+=(my-ry)*0.09;cr.style.left=rx+'px';cr.style.top=ry+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button,.project-card,.cert-card,.edu-card,.cs-card,.pub-item,.ci,.s-tag,.ft-soc,.hsa,.soc-btn,.a-tag').forEach(el=>{
  el.addEventListener('mouseenter',()=>{csr.classList.add('hov');cr.classList.add('hov');});
  el.addEventListener('mouseleave',()=>{csr.classList.remove('hov');cr.classList.remove('hov');});
});

// ── CONSTELLATION CANVAS ──
(function(){
  const c=document.getElementById('constellation'),ctx=c.getContext('2d');
  let W,H,pts=[];
  function resize(){W=c.width=innerWidth;H=c.height=innerHeight;}
  resize();
  window.addEventListener('resize',debounce(resize,250));
  for(let i=0;i<60;i++)pts.push({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25});
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,1.2,0,Math.PI*2);ctx.fillStyle='rgba(16,185,129,0.5)';ctx.fill();
    });
    for(let i=0;i<pts.length;i++){for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<130){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(16,185,129,${.15*(1-d/130)})`;ctx.lineWidth=.5;ctx.stroke();}
    }}
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── SCROLL PROGRESS ──
const scrollProgress=document.getElementById('scrollProgress');
const sections=document.querySelectorAll('section');
let morphTimer=null,activeSection=null;

function updateScrollProgress(){
  const scrollTop=window.pageYOffset||document.documentElement.scrollTop;
  const scrollHeight=document.documentElement.scrollHeight-document.documentElement.clientHeight;
  scrollProgress.style.transform=`scaleX(${Math.min(1,scrollTop/scrollHeight)})`;
  updateSectionStates(scrollTop);
  const heroSection=document.getElementById('hero');
  const stb=document.getElementById('stb');
  if(scrollTop>heroSection.offsetTop+heroSection.offsetHeight){stb.classList.add('on');}else{stb.classList.remove('on');}
}

function updateSectionStates(scrollTop){
  const vh=window.innerHeight;
  const vc=scrollTop+vh/2;
  sections.forEach(section=>{
    const rect=section.getBoundingClientRect();
    const st=rect.top+scrollTop,sb=st+rect.height;
    section.classList.remove('scroll-out','scroll-in','scroll-active');
    if(st>scrollTop+vh){section.style.opacity='0';section.style.transform='translateY(50px)';}
    else if(sb<scrollTop){section.classList.add('scroll-out');const s=Math.max(0.85,1-(scrollTop-sb)/500);section.style.transform=`scale(${s}) translateY(20px)`;section.style.opacity='0.6';}
    else{const d=Math.abs(st+rect.height/2-vc);if(d<vh/3){section.classList.add('scroll-active');section.style.transform='scale(1.02) translateY(-5px)';section.style.opacity='1';}else{section.classList.add('scroll-in');section.style.transform='scale(1)';section.style.opacity='1';}}
  });
  handleActiveSectionMorph();
}

function getActiveSection(){
  const sections=document.querySelectorAll('section');
  const viewportHeight=window.innerHeight;
  const viewportCenter=window.pageYOffset+viewportHeight/2;
  let mostVisibleSection=null;
  let maxVisibility=0;
  sections.forEach(section=>{
    const rect=section.getBoundingClientRect();
    const sectionTop=rect.top+window.pageYOffset;
    const sectionBottom=sectionTop+rect.height;
    const visibleTop=Math.max(sectionTop,window.pageYOffset);
    const visibleBottom=Math.min(sectionBottom,window.pageYOffset+viewportHeight);
    const visibleHeight=Math.max(0,visibleBottom-visibleTop);
    const visibilityPercentage=visibleHeight/rect.height;
    const sectionCenter=sectionTop+rect.height/2;
    const distanceFromCenter=Math.abs(viewportCenter-sectionCenter);
    const maxDistance=viewportHeight/2;
    const centerScore=1-(distanceFromCenter/maxDistance);
    const score=visibilityPercentage*0.7+centerScore*0.3;
    if(score>maxVisibility){maxVisibility=score;mostVisibleSection=section;}
  });
  return mostVisibleSection;
}

function handleActiveSectionMorph(){
  const newActiveSection=getActiveSection();
  if(newActiveSection!==activeSection){
    if(morphTimer){clearInterval(morphTimer);morphTimer=null;}
    activeSection=newActiveSection;
    if(activeSection){
      triggerMorphAnimation(activeSection);
      morphTimer=setInterval(()=>{
        const title=activeSection.querySelector('.sec-title');
        if(getActiveSection()===activeSection&&(!title||!title.classList.contains('morphing'))){
          triggerMorphAnimation(activeSection);
        }else if(getActiveSection()!==activeSection){
          clearInterval(morphTimer);
          morphTimer=null;
        }
      },5000); // Increased interval to reduce frequency
    }
  }
}

function triggerMorphAnimation(section){
  const title=section.querySelector('.sec-title');
  if(title&&!title.classList.contains('morphing')){
    title.classList.add('morphing');
    const originalHTML=title.innerHTML;
    const tempDiv=document.createElement('div');
    tempDiv.innerHTML=originalHTML;
    let totalChars=0;
    function countChars(node){
      if(node.nodeType===Node.TEXT_NODE){totalChars+=node.textContent.length;}
      else if(node.nodeType===Node.ELEMENT_NODE){Array.from(node.childNodes).forEach(child=>countChars(child));}
    }
    Array.from(tempDiv.childNodes).forEach(child=>countChars(child));
    const animationDuration=600;
    const delayBetweenChars=50;
    const totalAnimationTime=totalChars*delayBetweenChars+animationDuration;
    let charIndex=0;
    function processNode(node){
      if(node.nodeType===Node.TEXT_NODE){
        const chars=node.textContent.split('');
        const fragment=document.createDocumentFragment();
        chars.forEach((char)=>{
          const span=document.createElement('span');
          span.style.display='inline-block';
          span.style.animation=`morphChar ${animationDuration}ms ${charIndex*delayBetweenChars}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`;
          // Fixed: Use actual non-breaking space character instead of &nbsp;
          span.textContent=char===' ' ? '\u00A0' : char;
          fragment.appendChild(span);
          charIndex++;
        });
        return fragment;
      }else if(node.nodeType===Node.ELEMENT_NODE){
        const clone=node.cloneNode(false);
        Array.from(node.childNodes).forEach(child=>{clone.appendChild(processNode(child));});
        return clone;
      }
      return node;
    }
    const fragment=document.createDocumentFragment();
    Array.from(tempDiv.childNodes).forEach(child=>{fragment.appendChild(processNode(child));});
    title.innerHTML='';
    title.appendChild(fragment);
    if(!document.querySelector('#morphCharStyle')){
      const style=document.createElement('style');
      style.id='morphCharStyle';
      style.textContent=`
        @keyframes morphChar {
          0% { transform: translateY(20px) rotateX(90deg); opacity: 0; }
          50% { transform: translateY(-5px) rotateX(0deg); opacity: 1; }
          85% { transform: translateY(0) rotateX(0deg); opacity: 1; }
          100% { transform: translateY(0) rotateX(0deg); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
    setTimeout(()=>{
      title.classList.add('morph-restoring');
      if(!document.querySelector('#morphRestoreStyle')){
        const restoreStyle=document.createElement('style');
        restoreStyle.id='morphRestoreStyle';
        restoreStyle.textContent=`
          .morph-restoring span {
            transition: all 0.5s ease-out !important;
          }
        `;
        document.head.appendChild(restoreStyle);
      }
      setTimeout(()=>{
        title.innerHTML=originalHTML;
        title.classList.remove('morphing','morph-restoring');
      },500);
    },totalAnimationTime);
  }
}

window.addEventListener('scroll',throttle(updateScrollProgress,16),{passive:true});
window.addEventListener('load',()=>{
  updateScrollProgress();
  const firstSection=document.querySelector('#hero');
  if(firstSection){setTimeout(()=>triggerMorphAnimation(firstSection),500);}
});

// ── NAV SCROLL EFFECT ──
window.addEventListener('scroll',throttle(()=>{
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);
},16),{passive:true});

// ── MOBILE MENU ──
document.getElementById('hbtn').addEventListener('click',()=>{
  const mob=document.getElementById('mob');
  mob.classList.toggle('open');
  document.body.style.overflow=mob.classList.contains('open')?'hidden':'';
});
function cmob(){const mob=document.getElementById('mob');mob.classList.remove('open');document.body.style.overflow='';}
document.addEventListener('keydown',(e)=>{if(e.key==='Escape')cmob();});

// ── REVEAL ANIMATIONS ──
const obsOptions={threshold:0.08,rootMargin:'0px 0px -50px 0px'};
const obs=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('on');});},obsOptions);
document.querySelectorAll('.rv,.rvl,.rvr').forEach(el=>obs.observe(el));

// ── COUNTER ANIMATION ──
function animC(el){
  const t=+el.dataset.target;let c=0;const s=t/50;
  const iv=setInterval(()=>{c+=s;if(c>=t){c=t;clearInterval(iv);}el.textContent=Math.floor(c)+(t>10?'+':'');},40);
}
const co=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('.counter').forEach(animC);co.disconnect();}});
},{threshold:0.5});
document.querySelectorAll('.counter').forEach(el=>co.observe(el));

// ── PROJECT FILTER ──
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const f=this.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card=>{
      card.style.display=(f==='all'||card.dataset.cat===f)?'flex':'none';
    });
  });
});

// ── PROJECT CARD REVEAL ──
const projectObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');});
},{threshold:0.1});
document.querySelectorAll('.project-card').forEach(card=>projectObserver.observe(card));

// ── CASE STUDY FILTER ──
document.querySelectorAll('.cs-fbtn').forEach(b=>{
  b.addEventListener('click',function(){
    document.querySelectorAll('.cs-fbtn').forEach(x=>x.classList.remove('on'));
    this.classList.add('on');
    const f=this.dataset.cf;
    document.querySelectorAll('.cs-card').forEach(c=>{
      c.style.display=(f==='all'||c.dataset.ci===f)?'block':'none';
    });
  });
});

// ── CERTIFICATIONS TOGGLE ──
function toggleCerts(){
  const m=document.getElementById('ch');
  const icon=document.getElementById('cert-icon');
  const btn=document.getElementById('cert-toggle');
  if(m.style.display==='none'||m.style.display===''){
    m.style.display='grid';
    icon.className='fas fa-minus';
    btn.innerHTML='<i class="fas fa-minus" id="cert-icon"></i> Show Less Certifications';
  }else{
    m.style.display='none';
    icon.className='fas fa-plus';
    btn.innerHTML='<i class="fas fa-plus" id="cert-icon"></i> Show More Certifications';
  }
}

// ── VIDEO MODAL ──
function oVM(u){document.getElementById('vf').src=u;document.getElementById('vm').classList.add('open');document.body.style.overflow='hidden';}
function cV(){document.getElementById('vm').classList.remove('open');document.getElementById('vf').src='';document.body.style.overflow='';}
document.getElementById('vm').addEventListener('click',function(e){if(e.target===this)cV();});

// ── CERTIFICATE MODAL ──
function openCertModal(name){
  const modal=document.getElementById('certModal');
  const img=document.getElementById('certModalImg');
  img.src=`./resources/certificates/${name}.jpg`;
  img.alt=name;
  modal.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeCertModal(){
  const modal=document.getElementById('certModal');
  modal.classList.remove('open');
  document.getElementById('certModalImg').src='';
  document.body.style.overflow='';
}
document.getElementById('certModal').addEventListener('click',function(e){if(e.target===this)closeCertModal();});

// ── CONTACT FORM ──
function submitForm(e){
  e.preventDefault();
  const btn=document.getElementById('submit-msg');
  btn.innerHTML='<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
  btn.disabled=true;
  const formData=new FormData(document.getElementById('cf'));
  fetch('https://formsubmit.io/send/3d570815-9c63-444a-b736-63cc759338a9',{method:'POST',body:formData})
  .then(()=>{document.getElementById('cf').style.display='none';document.getElementById('cf-ok').style.display='block';})
  .catch(()=>{btn.innerHTML='<span><i class="fas fa-paper-plane"></i> Send Message</span>';btn.disabled=false;alert('Error sending. Please email directly: niloykanti.paul2017@gmail.com');});
  return false;
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click',function(e){
    e.preventDefault();
    const target=document.querySelector(this.getAttribute('href'));
    if(target){
      const nav=document.getElementById('nav');
      const targetPosition=target.offsetTop-nav.offsetHeight-20;
      window.scrollTo({top:targetPosition,behavior:'smooth'});
    }
  });
});

// ── GPU ACCELERATION ──
window.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.rv,.rvl,.rvr,section').forEach(el=>el.classList.add('gpu-accelerated'));
});

// ── PERFORMANCE MONITORING ──
if(window.performance){
  window.addEventListener('load',()=>{
    const perfData=window.performance.timing;
    const pageLoadTime=perfData.loadEventEnd-perfData.navigationStart;
    console.log(`NKP Portfolio loaded in ${pageLoadTime}ms`);
  });
}

// Clean up timers when page is unloaded
window.addEventListener('beforeunload',()=>{
  if(morphTimer){clearInterval(morphTimer);}
});

// ── FIX FOR ESCAPE KEY IN MODALS ──
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const videoModal = document.getElementById('vm');
    const certModal = document.getElementById('certModal');
    
    if (videoModal.classList.contains('open')) {
      cV();
    }
    
    if (certModal.classList.contains('open')) {
      closeCertModal();
    }
    
    if (document.getElementById('mob').classList.contains('open')) {
      cmob();
    }
  }
});