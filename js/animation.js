const scroll = requestAnimationFrame || 
               function(callback) {window.setTimeout(callback, 1000/60)};

let elementsToShow = document.querySelectorAll('.show-on-scroll');



function loop() {
    elementsToShow.forEach(function(element){
        if(isElementInViewport(element)){
            element.classList.add('is-visible')
        } else{
            element.classList.remove('is-visible')
        }
    });
    scroll(loop);
}

loop();

function isElementInViewport(el){
    var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

function animateValue(id, start, end, duration) {
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let obj = document.getElementById(id);
  let timer = setInterval(function() {
      current += increment;
      obj.innerHTML = current;
      if (current == end) {
          clearInterval(timer);
      }
  }, stepTime);
}


// Footer numbers counter

const footerCounter = document.getElementById('footer-counter');
let numbers = document.getElementsByClassName('numbers');

let numbersCalled = false;

function callNumbers(){
  if(footerCounter.classList.contains('is-visible')){
    if(numbersCalled == false){
      numbersCalled = true;
      animateValue("number-one", 0, 20, 1200);
      animateValue("number-two", 0, 99, 1200);
      animateValue("number-three", 0, 450, 1200);
    }
} else{
  Array.from(numbers).forEach(function(number){
    number.innerHTML = "";
    numbersCalled = false;
  })
}
  scroll(callNumbers); // using scroll "listener" defined above
}

callNumbers();