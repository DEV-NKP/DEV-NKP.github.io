//import "https://smtpjs.com/v3/smtp.js";
const primaryNav=document.querySelector('.navlink');
const navToggle=document.querySelector('.mobile-nav-toggle');

navToggle.addEventListener('click', ()=> {
const visibility=primaryNav.getAttribute('data-visible');

if(visibility==="false")
{
    primaryNav.setAttribute('data-visible', "true");
    navToggle.setAttribute('aria-expanded', "true");
}
else if(visibility==="true")
{
    primaryNav.setAttribute('data-visible', "false");
    navToggle.setAttribute('aria-expanded', "false");
}
})



const primaryEdu=document.querySelector('.edu-log');
const primaryWork=document.querySelector('.work-log');
const eduToggle=document.querySelector('.quali-edu');
const workToggle=document.querySelector('.quali-work');


eduToggle.addEventListener('click', ()=> {
     
    $(window).click(function(){
    
        $('.work-log').removeClass("qualification_active");

        $('.edu-log').addClass("qualification_active");
        $('.quali-edu').addClass("qualification-active-option");
        $('.quali-work').removeClass("qualification-active-option");
        
    });
  
    })
    workToggle.addEventListener('click', ()=> {
        $(window).click(function(){
    
            $('.edu-log').removeClass("qualification_active");
            $('.work-log').addClass("qualification_active");
            $('.quali-work').addClass("qualification-active-option");
            $('.quali-edu').removeClass("qualification-active-option");
        });
 });      
       



$(document).ready(function(){
    $(window).scroll(function(){
      
        if(this.scrollY > 20){
            $('header').addClass("sticky");
        }else{
            $('header').removeClass("sticky");
        }
        
 
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });
     $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});

        $('html').css("scrollBehavior", "auto");
    });
    

    var typed = new Typed(".typing", {
        strings: ["Student.", "Engineer.", "Developer.", "Designer."],
        typeSpeed: 100,
        backSpeed: 50,
        loop: true
    });


  var typed = new Typed(".typing-2", {
    strings: ["Student.", "Engineer.", "Developer.", "Designer."],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });


});




  var flagbar=false;
var flagABcount=false;
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 100;
  
      if (elementTop < windowHeight - elementVisible) {
        if (reveals[i].classList.contains('TTB')) {
           reveals[i].classList.add("activeTTB"); 
          
        }
        else if (reveals[i].classList.contains('BTT')) {
           reveals[i].classList.add("activeBTT"); 

           if (reveals[i].classList.contains('about-count')&&flagABcount==false) {
            flagABcount=true;
            countABAnimation(".count-pro",10);
            countABAnimation(".count-exp",0);
            countABAnimation(".count-comp",1); 
                }
        } 
        else if (reveals[i].classList.contains('LTR')) {
           reveals[i].classList.add("activeLTR"); 
           if (reveals[i].classList.contains('show-percent')&&flagbar==false) {
            flagbar=true;
            barAnimation(".c", ".c-text", 95); 
            barAnimation(".cpp", ".cpp-text", 90); 
            barAnimation(".cs", ".cs-text", 85); 
            barAnimation(".java", ".java-text", 80); 
            barAnimation(".py", ".py-text", 60); 
            barAnimation(".html", ".html-text", 98); 
            barAnimation(".css", ".css-text", 95); 
            barAnimation(".js", ".js-text", 80); 
            barAnimation(".php", ".php-text", 85); 
            barAnimation(".mysql", ".mysql-text", 75); 
             barAnimation(".aspnet", ".aspnet-text", 80); 
             barAnimation(".sqlserver", ".sqlserver-text", 70); 
        
        }


        
        } 
        else if (reveals[i].classList.contains('RTL')) {
           reveals[i].classList.add("activeRTL"); 
        }
        else{

        }
      } 

      
    
      else {
      if (reveals[i].classList.contains('show-percent')&&flagbar==true) {
            flagbar=false;
        }
        if (reveals[i].classList.contains('about-count')&&flagABcount==true) {
            flagABcount=false;
       
                }

        reveals[i].classList.remove("activeTTB");
        reveals[i].classList.remove("activeBTT");
        reveals[i].classList.remove("activeLTR");
        reveals[i].classList.remove("activeRTL");
      }
    }





  }
  
  window.addEventListener("scroll", reveal);



function barAnimation(line, text, percent) {
 var w = 0;
  if (w == 0) {
    w = 1;
    var elem = document.querySelector(line);
    var elemText= document.querySelector(text);
    var width = 1;
    var id = setInterval(
    function() {
      if (width >= Number(percent)) {
        clearInterval(id);
        w = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elemText.innerHTML=width+"%";
      }
    }
, 30);


  }
}

function countABAnimation(text, num) {

 var cx = 0;
  if (cx == 0) {
    cx = 1;
    var c = document.querySelector(text);
    var x = 1;
    var id = setInterval(
    function() {
      if (x >= Number(num)) {
        clearInterval(id);
        cx = 0;
      } else {
        x++;
        c.innerHTML=x;
      }
    }
, 200);


  }
}


