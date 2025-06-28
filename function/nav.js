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
        strings: ["an Engineer.", "a Researcher.", "a Developer.", "a Designer."],
        typeSpeed: 100,
        backSpeed: 50,
        loop: true
    });


  var typed = new Typed(".typing-2", {
    strings: ["an Engineer.", "a Researcher.", "a Developer.", "a Designer."],
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
            countABAnimation(".count-pro",25);
            countABAnimation(".count-exp",0);
            countABAnimation(".count-comp",3); 
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
, 100);


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
  var eduTitle = document.getElementById("edu-title");
  var workTitle = document.getElementById("work-title");
    var certificationTitle = document.getElementById("certification-title");
  var aboutTitle = document.getElementById("about-title");
var publicationTitle = document.getElementById("publication-title");

var projectCard = document.getElementsByClassName("card");

var eduData = document.getElementsByClassName("edu-data");
var workData = document.getElementsByClassName("work-data");

var contactsubTitle = document.getElementsByClassName("sub-title");

var inputSpan = document.getElementsByClassName("input-span");
var input = document.getElementsByClassName("input");
var certificates = document.getElementById("certificates");
var videoDescriptions = document.getElementsByClassName("video-ques-div");
  if(element.classList.contains("fa-moon"))
   {

    body.classList.add("dark-body");
    body.classList.remove("white-body");
    for (var i = 0; i < videoDescriptions.length; i++) {
      videoDescriptions[i].classList.add("dark");
      videoDescriptions[i].classList.remove("white");
        }

    for (var i = 0; i < projectCard.length; i++) {
    projectCard[i].classList.add("dark-card");
    projectCard[i].classList.remove("white-card");
    }

 
    for (var i = 0; i < workData.length; i++) {
      workData[i].classList.add("dark-work-data");
      workData[i].classList.remove("white-work-data");
    }
    for (var i = 0; i < eduData.length; i++) {
      eduData[i].classList.add("dark-edu-data");
      eduData[i].classList.remove("white-edu-data");
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
    
    if(certificates!=null)
    {
    certificates.classList.add("dark-certificate");
    certificates.classList.remove("white-certificate");
    }
    /*title color change*/
    if(contactTitle!=null)
    {
    contactTitle.classList.add("title-black");
    contactTitle.classList.remove("title-white");  
    }
    if(projectTitle!=null)
    {
    projectTitle.classList.add("title-black");
    projectTitle.classList.remove("title-white");  
    }
    if(workTitle!=null)
    {
      workTitle.classList.add("title-black");
      workTitle.classList.remove("title-white");  
    }
    if(eduTitle!=null)
      {
        eduTitle.classList.add("title-black");
        eduTitle.classList.remove("title-white");  
      }
    if(certificationTitle!=null)
    {
     certificationTitle.classList.add("title-black");
     certificationTitle.classList.remove("title-white"); 
    }
    if(aboutTitle!=null)
    { 
    aboutTitle.classList.add("title-black");
    aboutTitle.classList.remove("title-white");  
    }
    if(skillTitle!=null)
    {
    skillTitle.classList.add("title-black");
    skillTitle.classList.remove("title-white");   
    }
    if(publicationTitle!=null)
    {
    publicationTitle.classList.add("title-black");
    publicationTitle.classList.remove("title-white");
    }
/*button change*/ 
element.classList.remove("fa-moon");
element.classList.add("fa-lightbulb");  
   } 
   else if(element.classList.contains("fa-lightbulb"))
   {

    body.classList.remove("dark-body");
    body.classList.add("white-body");
    for (var i = 0; i < videoDescriptions.length; i++) {
      videoDescriptions[i].classList.add("white");
      videoDescriptions[i].classList.remove("dark");
        }
for (var i = 0; i < projectCard.length; i++) {
  projectCard[i].classList.remove("dark-card");
  projectCard[i].classList.add("white-card");
}

for (var i = 0; i < workData.length; i++) {
  workData[i].classList.remove("dark-work-data");
  workData[i].classList.add("white-work-data");
}
for (var i = 0; i < eduData.length; i++) {
  eduData[i].classList.remove("dark-edu-data");
  eduData[i].classList.add("white-edu-data");
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
    
    if(certificates!=null)
    {
certificates.classList.remove("dark-certificate");
certificates.classList.add("white-certificate");
    }
    /*title color change*/
    if(contactTitle!=null)
    {
    contactTitle.classList.remove("title-black");
    contactTitle.classList.add("title-white");
    }
    if(projectTitle!=null)
    {
    projectTitle.classList.remove("title-black");
    projectTitle.classList.add("title-white");
    }
    if(workTitle!=null)
    {
      workTitle.classList.remove("title-black");
      workTitle.classList.add("title-white");
    }
     if(eduTitle!=null)
    {
      eduTitle.classList.remove("title-black");
      eduTitle.classList.add("title-white");
    }
    if(certificationTitle!=null)
    {
    certificationTitle.classList.remove("title-black");
    certificationTitle.classList.add("title-white");
    }
    if(aboutTitle!=null)
    {
    aboutTitle.classList.remove("title-black");
    aboutTitle.classList.add("title-white");
    }
    if(skillTitle!=null)
    {
    skillTitle.classList.remove("title-black");
    skillTitle.classList.add("title-white");
    }
    if(publicationTitle!=null)
    {
    publicationTitle.classList.remove("title-black");
    publicationTitle.classList.add("title-white");
    }
/*button change*/ 
element.classList.remove("fa-lightbulb");
element.classList.add("fa-moon");  
   } 
  else{
    changeColor();
  }
}


function submitForm()
{

//window.location.href= "/popup.html"; 
document.getElementById("success-container").style.display='flex';
const html= document.getElementById("html-main");
html.classList.add("stop-scroll");
const successMsg= document.getElementById("success-message");
successMsg.classList.add("start-scroll");
   const form = document.querySelector('.my-form');
          const formData = new FormData(form);
          const url ="https://formsubmit.io/send/3d570815-9c63-444a-b736-63cc759338a9"
          fetch(
            url,
            {
              method: 'POST',
              body: formData
            }
          )
          return false;
        
        } 


        function showmore() {
          const buttonmsg=document.getElementById("showmore").innerHTML;
          if(buttonmsg=="Show More")
          {
            
            const hideitems=document.getElementById("hide-certificates");  
            while(hideitems.firstChild){
            document.getElementById("certificates").appendChild(hideitems.firstChild);
            }
          document.getElementById("showmore").innerHTML="Show Less";
         
          }
        
          else{
            const items=document.getElementById("certificates");  
            const hideitems=document.getElementById("hide-certificates"); 
            var x= items.children.length+hideitems.children.length;
            for( var i=3; i<x; i++){
              document.getElementById("hide-certificates").appendChild(items.children[3]);
          }
          document.getElementById("showmore").innerHTML="Show More";
          window.location.href= "#experience"; 
          }
          
          }


          function showcertificate(name)
          {

//window.location.href= "/popup.html"; 
document.getElementById("certificate-container").style.display='flex';
document.getElementById("certificate-gif").src="./resources/certificates/"+name+".jpg";
const html= document.getElementById("html-main");
html.classList.add("stop-scroll");
const certiMsg= document.getElementById("certificate-message");
certiMsg.classList.add("start-scroll");


          }

          function backtocertificate()
          {

//window.location.href= "/popup.html"; 
document.getElementById("certificate-container").style.display='none';
const html= document.getElementById("html-main");
html.classList.remove("stop-scroll");
// html.classList.add("start-scroll");
const certiMsg= document.getElementById("certificate-message");
certiMsg.classList.remove("start-scroll");
          }
          
          

           
        
