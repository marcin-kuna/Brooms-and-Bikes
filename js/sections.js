// CHOICE

const choiceBtn = document.querySelector('.choices__btn');
const choice1Slide = document.querySelectorAll('.level-1-slide'); 
const choice2Slide = document.querySelectorAll('.level-2-slide'); 
const choice3Slide = document.querySelectorAll('.level-3-slide'); 

function showChoice() { 
    choice1Slide.forEach(element => {element.classList.add('slider');})
    choiceBtn.removeEventListener('click', showChoice); 
}

choiceBtn.addEventListener('click', showChoice);

const greenBtns = document.querySelectorAll('.levels__btns--green');
const yellowBtns = document.querySelectorAll('.levels__btns--yellow');
const redBtns = document.querySelectorAll('.levels__btns--red');

greenBtns.forEach(element => {
    element.addEventListener('click', () => {
      choice1Slide.forEach(element => {element.classList.add('slider');})
      choice2Slide.forEach(element => {element.classList.remove('slider');})
      choice3Slide.forEach(element => {element.classList.remove('slider');})
    })
});

yellowBtns.forEach(element => {
    element.addEventListener('click', () => {
      choice1Slide.forEach(element => {element.classList.remove('slider');})
      choice2Slide.forEach(element => {element.classList.add('slider');})
      choice3Slide.forEach(element => {element.classList.remove('slider');})
    })
});

redBtns.forEach(element => {
    element.addEventListener('click', () => {
      choice1Slide.forEach(element => {element.classList.remove('slider');})
      choice2Slide.forEach(element => {element.classList.remove('slider');})
      choice3Slide.forEach(element => {element.classList.add('slider');})
    })
});

// GALLERY

let slides = document.querySelectorAll('.slide');
let sliding = false;
let auto = false; //  Auto scroll
const intervalTime = 2000;
let slideInterval;

function antiSpam() {
    sliding = true;
    setTimeout(() => {
      sliding = false;
    }, 500)
}