$(".carousel").owlCarousel({
    margin: 20,
    rewind:true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    mouseDrag:true,
    touchDrag:true,
    mergeFit:true,
    lazyLoad:true,
    video:true,
    checkVisible:false,
    
    responsive: {
      0:{
        items:1,
        nav: false
      },
      600:{
        items:2,
        nav: false
      },
      1000:{
        items:3,
        nav: false
      }
    }
  });

function changeColor(){
var body = document.getElementById("body");
    var element = document.getElementById("dark-light");
    
   var skillTitle = document.getElementById("skill-title");
   var contactTitle = document.getElementById("contact-title");
  var projectTitle = document.getElementById("project-title");
  var qualiTitle = document.getElementById("quali-title");
  var aboutTitle = document.getElementById("about-title");
var publicationTitle = document.getElementById("publication-title");

var projectCard = document.getElementsByClassName("card");

var qualiEdu = document.getElementById("quali-edu");
  var qualiWork = document.getElementById("quali-work");

var qualiData = document.getElementsByClassName("quali-data");
var contactsubTitle = document.getElementsByClassName("sub-title");

var inputSpan = document.getElementsByClassName("input-span");
var input = document.getElementsByClassName("input");

  if(element.classList.contains("fa-moon"))
   {

    body.classList.add("dark-body");
    body.classList.remove("white-body");
   
    for (var i = 0; i < projectCard.length; i++) {
    projectCard[i].classList.add("dark-card");
    projectCard[i].classList.remove("white-card");
    }

 
    for (var i = 0; i < qualiData.length; i++) {
      qualiData[i].classList.add("dark-quali-data");
      qualiData[i].classList.remove("white-quali-data");
    }

 for (var i = 0; i < contactsubTitle.length; i++) {
  contactsubTitle[i].classList.add("dark-sub-title");
  contactsubTitle[i].classList.remove("white-sub-title");
    }

 for (var i = 0; i < inputSpan.length; i++) {
  inputSpan[i].classList.add("dark-input-span");
  inputSpan[i].classList.remove("white-input-span");
    }
     for (var i = 0; i < input.length; i++) {
      input[i].classList.add("dark-input");
      input[i].classList.remove("white-input");
    }

    qualiEdu.classList.add("dark-text");
    qualiEdu.classList.remove("white-text");
    qualiWork.classList.add("dark-text");
    qualiWork.classList.remove("white-text");

    /*title color change*/
    contactTitle.classList.add("title-black");
    contactTitle.classList.remove("title-white");  
    projectTitle.classList.add("title-black");
    projectTitle.classList.remove("title-white");  
    qualiTitle.classList.add("title-black");
    qualiTitle.classList.remove("title-white");  
    aboutTitle.classList.add("title-black");
    aboutTitle.classList.remove("title-white");  
    skillTitle.classList.add("title-black");
    skillTitle.classList.remove("title-white");   
    publicationTitle.classList.add("title-black");
    publicationTitle.classList.remove("title-white");
/*button change*/ 
element.classList.remove("fa-moon");
element.classList.add("fa-bolt");  
   } 
   else if(element.classList.contains("fa-bolt"))
   {

    body.classList.remove("dark-body");
    body.classList.add("white-body");
     
for (var i = 0; i < projectCard.length; i++) {
  projectCard[i].classList.remove("dark-card");
  projectCard[i].classList.add("white-card");
}

for (var i = 0; i < qualiData.length; i++) {
  qualiData[i].classList.remove("dark-quali-data");
  qualiData[i].classList.add("white-quali-data");
}
for (var i = 0; i < contactsubTitle.length; i++) {
  contactsubTitle[i].classList.remove("dark-sub-title");
  contactsubTitle[i].classList.add("white-sub-title");
    }
    for (var i = 0; i < inputSpan.length; i++) {
      inputSpan[i].classList.remove("dark-input-span");
      inputSpan[i].classList.add("white-input-span");
        }
         for (var i = 0; i < input.length; i++) {
          input[i].classList.remove("dark-input");
          input[i].classList.add("white-input");
        }
    
qualiEdu.classList.remove("dark-text");
qualiEdu.classList.add("white-text");
qualiWork.classList.remove("dark-text");
qualiWork.classList.add("white-text");

    /*title color change*/
    contactTitle.classList.remove("title-black");
    contactTitle.classList.add("title-white");
    projectTitle.classList.remove("title-black");
    projectTitle.classList.add("title-white");
    qualiTitle.classList.remove("title-black");
    qualiTitle.classList.add("title-white");
    aboutTitle.classList.remove("title-black");
    aboutTitle.classList.add("title-white");
    skillTitle.classList.remove("title-black");
    skillTitle.classList.add("title-white");
    publicationTitle.classList.remove("title-black");
    publicationTitle.classList.add("title-white");
/*button change*/ 
element.classList.remove("fa-bolt");
element.classList.add("fa-moon");  
   } 
  else{
    changeColor();
  }
}

function submitForm()
{
try{

   const form = document.querySelector('.my-form');
          const formData = new FormData(form);
          const url ="https://formsubmit.io/send/niloykantipaul@gmail.com"
          fetch(
            url,
            {
              method: 'POST',
              body: formData
            }
          )
          return false;
          } finally {
         window.location.href= "/popup.html";     
        } 

}
