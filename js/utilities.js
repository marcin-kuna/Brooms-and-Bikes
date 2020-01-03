// FULLPAGE SCROLL

const slideElems = document.querySelectorAll('.slide-section');
let slideIndex = 0;
let scrolling = false;
const waitTimeinMS = 1000;

function scrollingUp(){
  slideIndex--;
  restrictSlideIndex();
  showslide(slideIndex);
}

function scrollingDown(){
  slideIndex++;
  restrictSlideIndex();
  showslide(slideIndex);
}

window.addEventListener("wheel", event => {
    if (event.deltaY > 0 && scrolling == false) {
      scrollingDown()
    } else if (event.deltaY < 0 && scrolling == false) {
      scrollingUp();
    }
});

document.addEventListener('keydown', event => {
  if(event.code === 'ArrowDown'){
    scrollingDown()
  } else if (event.code === 'ArrowUp'){
    scrollingUp();
  }
})

function restrictSlideIndex() {
    if (slideIndex >= slideElems.length) {
      slideIndex = slideElems.length - 1;
    }
    if (slideIndex <= -1) {
      slideIndex = 0;
    }
}

function showslide() {
    scrolling = true;
    setTimeout(() => {
        scrolling = false;
    }, waitTimeinMS);
    smoothPageScroll();
}

function smoothPageScroll() { 
    const targetId = slideElems[slideIndex].id;
    const targetPosition = document.querySelector(`#${targetId}`).offsetTop; 
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if(!start) start = timestamp;
      const progress = timestamp - start;
      // window.scrollTo(0, distance*(progress/duration) + startPosition);    //linear
      window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
      if(progress < duration) window.requestAnimationFrame(step);
    }
}

// SMOOTH SCROLL

const navLinks = document.querySelectorAll(".nav-links");

navLinks.forEach(elem => elem.addEventListener('click', navbarLinkClick));

function navbarLinkClick(event) {
    smoothScroll(event);
}

function smoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href") === "#" ? "header" : event.currentTarget.getAttribute("href");

    // navbar + other nav btns slideIndex unify /w pagescroll
    switch(targetId){
      case "#header": slideIndex = 1;
      break;
      case "#gallery": slideIndex = 2;
      break;
      case "#choices": slideIndex = 3;
      break;
      case "#map": slideIndex = 4;
      break;
      case "#footer": slideIndex = 5;
      break;
    }

    const targetPosition = document.querySelector(targetId).offsetTop; 
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if(!start) start = timestamp;
      const progress = timestamp - start;
      // window.scrollTo(0, distance*(progress/duration) + startPosition);    //linear
      window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
      if(progress < duration) window.requestAnimationFrame(step);
    }
}

// EASING FOR SMOOTH SCROLL

function easeInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

// BACK TO TOP BUTTON

const backToTopButton = document.querySelector(".back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
    if (window.pageYOffset > 300) { // Show backToTopButton
      if(!backToTopButton.classList.contains("btnEntrance")) {
        backToTopButton.classList.remove("btnExit");
        backToTopButton.classList.add("btnEntrance");
        backToTopButton.style.display = "block";
      }
    }
    else { // Hide backToTopButton
      if(backToTopButton.classList.contains("btnEntrance")) {
        backToTopButton.classList.remove("btnEntrance");
        backToTopButton.classList.add("btnExit");
        setTimeout(function() {
          backToTopButton.style.display = "none";
        }, 250);
      }
    }
}

// RESPONSIVE MENU

const navbarToggler = document.querySelector(".navbar__toggler");
const navbarMenu = document.querySelector(".navbar ul");
const navbarLinks = document.querySelectorAll(".navbar a");

navbarToggler.addEventListener("click", navbarTogglerClick);

function navbarTogglerClick() {
    navbarToggler.classList.toggle("navbar__toggler--open");
    navbarMenu.classList.toggle("open");
}

navbarLinks.forEach(elem => elem.addEventListener("click", navLinkClick));

function navLinkClick() {
    if(navbarMenu.classList.contains("open")) {
      navbarToggler.click();
    }
}