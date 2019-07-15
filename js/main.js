// NEW GALLERY

let slides = document.querySelectorAll('.slide');
let sliding = false;
let auto = false; // Auto scroll
const intervalTime = 2000;
let slideInterval;

function antiSpam(){
    sliding = true;
    setTimeout(()=>{
        sliding = false;
    }, 500)
}

// zmieniałem wcześniej klasy każdej osobno

function prevSlide(){
    antiSpam();

    slides.forEach((slide)=>{
        if(slide.nextElementSibling){
            slide.nextElementSibling.classList.add(slide.classList[1]);
            slide.classList.remove(slide.classList[1]);
        }
        else{
            slides[0].classList.add(slide.classList[1]);
            slide.classList.remove(slide.classList[1]);
        }
});
}

function nextSlide(){
    antiSpam();

    slides.forEach((slide)=>{
        if(slide.previousElementSibling){
            slide.previousElementSibling.classList.add(slide.classList[1]);
            slide.classList.remove(slide.classList[1]);
        }
        else{
            slides[slides.length-1].classList.add(slide.classList[1]);
            slide.classList.remove(slide.classList[1]);
        }
    });
}

document.addEventListener('keydown', function(e) {
    if(sliding==false){
    switch(e.which) {
        case 37: // left
        prevSlide()
        if (auto) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
          }; 
        break;
        case 39: // right
        nextSlide();
        if (auto) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
          }
        break;
        default: return;
    }
}
});

if (auto) {
    // Run next slide at interval time
    slideInterval = setInterval(nextSlide, intervalTime);
  }

// połączyć sliding ze scrolling z fullpagescrolla? (antiSpam)


// RESPONSIVE MENU

const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.querySelector(".navbar ul");
const navbarLinks = document.querySelectorAll(".navbar a");

navbarToggler.addEventListener("click", navbarTogglerClick);

function navbarTogglerClick() {
  navbarToggler.classList.toggle("open-navbar-toggler");
  navbarMenu.classList.toggle("open");
}

navbarLinks.forEach(elem => elem.addEventListener("click", navLinkClick));

function navLinkClick() {
  if(navbarMenu.classList.contains("open")) {
    navbarToggler.click();
  }
}

// const mainNav = document.getElementById("js-menu");
// const navBarToggle = document.getElementById("js-navbar-toggle");

// navBarToggle.addEventListener('click', () =>
//     mainNav.classList.toggle('active')
// );


// PARALLAX HERO

// function parallax(element, distance, speed){
//   const item = document.querySelector(element);

//   item.style.transform = `translateY(-${distance * speed}px)`;

// }

// window.addEventListener('scroll', function(){
//   parallax('#hero-img1', window.scrollY, .1);
//   parallax('#hero-img2', window.scrollY, .5);
//   parallax('#hero-info', window.scrollY, .1);
// })

// FULLPAGE SCROLL 1.0
// function smoothFullPageScroll(){

//   window.addEventListener('wheel', (e)=>{
//     let delta = e.wheelDelta;
//     const startPosition = window.pageYOffset;
//     let distance = 0;
//     const duration = 1000;
//     let start = null;

//     if (delta<1){
//       distance = window.innerHeight;
//     } else{
//       distance = -window.innerHeight;
//     }
  
//   window.requestAnimationFrame(step);

//   function step(timestamp){
//       if(!start) start = timestamp;
//       const progress = timestamp - start;
//       // window.scrollTo(0, distance*(progress/duration) + startPosition);    //linear
//       window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
//       if(progress < duration) window.requestAnimationFrame(step);
//   }
//   })
// }

// smoothFullPageScroll();

// SMOOTH SCROLL

const navLinks = document.querySelectorAll(".nav-links");

navLinks.forEach(elem => elem.addEventListener('click', navbarLinkClick));

function navbarLinkClick(event){
    smoothScroll(event);
}

