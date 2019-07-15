// FULL PAGE SCROLL

let slideElems = document.querySelectorAll('.slide-section');
// let buttonContainerElem = document.querySelector(".buttons");
let slideIndex = 0;
let scrolling = false;
let waitTimeinMS = 1000

console.log(slideElems); 
 

//============================================Init======================================================================//

//init

// slideElems.forEach((slideElem,index) => {
//     buttonContainerElem.innerHTML += `<button class="slidebutton" data-value="${index}"></button>`
// });

// let sliderButtonElems = document.querySelectorAll('.slidebutton');
// showslide(slideIndex)
// changeActiveDot();


//======================================================================================================================//


// sliderButtonElems.forEach(sliderButton => {
//     sliderButton.addEventListener('click', () => {
//         slideIndex = sliderButton.dataset.value;
//         restrictSlideIndex();
//         showslide(slideIndex)
//     });	
// });

window.addEventListener("wheel", event => {
    if(event.deltaY > 0 && scrolling == false){
        slideIndex++;
        restrictSlideIndex();
        showslide(slideIndex);

        // console.log("scroll down"); 
        // console.log(slideIndex);
        // console.log(slideElems[slideIndex].id);
    }else if (event.deltaY < 0 && scrolling == false){
        slideIndex--;
        restrictSlideIndex();
        showslide(slideIndex);

        // console.log("scroll up");
        // console.log(slideIndex);
        // console.log(slideElems[slideIndex].id);  
    }
});

function restrictSlideIndex(){
    if (slideIndex >= slideElems.length){
        slideIndex = slideElems.length - 1;
    }
    if (slideIndex <= -1){
        slideIndex = 0;
    }
}

function showslide(index){
    scrolling = true;
    setTimeout(() => {
        scrolling = false;
    }, waitTimeinMS);
    smoothPageScroll();
    // changeActiveDot();
}


function smoothPageScroll(){ 
  const targetId = slideElems[slideIndex].id;
  const targetPosition = document.querySelector(`#${targetId}`).offsetTop; 
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp){
      if(!start) start = timestamp;
      const progress = timestamp - start;
      // window.scrollTo(0, distance*(progress/duration) + startPosition);    //linear
      window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
      if(progress < duration) window.requestAnimationFrame(step);
  }
}


// function changeActiveDot(){
//     sliderButtonElems.forEach(sliderButton => {
//         if (sliderButton.dataset.value == slideIndex){
//             sliderButton.classList.add("slidebutton--active")
//         }else{
//             sliderButton.classList.remove("slidebutton--active")
//         };
//     });
// }