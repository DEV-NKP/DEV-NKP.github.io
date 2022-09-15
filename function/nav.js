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

//try

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
       

//try

$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('header').addClass("sticky");
        }else{
            $('header').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });
     $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });
    
    // typing text animation script
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
            countABAnimation(".count-pro",9);
            countABAnimation(".count-exp",0);
            countABAnimation(".count-comp",0); 
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
            barAnimation(".py", ".py-text", 30); 
            barAnimation(".html", ".html-text", 98); 
            barAnimation(".css", ".css-text", 95); 
            barAnimation(".js", ".js-text", 80); 
            barAnimation(".php", ".php-text", 85); 
            barAnimation(".mysql", ".mysql-text", 70); 
        
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
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
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


