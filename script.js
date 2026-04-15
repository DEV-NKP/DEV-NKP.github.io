// ── PERFORMANCE UTILS ──
const debounce=(func,wait)=>{let timeout;return function(...args){const later=()=>{clearTimeout(timeout);func(...args);};clearTimeout(timeout);timeout=setTimeout(later,wait);}};
const throttle=(func,limit)=>{let inThrottle;return function(){const args=arguments,context=this;if(!inThrottle){func.apply(context,args);inThrottle=true;setTimeout(()=>inThrottle=false,limit);}};};

// ── TYPED.JS ──
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Check if Typed is available and the element exists
  if (typeof Typed !== 'undefined' && document.querySelector('#typed5')) {
    new Typed('#typed5',{
      strings:['Software Engineer.','Salesforce Expert.','Full-Stack Developer.','CRM Architect.','Deep Learning Researcher.','Apex & LWC Specialist.'],
      typeSpeed:80,
      backSpeed:40,
      loop:true
    });
  }
});

// ── CUSTOM CURSOR ──
// Only initialize cursor if elements exist
const csr=document.getElementById('csr');
const cr=document.getElementById('csr-r');
if (csr && cr) {
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',throttle((e)=>{mx=e.clientX;my=e.clientY;csr.style.left=mx+'px';csr.style.top=my+'px';},16));
  (function loop(){rx+=(mx-rx)*0.09;ry+=(my-ry)*0.09;cr.style.left=rx+'px';cr.style.top=ry+'px';requestAnimationFrame(loop);})();
  
  // Add hover effects to interactive elements
  const interactiveElements = 'a,button,.project-card,.cert-card,.edu-card,.cs-card,.pub-item,.ci,.s-tag,.ft-soc,.hsa,.soc-btn,.a-tag';
  document.querySelectorAll(interactiveElements).forEach(el=>{
    el.addEventListener('mouseenter',()=>{csr.classList.add('hov');cr.classList.add('hov');});
    el.addEventListener('mouseleave',()=>{csr.classList.remove('hov');cr.classList.remove('hov');});
  });
}

// ── CONSTELLATION CANVAS ──
// Only initialize canvas if element exists
const canvas=document.getElementById('constellation');
if (canvas) {
  (function(){
    const c=canvas;
    const ctx=c.getContext('2d');
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
}

// ── SCROLL PROGRESS ──
// Only initialize scroll progress if element exists
const scrollProgress=document.getElementById('scrollProgress');
const sections=document.querySelectorAll('section');
let morphTimer=null,activeSection=null;

function updateScrollProgress(){
  if (!scrollProgress) return;
  
  const scrollTop=window.pageYOffset||document.documentElement.scrollTop;
  const scrollHeight=document.documentElement.scrollHeight-document.documentElement.clientHeight;
  scrollProgress.style.transform=`scaleX(${Math.min(1,scrollTop/scrollHeight)})`;
  updateSectionStates(scrollTop);
  
  const heroSection=document.getElementById('hero');
  const stb=document.getElementById('stb');
  if (heroSection && stb) {
    if(scrollTop>heroSection.offsetTop+heroSection.offsetHeight){stb.classList.add('on');}else{stb.classList.remove('on');}
  }
}

function updateSectionStates(scrollTop){
  if (sections.length === 0) return;
  
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
  if (sections.length === 0) return null;
  
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
      },5000);
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

// Only add scroll listeners if we have sections
if (sections.length > 0) {
  window.addEventListener('scroll',throttle(updateScrollProgress,16),{passive:true});
  window.addEventListener('load',()=>{
    updateScrollProgress();
    const firstSection=document.querySelector('#hero');
    if(firstSection){setTimeout(()=>triggerMorphAnimation(firstSection),500);}
  });
}

// ── NAV SCROLL EFFECT ──
// Only add nav scroll effect if nav exists
const nav=document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll',throttle(()=>{
    nav.classList.toggle('scrolled',window.scrollY>60);
  },16),{passive:true});
}

// ── MOBILE MENU ──
// Only initialize mobile menu if elements exist
const hbtn=document.getElementById('hbtn');
const mob=document.getElementById('mob');
if (hbtn && mob) {
  hbtn.addEventListener('click',()=>{
    mob.classList.toggle('open');
    document.body.style.overflow=mob.classList.contains('open')?'hidden':'';
  });
  function cmob(){mob.classList.remove('open');document.body.style.overflow='';}
  document.addEventListener('keydown',(e)=>{if(e.key==='Escape')cmob();});
}

// ── REVEAL ANIMATIONS ──
// Only initialize reveal animations if elements exist
const revealElements=document.querySelectorAll('.rv,.rvl,.rvr');
if (revealElements.length > 0) {
  const obsOptions={threshold:0.08,rootMargin:'0px 0px -50px 0px'};
  const obs=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('on');});},obsOptions);
  revealElements.forEach(el=>obs.observe(el));
}

// ── COUNTER ANIMATION ──
// Only initialize counter animation if elements exist
const counterElements=document.querySelectorAll('.counter');
if (counterElements.length > 0) {
  function animC(el){
    const t=+el.dataset.target;let c=0;const s=t/50;
    const iv=setInterval(()=>{c+=s;if(c>=t){c=t;clearInterval(iv);}el.textContent=Math.floor(c)+(t>10?'+':'');},40);
  }
  const co=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{if(entry.isIntersecting){counterElements.forEach(animC);co.disconnect();}});
  },{threshold:0.5});
  counterElements.forEach(el=>co.observe(el));
}