function smoothScroll(event){
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href") === "#" ? "header" : event.currentTarget.getAttribute("href");
    const targetPosition = document.querySelector(targetId).offsetTop; 
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

// EASING FOR SMOOTH SCROLL

function easeInOutQuad(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};


// MAP

var map, markers = [], pointsDone = [], myInterval, startPoint, endPoint, progress, bounds; // bounds do wywalenia?
const iwContainer = document.getElementById('iw-container');

        //Settings
        var stepSize = 100; //Size of every animation increment
        var stepTime = 1;   //Decrease to speed up

        var mapPoints = [
                {lat:50.9574758, lng:20.4740367, ico:'img/icons/quill-ink.png'},
                {lat:50.9574758, lng:20.4740367, ico:'img/icons/quill-ink.png', content:
                '<hr class="short-hr">'+
                '<h2 class="iw-place">Oblęgorek</h2>' +
                '<div class="iw-heading"><h2>Muzeum H. Sienkiewicza</h2><a href="https://pl.wikipedia.org/wiki/Muzeum_Henryka_Sienkiewicza_w_Obl%C4%99gorku" target="_blank" class="iw-info"><i class="fas fa-info-circle"></i></a></div>' +
                '<img src=img/attractions/Oblęgorek.jpg class="iw-img">' +
                '<p><span class="iw-distance-span">1.</span> kilometr trasy</p>'
                },
                {lat:50.9874838, lng:20.6478957, ico:'img/icons/oak.png', content:
                '<hr class="short-hr">'+
                '<h2 class="iw-place">Zagnańsk</h2>' +
                '<div class="iw-heading"><h2>Dąb Bartek</h2><a href="https://pl.wikipedia.org/wiki/D%C4%85b_Bartek" target="_blank" class="iw-info"><i class="fas fa-info-circle"></i></a></div>' +
                '<img src=img/attractions/Zagnańsk.jpg class="iw-img">' +
                '<p><span class="iw-distance-span">18.</span> kilometr trasy</p>'
                },
                {lat:50.904747, lng:20.7601087, ico:'img/icons/imp.png', content:
                '<hr class="short-hr">'+
                '<h2 class="iw-place">Klonówka</h2>' +
                '<div class="iw-heading"><h2>Diabelski Kamień</h2><a href="https://pl.wikipedia.org/wiki/Diabelski_Kamie%C5%84_(G%C3%B3ry_%C5%9Awi%C4%99tokrzyskie)" target="_blank" class="iw-info"><i class="fas fa-info-circle"></i></a></div>' +
                '<img src=img/attractions/Klonówka.jpg class="iw-img">' +
                '<p><span class="iw-distance-span">38.</span> kilometr trasy</p>'
                },
                {lat:51.075185, lng:21.0130638, ico:'img/icons/monk-face.png', content:
                '<hr class="short-hr">'+
                '<h2 class="iw-place">Wąchock</h2>' +
                '<div class="iw-heading"><h2>Opactwo Cystersów</h2><a href="https://pl.wikipedia.org/wiki/Opactwo_Cysters%C3%B3w_w_W%C4%85chocku" target="_blank" class="iw-info"><i class="fas fa-info-circle"></i></a></div>' +
                '<img src=img/attractions/Wąchock.jpg class="iw-img">' +
                '<p><span class="iw-distance-span">70.</span> kilometr trasy</p>'
                },
                // {lat:51.0493753, lng:21.0660387, ico:'img/chimney6.png', content:'<h1>Starachowice – Wielki Piec</h1>'+'<img src=img/Wielkipiec.jpg class="info-image">'},
                {lat:50.9585754, lng:21.2473663, ico:'img/icons/bell.png', content:
                '<hr class="short-hr">'+
                '<h2 class="iw-place">Kunów</h2>' +
                '<div class="iw-heading"><h2>Dzwonnica</h2><a href="http://www.kunow.pl/art,362,historia.html" target="_blank" class="iw-info"><i class="fas fa-info-circle"></i></a></div>' +
                '<img src=img/attractions/Kunów.jpg class="iw-img">' +
                '<p><span class="iw-distance-span">85.</span> kilometr trasy</p>'
                },
                {lat:51.0170261, lng:21.5465691, ico:'img/icons/diplodocus.png', content:
                '<hr class="short-hr">'+
                '<h2 class="iw-place">Bałtów</h2>' +
                '<div class="iw-heading"><h2>JuraPark</h2><a href="https://pl.wikipedia.org/wiki/JuraPark_Ba%C5%82t%C3%B3w" target="_blank" class="iw-info"><i class="fas fa-info-circle"></i></a></div>' +
                '<img src=img/attractions/Bałtów.jpg class="iw-img">' +
                '<p><span class="iw-distance-span">108.</span> kilometr trasy</p>'
                },
                {lat:50.886216, lng:21.5306813, ico:'img/icons/vase.png', content:
                '<hr class="short-hr">'+
                '<h2 class="iw-place">Ćmielów</h2>' +
                '<div class="iw-heading"><h2>Żywe Muzeum Porcelany</h2><a href="https://pl.wikipedia.org/wiki/%C5%BBywe_Muzeum_Porcelany_w_%C4%86mielowie" target="_blank" class="iw-info"><i class="fas fa-info-circle"></i></a></div>' +
                '<img src=img/attractions/Ćmielów.jpg class="iw-img">' +
                '<p><span class="iw-distance-span">130.</span> kilometr trasy</p>'
                },
                {lat:50.8026259, lng:21.4188986, ico:'img/icons/church.png', content:
                '<hr class="short-hr">'+
                '<h2 class="iw-place">Opatów</h2>' +
                '<div class="iw-heading"><h2>Kolegiata św. Marcina</h2><a href="https://pl.wikipedia.org/wiki/Opat%C3%B3w" target="_blank" class="iw-info"><i class="fas fa-info-circle"></i></a></div>' +
                '<img src=img/attractions/Opatów.jpg class="iw-img">' +
                '<p><span class="iw-distance-span">146.</span> kilometr trasy</p>'
                },
                {lat:50.8590574, lng:21.0441959, ico:'img/icons/crucifix.png', content:
                '<hr class="short-hr">'+
                '<h2 class="iw-place">Święty Krzyż</h2>' +
                '<div class="iw-heading"><h2>Sanktuarium Relikwii Drzewa Krzyża Świętego</h2><a href="https://pl.wikipedia.org/wiki/Bazylika_na_%C5%9Awi%C4%99tym_Krzy%C5%BCu" target="_blank" class="iw-info"><i class="fas fa-info-circle"></i></a></div>' +
                '<img src=img/attractions/ŚwiętyKrzyż.jpg class="iw-img">' +
                '<p><span class="iw-distance-span">186.</span> kilometr trasy</p>'
                },
                {lat:50.8939812, lng:20.8757823, ico:'img/icons/witch-face.png', content:
                '<hr class="short-hr">'+
                '<h2 class="iw-place">Łysica</h2>' +
                '<div class="iw-heading"><h2>Najwyższy szczyt Gór Świętokrzyskich</h2><a href="https://pl.wikipedia.org/wiki/%C5%81ysica_(G%C3%B3ry_%C5%9Awi%C4%99tokrzyskie)" target="_blank" class="iw-info"><i class="fas fa-info-circle"></i></a></div>' +
                '<img src=img/attractions/Łysica.jpg class="iw-img">' +
                '<p><span class="iw-distance-span">206.</span> kilometr trasy</p>'
                },
                {lat:50.8611445, lng:20.6153419, ico:'img/icons/minerals.png', content:
                '<hr class="short-hr">'+
                '<h2 class="iw-place">Kielce</h2>'+
                '<div class="iw-heading"><h2>Rezerwat Przyrody Kadzielnia</h2><a href="https://pl.wikipedia.org/wiki/Rezerwat_przyrody_Kadzielnia" target="_blank" class="iw-info"><i class="fas fa-info-circle"></i></a></div>' +
                '<img src=img/attractions/Kadzielnia.jpg class="iw-img">' +
                '<p><span class="iw-distance-span">244.</span> kilometr trasy</p>'
                },
                // {lat:50.8253422, lng:20.4969425, ico:'img/cave-entrance6.png', content:'<h1>Jaskinia Raj</h1>'+'<img src=img/Jaskiniaraj.jpg class="info-image">'},
                {lat:50.7975983, lng:20.4574498, ico:'img/icons/castle.png', content:
                '<hr class="short-hr">'+
                '<h2 class="iw-place">Chęciny</h2>'+
                '<div class="iw-heading"><h2>Zamek Królewski</h2><a href="https://pl.wikipedia.org/wiki/Ch%C4%99ciny" target="_blank" class="iw-info"><i class="fas fa-info-circle"></i></a></div>' +
                '<img src=img/attractions/Chęciny.jpg class="iw-img">' +
                '<p><span class="iw-distance-span">256.</span> kilometr trasy</p>'
                },
            ];

            
        
       // Map options
        var options = {
                zoom: 10,
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: true,
                draggable: false,
                center: {
                    lat: 50.93767,
                    lng: 21.005873
                },
                styles: [
                    {
                        "featureType": "all",
                        "stylers": [
                            {
                                "saturation": 0
                            },
                            {
                                "hue": "#155f99"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "stylers": [
                            {
                                "saturation": -70
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            },
                            {
                                "saturation": -60
                            }
                        ]
                    }
]
            
            }

        function initMap(){

          // New map
          map = new google.maps.Map(document.getElementById('map-container'), options);
          // bounds = new google.maps.LatLngBounds();

        //   var infoWindow = new google.maps.InfoWindow({
        //     // content: value.content,
        //     disableAutoPan: true,    // nie przesuwa mapy względem IW
        //     // pixelOffset: new google.maps.Size(650,100)
        // });

          
          //Iterate through all points in mapPoints
          mapPoints.forEach(function(value) {
                //create marker
                var myLatLng = new google.maps.LatLng(value.lat, value.lng);
                var iconImage = value.ico;
                
           
                marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    visible: false,
                    icon: iconImage,
                });

            
                markers.push(marker);
            
                marker.addListener('click', function(){
                // let center = {lat: 50.943566, // potrzebne do konkrentej pozycji fixed IW
                //   lng: 20.9227805}
                // infoWindow.setContent(value.content); // tylko 1 IW, zamykają się po pojawieniu nowego
                // // infoWindow.setPosition(center); // set fixed position dla IW
                // infoWindow.open(map, this);  // do standardowego wyświetlania nad markerem; zmieniając 'this' na 'marker', wszystkie iw wyświetlą się na ostatnich coords, więc możliwe jest łatwy offset jw.
                // infoWindow.open(map); // do wyświetlania fixed
                
                

                iwContainer.style.opacity = '0';
                setTimeout(function(){
                  iwContainer.style.opacity = '1';
                  iwContainer.innerHTML = value.content;
                }, 400)
              
            });
        
                //add to bounds and path
                // bounds.extend(myLatLng);
            });

            //Center & zoom map on all mapPoints
            // map.fitBounds(bounds);

            //Add first mapPoint to an array that will keep points that have been animated
            pointsDone.push(new google.maps.LatLng(mapPoints[0].lat, mapPoints[0].lng));
             
       }

       
       
      //Following function gets called one polyline at a time
        function pathAnimation(point) {
            

            //Make marker visible once path has reached that point
            markers[point].setVisible(true);

            //Set start & end point for this polyline
            startPoint = pointsDone[point];
            
            // if potrzebne, by nie było dodatkowego pustego endpoint i błędu js
            if(pointsDone.length<markers.length){
            endPoint = new google.maps.LatLng(mapPoints[point+1].lat, mapPoints[point+1].lng);
            }
            // console.log(pointsDone.length); 
            // console.log(markers.length);

            // Create Symbol
            var lineSymbol = {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                strokeColor: '#fd7400',
            };
            
            //Create the polyline
            myPath = new google.maps.Polyline({
                path: pointsDone,
                geodesic: false,
                strokeColor: '#fd7400',
                strokeOpacity: 1.0,
                strokeWeight: 4,
                map: map,
                icons: [{                       // do ruchomej ikony
                    icon: lineSymbol,
                    offset: '100%'
                }]
            });

            //Add this point to the array keeping points that have already been animated to
            pointsDone.push(endPoint);
            
            //Animation loop
            step = 0;
            myInterval = setInterval(function() {
                step += 1;
                if (step > stepSize) {
                    //Done drawing, clear the interval, and call pathAnimation() again, IF we're not done animating all the polylines
                    clearInterval(myInterval);
                    if(pointsDone.length-1 < mapPoints.length) {
                        pathAnimation(pointsDone.length-1);
                    }
                } 
                
                else {
                    //Not done drawing yet...
                    progress = google.maps.geometry.spherical.interpolate(startPoint,endPoint,step/stepSize);
                    myPath.setPath([startPoint, progress]);
                }
            }, stepTime);

            // changing refresh button to 'active'
            if(pointsDone.length-1 == markers.length){
              refreshActive();
            }
            
        }

        const start = document.getElementById('start');

        function refreshActive(){
          // refreshMap.style.backgroundColor = "#fd7400";
          start.innerHTML = '<i class="fas fa-sync-alt"></i>';
        }

        // Timeout to finish transition

        setTimeout(()=>start.addEventListener('click', function() {
          // 1st 'if' necessary to prevent button spam & crash
          if(pointsDone.length==1){
            pathAnimation(0);
          }
          // finished polylines, restart map
          if(pointsDone.length-1 == markers.length){
            iwContainer.style.opacity = '0'; // znika zewn. div pseudo IW
            start.innerHTML = '<i class="fas fa-biking"></i>';
            markers = [];
            pointsDone = [];
            initMap();
            
          }                       
      }), 1500);

      //   start.addEventListener('click', function() {
      //     // 1st 'if' necessary to prevent button spam & crash
      //     if(pointsDone.length<=1){
      //       pathAnimation(0);
      //     }
      //     if(pointsDone.length-1 == markers.length){
      //       start.innerHTML = '<i class="fas fa-caret-right"></i>';
      //       markers = [];
      //       pointsDone = [];
      //       initMap();
      //     }                       
      // });

        // const refreshMap = document.getElementById('refresh-map');

        
        // refreshMap.addEventListener('click', function() {
        //   if(pointsDone.length-1 == markers.length){
        //         refreshMap.style.backgroundColor = "#2D677C";
        //         markers = [];
        //         pointsDone = [];
        //         initMap();
        //   }                 
        //     });

        // start.addEventListener('click', function() {
        //   if(pointsDone.length-1 == markers.length){
        //     start.innerHTML = '<i class="fas fa-caret-right"></i>';
        //         markers = [];
        //         pointsDone = [];
        //         initMap();
        //   }                 
        //     });

// BACK TO TOP BUTTON

const backToTopButton = document.querySelector("#back-to-top-btn");

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

backToTopButton.addEventListener("click", smoothScrollBackToTop);

// function backToTop() {
//   window.scrollTo(0, 0);
// }

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;
  
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};