function prevSlide() {
  antiSpam();

  slides.forEach((slide) => {
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

function nextSlide() {
  antiSpam();

  slides.forEach((slide) => {
      if(slide.previousElementSibling) {
        slide.previousElementSibling.classList.add(slide.classList[1]);
        slide.classList.remove(slide.classList[1]);
      }
      else {
        slides[slides.length-1].classList.add(slide.classList[1]);
        slide.classList.remove(slide.classList[1]);
      }
  });
}


// Scrolling gallery /w arrow keys
document.addEventListener('keydown', function(e) {
    if(sliding == false) {
      switch(e.which) {
        case 37: // left
        prevSlide()
        autoScrollLeft();
        break;
        case 39: // right
        nextSlide();
        autoScrollRight()
        break;
        default: return;
      }
    }
});

// Button events
next.addEventListener('click', e => {
    nextSlide();
    autoScrollRight()
});

prev.addEventListener('click', e => {
    prevSlide();
    autoScrollLeft();
});

function autoScrollLeft() {
    if(auto) {
      clearInterval(slideInterval);
      slideInterval = setInterval(prevSlide, intervalTime);
    }
}

function autoScrollRight() {
    if (auto) {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
    }
}

// autoScroll off on slide click
Array.from(slides).forEach((slide) => {
    if(auto == true) {
    slide.addEventListener('click', function(){
      clearInterval(slideInterval);
      slideInterval = 0;
    })}
});

// MAP

let map, markers = [], pointsDone = [], myInterval, startPoint, endPoint, progress;
const iwContainer = document.querySelector('.infowindow');

//Settings
const stepSize = 100; //  Size of every animation increment
const stepTime = 5;   //  Decrease to speed up

const mapPoints = [
    {lat:50.9574758, lng:20.4740367, ico:'img/map-icons/quill-ink.png'},
    {lat:50.9574758, lng:20.4740367, ico:'img/map-icons/quill-ink.png', content:
    '<hr class="short-hr">'+
    '<h2 class="infowindow__heading">Oblęgorek</h2>' +
    '<div class="infowindow__sights"><h2>Muzeum Sienkiewicza</h2><a href="https://pl.wikipedia.org/wiki/Muzeum_Henryka_Sienkiewicza_w_Obl%C4%99gorku" target="_blank" class="infowindow__link"><i class="fas fa-info-circle"></i></a></div>' +
    '<img src=img/sights/Oblęgorek.jpg class="infowindow__image">' +
    '<p><span class="infowindow__distance-span">1.</span> kilometr trasy</p>'
    },
    {lat:50.9874838, lng:20.6478957, ico:'img/map-icons/oak.png', content:
    '<hr class="short-hr">'+
    '<h2 class="infowindow__heading">Zagnańsk</h2>' +
    '<div class="infowindow__sights"><h2>Dąb Bartek</h2><a href="https://pl.wikipedia.org/wiki/D%C4%85b_Bartek" target="_blank" class="infowindow__link"><i class="fas fa-info-circle"></i></a></div>' +
    '<img src=img/sights/Zagnańsk.jpg class="infowindow__image">' +
    '<p><span class="infowindow__distance-span">18.</span> kilometr trasy</p>'
    },
    {lat:50.904747, lng:20.7601087, ico:'img/map-icons/imp.png', content:
    '<hr class="short-hr">'+
    '<h2 class="infowindow__heading">Klonówka</h2>' +
    '<div class="infowindow__sights"><h2>Diabelski Kamień</h2><a href="https://pl.wikipedia.org/wiki/Diabelski_Kamie%C5%84_(G%C3%B3ry_%C5%9Awi%C4%99tokrzyskie)" target="_blank" class="infowindow__link"><i class="fas fa-info-circle"></i></a></div>' +
    '<img src=img/sights/Klonówka.jpg class="infowindow__image">' +
    '<p><span class="infowindow__distance-span">38.</span> kilometr trasy</p>'
    },
    {lat:51.075185, lng:21.0130638, ico:'img/map-icons/monk-face.png', content:
    '<hr class="short-hr">'+
    '<h2 class="infowindow__heading">Wąchock</h2>' +
    '<div class="infowindow__sights"><h2>Opactwo Cystersów</h2><a href="https://pl.wikipedia.org/wiki/Opactwo_Cysters%C3%B3w_w_W%C4%85chocku" target="_blank" class="infowindow__link"><i class="fas fa-info-circle"></i></a></div>' +
    '<img src=img/sights/Wąchock.jpg class="infowindow__image">' +
    '<p><span class="infowindow__distance-span">70.</span> kilometr trasy</p>'
    },
    // {lat:51.0493753, lng:21.0660387, ico:'img/chimney6.png', content:'<h1>Starachowice – Wielki Piec</h1>'+'<img src=img/Wielkipiec.jpg class="info-image">'},
    {lat:50.9585754, lng:21.2473663, ico:'img/map-icons/bell.png', content:
    '<hr class="short-hr">'+
    '<h2 class="infowindow__heading">Kunów</h2>' +
    '<div class="infowindow__sights"><h2>Dzwonnica</h2><a href="http://www.kunow.pl/art,362,historia.html" target="_blank" class="infowindow__link"><i class="fas fa-info-circle"></i></a></div>' +
    '<img src=img/sights/Kunów.jpg class="infowindow__image">' +
    '<p><span class="infowindow__distance-span">85.</span> kilometr trasy</p>'
    },
    {lat:51.0170261, lng:21.5465691, ico:'img/map-icons/diplodocus.png', content:
    '<hr class="short-hr">'+
    '<h2 class="infowindow__heading">Bałtów</h2>' +
    '<div class="infowindow__sights"><h2>JuraPark</h2><a href="https://pl.wikipedia.org/wiki/JuraPark_Ba%C5%82t%C3%B3w" target="_blank" class="infowindow__link"><i class="fas fa-info-circle"></i></a></div>' +
    '<img src=img/sights/Bałtów.jpg class="infowindow__image">' +
    '<p><span class="infowindow__distance-span">108.</span> kilometr trasy</p>'
    },
    {lat:50.886216, lng:21.5306813, ico:'img/map-icons/vase.png', content:
    '<hr class="short-hr">'+
    '<h2 class="infowindow__heading">Ćmielów</h2>' +
    '<div class="infowindow__sights"><h2>Żywe Muzeum Porcelany</h2><a href="https://pl.wikipedia.org/wiki/%C5%BBywe_Muzeum_Porcelany_w_%C4%86mielowie" target="_blank" class="infowindow__link"><i class="fas fa-info-circle"></i></a></div>' +
    '<img src=img/sights/Ćmielów.jpg class="infowindow__image">' +
    '<p><span class="infowindow__distance-span">130.</span> kilometr trasy</p>'
    },
    {lat:50.8026259, lng:21.4188986, ico:'img/map-icons/church.png', content:
    '<hr class="short-hr">'+
    '<h2 class="infowindow__heading">Opatów</h2>' +
    '<div class="infowindow__sights"><h2>Kolegiata św. Marcina</h2><a href="https://pl.wikipedia.org/wiki/Opat%C3%B3w" target="_blank" class="infowindow__link"><i class="fas fa-info-circle"></i></a></div>' +
    '<img src=img/sights/Opatów.jpg class="infowindow__image">' +
    '<p><span class="infowindow__distance-span">146.</span> kilometr trasy</p>'
    },
    {lat:50.8590574, lng:21.0441959, ico:'img/map-icons/crucifix.png', content:
    '<hr class="short-hr">'+
    '<h2 class="infowindow__heading">Św. Krzyż</h2>' +
    '<div class="infowindow__sights"><h2>Sanktuarium</h2><a href="https://pl.wikipedia.org/wiki/Bazylika_na_%C5%9Awi%C4%99tym_Krzy%C5%BCu" target="_blank" class="infowindow__link"><i class="fas fa-info-circle"></i></a></div>' +
    '<img src=img/sights/ŚwiętyKrzyż.jpg class="infowindow__image">' +
    '<p><span class="infowindow__distance-span">186.</span> kilometr trasy</p>'
    },
    {lat:50.8939812, lng:20.8757823, ico:'img/map-icons/witch-face.png', content:
    '<hr class="short-hr">'+
    '<h2 class="infowindow__heading">Łysica</h2>' +
    '<div class="infowindow__sights"><h2>Najwyższy szczyt</h2><a href="https://pl.wikipedia.org/wiki/%C5%81ysica_(G%C3%B3ry_%C5%9Awi%C4%99tokrzyskie)" target="_blank" class="infowindow__link"><i class="fas fa-info-circle"></i></a></div>' +
    '<img src=img/sights/Łysica.jpg class="infowindow__image">' +
    '<p><span class="infowindow__distance-span">206.</span> kilometr trasy</p>'
    },
    {lat:50.8611445, lng:20.6153419, ico:'img/map-icons/minerals.png', content:
    '<hr class="short-hr">'+
    '<h2 class="infowindow__heading">Kielce</h2>'+
    '<div class="infowindow__sights"><h2>Rezerwat Kadzielnia</h2><a href="https://pl.wikipedia.org/wiki/Rezerwat_przyrody_Kadzielnia" target="_blank" class="infowindow__link"><i class="fas fa-info-circle"></i></a></div>' +
    '<img src=img/sights/Kadzielnia.jpg class="infowindow__image">' +
    '<p><span class="infowindow__distance-span">244.</span> kilometr trasy</p>'
    },
    // {lat:50.8253422, lng:20.4969425, ico:'img/cave-entrance6.png', content:'<h1>Jaskinia Raj</h1>'+'<img src=img/Jaskiniaraj.jpg class="info-image">'},
    {lat:50.7975983, lng:20.4574498, ico:'img/map-icons/castle.png', content:
    '<hr class="short-hr">'+
    '<h2 class="infowindow__heading">Chęciny</h2>'+
    '<div class="infowindow__sights"><h2>Zamek Królewski</h2><a href="https://pl.wikipedia.org/wiki/Ch%C4%99ciny" target="_blank" class="infowindow__link"><i class="fas fa-info-circle"></i></a></div>' +
    '<img src=img/sights/Chęciny.jpg class="infowindow__image">' +
    '<p><span class="infowindow__distance-span">256.</span> kilometr trasy</p>'
    }
];
        
// Map options
const options = {
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

function initMap() {
    // New map
    map = new google.maps.Map(document.querySelector('.map-container'), options);

    //Iterate through all points in mapPoints
    mapPoints.forEach(function(value){
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
            iwContainer.style.opacity = '0';
            setTimeout(function(){
              iwContainer.style.opacity = '1';
              iwContainer.innerHTML = value.content;
            }, 400)
        });
    });

    //Add first mapPoint to an array that will keep points that have been animated
    pointsDone.push(new google.maps.LatLng(mapPoints[0].lat, mapPoints[0].lng)); 
}

//Following function gets called one polyline at a time
function pathAnimation(point) {
    
    //Make marker visible once path has reached that point
    markers[point].setVisible(true);

    //Set start & end point for this polyline
    startPoint = pointsDone[point];
    
    //No empty end point crash
    if(pointsDone.length<markers.length) {
        endPoint = new google.maps.LatLng(mapPoints[point+1].lat, mapPoints[point+1].lng);
    }

    // Create Symbol
    const lineSymbol = {
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
        icons: [{                       //Moving icon
          icon: lineSymbol,
          offset: '100%'
        }]
    });

    //Add this point to the array keeping points that have already been animated to
    pointsDone.push(endPoint);
    
    //Animation loop
    step = 0;
    myInterval = setInterval(() => {
        step += 1;
        if (step > stepSize) {
            //Done drawing, clear the interval, and call pathAnimation() again, IF we're not done animating all the polylines
            clearInterval(myInterval);
            if(pointsDone.length-1 < mapPoints.length){
                pathAnimation(pointsDone.length-1);
            }
        } 
        else {
            //Not done drawing yet...
            progress = google.maps.geometry.spherical.interpolate(startPoint,endPoint,step/stepSize);
            myPath.setPath([startPoint, progress]);
        }
    }, stepTime);

    //Changing refresh button to 'active'
    if(pointsDone.length-1 == markers.length) {
        refreshActive();
    }
}

const start = document.querySelector('.map-start');

function refreshActive() {
    start.innerHTML = '<i class="fas fa-sync-alt"></i>';
}

// Timeout to finish transition
setTimeout(() => start.addEventListener('click', () => {
    // Prevent button spam & crash
    if(pointsDone.length == 1) {
        pathAnimation(0);
    }
    // Finished polylines, restart map
    if(pointsDone.length-1 == markers.length) {
        iwContainer.style.opacity = '0'; // Hiding infowindow
        start.innerHTML = '<i class="fas fa-biking"></i>';
        markers = [];
        pointsDone = [];
        initMap();
    }                       
}), 1500);


