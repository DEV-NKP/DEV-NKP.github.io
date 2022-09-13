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




/**/

    // slide-up script
   /*
    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });
    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
   

  
    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });*/
});