// ── PROJECT FILTER ──
// Only initialize project filter if elements exist
const filterButtons=document.querySelectorAll('.filter-btn');
const projectCards=document.querySelectorAll('.project-card');
if (filterButtons.length > 0 && projectCards.length > 0) {
  filterButtons.forEach(btn=>{
    btn.addEventListener('click',function(){
      filterButtons.forEach(b=>b.classList.remove('active'));
      this.classList.add('active');
      const f=this.dataset.filter;
      projectCards.forEach(card=>{
        card.style.display=(f==='all'||card.dataset.cat===f)?'flex':'none';
      });
    });
  });
}

// ── PROJECT CARD REVEAL ──
// Only initialize project card reveal if elements exist
const projectCardElements=document.querySelectorAll('.project-card');
if (projectCardElements.length > 0) {
  const projectObserver=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');});
  },{threshold:0.1});
  projectCardElements.forEach(card=>projectObserver.observe(card));
}

// ── CASE STUDY FILTER ──
// Only initialize case study filter if elements exist
const csFilterButtons=document.querySelectorAll('.cs-fbtn');
const csCards=document.querySelectorAll('.cs-card');
if (csFilterButtons.length > 0 && csCards.length > 0) {
  csFilterButtons.forEach(b=>{
    b.addEventListener('click',function(){
      csFilterButtons.forEach(x=>x.classList.remove('on'));
      this.classList.add('on');
      const f=this.dataset.cf;
      csCards.forEach(c=>{
        c.style.display=(f==='all'||c.dataset.ci===f)?'block':'none';
      });
    });
  });
}

// ── CERTIFICATIONS TOGGLE ──
// Only initialize certifications toggle if elements exist
const certToggle=document.getElementById('cert-toggle');
const ch=document.getElementById('ch');
const certIcon=document.getElementById('cert-icon');
if (certToggle && ch && certIcon) {
  function toggleCerts(){
    if(ch.style.display==='none'||ch.style.display===''){
      ch.style.display='grid';
      certIcon.className='fas fa-minus';
      certToggle.innerHTML='<i class="fas fa-minus" id="cert-icon"></i> Show Less Certifications';
    }else{
      ch.style.display='none';
      certIcon.className='fas fa-plus';
      certToggle.innerHTML='<i class="fas fa-plus" id="cert-icon"></i> Show More Certifications';
    }
  }
  certToggle.addEventListener('click', toggleCerts);
}

// ── VIDEO MODAL ──
// Only initialize video modal if elements exist
const vm=document.getElementById('vm');
const vf=document.getElementById('vf');
if (vm && vf) {
  function oVM(u){vf.src=u;vm.classList.add('open');document.body.style.overflow='hidden';}
  function cV(){vm.classList.remove('open');vf.src='';document.body.style.overflow='';}
  vm.addEventListener('click',function(e){if(e.target===this)cV();});
  
  // Make functions globally accessible
  window.oVM = oVM;
  window.cV = cV;
}

// ── CERTIFICATE MODAL ──
// Only initialize certificate modal if elements exist
const certModal=document.getElementById('certModal');
const certModalImg=document.getElementById('certModalImg');
if (certModal && certModalImg) {
  function openCertModal(name){
    certModalImg.src=`./resources/certificates/${name}.jpg`;
    certModalImg.alt=name;
    certModal.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeCertModal(){
    certModal.classList.remove('open');
    certModalImg.src='';
    document.body.style.overflow='';
  }
  certModal.addEventListener('click',function(e){if(e.target===this)closeCertModal();});
  
  // Make functions globally accessible
  window.openCertModal = openCertModal;
  window.closeCertModal = closeCertModal;
}

// ── CONTACT FORM ──
// Only initialize contact form if elements exist
const cf=document.getElementById('cf');
const submitMsg=document.getElementById('submit-msg');
const cfOk=document.getElementById('cf-ok');
if (cf && submitMsg && cfOk) {
  function submitForm(e){
    e.preventDefault();
    submitMsg.innerHTML='<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
    submitMsg.disabled=true;
    const formData=new FormData(cf);
    fetch('https://formsubmit.io/send/3d570815-9c63-444a-b736-63cc759338a9',{method:'POST',body:formData})
    .then(()=>{cf.style.display='none';cfOk.style.display='block';})
    .catch(()=>{submitMsg.innerHTML='<span><i class="fas fa-paper-plane"></i> Send Message</span>';submitMsg.disabled=false;alert('Error sending. Please email directly: niloykanti.paul2017@gmail.com');});
    return false;
  }
  cf.addEventListener('submit', submitForm);
}

// ── SMOOTH SCROLL ──
// Only initialize smooth scroll if anchor links exist
const anchorLinks=document.querySelectorAll('a[href^="#"]');
if (anchorLinks.length > 0) {
  anchorLinks.forEach(anchor=>{
    anchor.addEventListener('click',function(e){
      e.preventDefault();
      const target=document.querySelector(this.getAttribute('href'));
      if(target){
        const targetNav=document.getElementById('nav');
        const targetPosition=target.offsetTop-(targetNav?targetNav.offsetHeight:0)-20;
        window.scrollTo({top:targetPosition,behavior:'smooth'});
      }
    });
  });
}

// ── GPU ACCELERATION ──
// Only add GPU acceleration to elements that exist
window.addEventListener('DOMContentLoaded',()=>{
  const gpuElements=document.querySelectorAll('.rv,.rvl,.rvr,section');
  if (gpuElements.length > 0) {
    gpuElements.forEach(el=>el.classList.add('gpu-accelerated'));
  }
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
    if (vm && vm.classList.contains('open')) {
      cV();
    }
    
    if (certModal && certModal.classList.contains('open')) {
      closeCertModal();
    }
    
    if (mob && mob.classList.contains('open')) {
      cmob();
    }
  }
});