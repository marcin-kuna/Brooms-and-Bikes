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


// RPG STAR

const starInfo = document.getElementById('star-info');
const star = document.getElementById('star');

star.addEventListener('click', () =>
    starInfo.classList.toggle('active')
)

// MAP

var map, markers = [], pointsDone = [], bounds, myInterval, startPoint, endPoint, progress;

        //Settings
        var stepSize = 300; //Size of every animation increment
        var stepTime = 4;   //Decrease to speed up

        var mapPoints = [
                {lat:50.9574758, lng:20.4740367, ico:'img/icons/quill6.png'},
                {lat:50.9574758, lng:20.4740367, ico:'img/icons/quill6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Oblęgorek<span class="iw-distance">(1. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Muzeum H. Sienkiewicza</div>' +
                '<div class="iw-content">' +
                  '<img src=img/attractions/Oblęgorek.jpg class="iw-img">' +
                  '<p>W 1900 r. z okazji 25-lecia pracy literackiej dla przyszłego noblisty polskie społeczeństwo zorganizowało zbiórkę na zakup majątku w Oblęgorku i ufundowało go w podziękowaniu za jego pracę. XIX wieczny dworek zbudowany został w stylu eklektycznym w latach 1900-1902 na terenie starego parku. Okolice wokół dworku otacza duży park w stylu angielskim. Muzeum powstało 26 października 1958 roku z inicjatywy dzieci pisarza. Na parterze odtworzony został wygląd i wystrój pomieszczeń z czasów pobytu pisarza. Na piętrze ulokowano ekspozycje poświęcone pisarzowi.</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/Muzeum_Henryka_Sienkiewicza_w_Obl%C4%99gorku" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                {lat:50.9874838, lng:20.6478957, ico:'img/icons/oak6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Zagnańsk<span class="iw-distance">(18. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Dąb Bartek</div>' +
                '<div class="iw-content">' +
                  '<img src=img/attractions/Zagnańsk.jpg class="iw-img">' +
                  '<p>Jeden z najstarszych w Polsce dębów, od 1954 roku chroniony prawem jako pomnik przyrody. W okresie międzywojennym wiek dębu oceniano nawet na 1200 lat. Zgodnie z pomiarami wykonanymi w 2013 roku drzewo ma 28,5 metra wysokości. W 1934 sąd konkursowy pod przewodnictwem profesora Władysława Szafera uznał Bartka za „najokazalsze drzewo w Polsce”. Według jednej z legend Jan III Sobieski i Marysieńka ukryli w Bartku skarby.</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/D%C4%85b_Bartek" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                {lat:50.904747, lng:20.7601087, ico:'img/icons/imp6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Klonówka<span class="iw-distance">(38. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Diabelski Kamień</div>' +
                '<div class="iw-content">' +
                  '<img src=img/attractions/Klonówka.jpg class="iw-img">' +
                  '<p>Okazały fragment kwarcytowej grani skalnej środkowej części Pasma Masłowskiego w Górach Świętokrzyskich. Według legendy, skałę zrzucił diabeł, przelatujący w stronę klasztoru na Świętym Krzyżu. Diabeł nie zdążył zniszczyć klasztoru i upuścił kamień na szczyt góry Klonówki z powodu koguta, który zapiał w pobliskich Mąchocicach. Do tej pory można znaleźć ślady czarcich pazurów na skale.</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/Diabelski_Kamie%C5%84_(G%C3%B3ry_%C5%9Awi%C4%99tokrzyskie)" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                {lat:51.075185, lng:21.0130638, ico:'img/icons/monk-face6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Wąchock<span class="iw-distance">(70. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Opactwo Cystersów<span class="iw-distance"><img src=img/icons/camping-tent.png></span></div>' +
                '<div class="iw-content">' +
                  '<img src=img/attractions/Wąchock.jpg class="iw-img">' +
                  '<p>Opactwo cystersów zostało ufundowane w 1179 roku przez biskupa krakowskiego Gedeona. Mnisi przybyli do Wąchocka w 1179 roku z legendarnym opatem – bratem Haymo. Plan kościoła nawiązuje do tzw. planu bernardyńskiego, czyli plan bazylikowy o trzech nawach, z transeptem i płytkim, prosto zamkniętym prezbiterium. Po raz pierwszy w Polsce zastosowano system sklepień krzyżowo-żebrowych. Od 2011 roku opactwo jest gospodarzem koncertów i międzynarodowych festiwali muzycznych Muzyka w Opactwie Bach u Cystersów. Muzyka rozbrzmiewa w posiadającym doskonałe warunki akustyczne kościele przyklasztornym.</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/Opactwo_Cysters%C3%B3w_w_W%C4%85chocku" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                // {lat:51.0493753, lng:21.0660387, ico:'img/chimney6.png', content:'<h1>Starachowice – Wielki Piec</h1>'+'<img src=img/Wielkipiec.jpg class="info-image">'},
                {lat:50.9585754, lng:21.2473663, ico:'img/icons/bell6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Kunów<span class="iw-distance">(85. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Zabytkowa Dzwonnica</div>' +
                '<div class="iw-content">' +
                  '<img src=img/attractions/Kunów.jpg class="iw-img">' +
                  '<p>Już w XII w. był tu ośrodek administracyjny dla części dóbr biskupów krakowskich. Od XVI stulecia Kunów znany jest w kraju jako ośrodek kamieniarski. Pierwsze wzmianki o parafii św. Władysława pochodzą z 1281 r. Obecny kościół wzniesiony został w stylu późnego renesansu w latach 1625-1637. W wyposażeniu uwagę zwracają ołtarze: XVII w. główny oraz XIX w. boczne, wykonane z piaskowca przez miejscowych kamieniarzy. Przy kościele stoi murowana dzwonnica wzniesiona w 1896 r. wg projektu znanego malarza Wojciecha Gersona.</p>' +
                  '<a href="http://www.kunow.pl/art,362,historia.html" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                {lat:51.0170261, lng:21.5465691, ico:'img/icons/diplodocus6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Bałtów<span class="iw-distance">(108. kilometr trasy)</span></div>' +
                '<div class="iw-title2">JuraPark</div>' +
                '<div class="iw-content">' +
                  '<img src=img/attractions/Bałtów.jpg class="iw-img">' +
                  '<p>Na terenie Bałtowa odkryto tropy górnojurajskich dinozaurów, takich jak m.in. allozaura, stegozaura, kamptozaura i kompsognata. Głównym elementem parku są rekonstrukcje dinozaurów – blisko 100 modeli oryginalnej wielkości, ręcznie wykonanych z wielką dbałością o szczegóły oraz w zgodzie z najnowszymi odkryciami i standardami obowiązującymi w paleontologii przy współpracy z paleoartystami.</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/JuraPark_Ba%C5%82t%C3%B3w" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                {lat:50.886216, lng:21.5306813, ico:'img/icons/vase6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Ćmielów<span class="iw-distance">(130. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Żywe Muzeum Porcelany</div>' +
                '<div class="iw-content">' +
                  '<img src=img/attractions/Ćmielów.jpg class="iw-img">' +
                  '<p>Żywe muzeum zostało otwarte w maju 2005 r. W ramach jego zwiedzania prezentowane są następujące wystawy i ekspozycje: warsztat garncarski wraz z informacjami o historii ćmielowskiego garncarstwa, hala fabryczna wraz z 22-metrowym piecem garncarskim (do niedawna jeszcze czynnym), kilkustanowiskowa prezentacja procesu produkcji porcelany (tworzenie masy porcelanowej, przygotowywanie modelu i formy, odlewanie, zdobienie), Sala Marmurowa z kolekcją współczesnej rzeźby porcelanowej (lata 50. i 60. XX wieku).</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/%C5%BBywe_Muzeum_Porcelany_w_%C4%86mielowie" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                {lat:50.8026259, lng:21.4188986, ico:'img/icons/church6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Opatów<span class="iw-distance">(146. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Kolegiata św. Marcina<span class="iw-distance"><img src=img/icons/camping-tent.png></span></div>' +
                '<div class="iw-content">' +
                  '<img src=img/attractions/Opatów.jpg class="iw-img">' +
                  '<p>Świątynia w stylu romańskim pochodząca z II poł. XII w., w 2006 r. obchodząca 800-lecie nadania statusu kolegiaty; znajduje się w niej szereg unikatowych zabytków, np. odlany z brązu Lament Opatowski, przedstawiający rozpacz 41 mieszkańców Opatowa po śmierci Krzysztofa Szydłowieckiego. Obok nagrobka kanclerza znajduje się także nagrobek jego córki, a także płyty nagrobne dwóch jego synów. Ponadto na ścianach kolegiaty znajdują się malowidła przedstawiające sceny słynnych bitew – odsiecz wiedeńską, Psie Pole i Grunwald. Cenne są również XVIII-wieczne ławki i stalle, a także organy – dzieło sztuki organowej.</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/Opat%C3%B3w" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                {lat:50.8590574, lng:21.0441959, ico:'img/icons/crucifix6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Święty Krzyż<span class="iw-distance">(186. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Sanktuarium Relikwii Drzewa Krzyża Świętego</div>' +
                '<div class="iw-content">' +
                  '<img src=img/attractions/ŚwiętyKrzyż.jpg class="iw-img">' +
                  '<p>Najstarsze polskie sanktuarium, miejsce szczególnego kultu w wieku XV, znajdujące się na Świętym Krzyżu (Łysej Górze). Klasztor i romański kościół ufundowane zostały pomiędzy latami 1102-1138 przez Bolesława Krzywoustego. Początkowo pw. Świętej Trójcy, od XV wieku pw. Świętego Krzyża, po tym, gdy w 1306 książę Władysław Łokietek przekazał łysogórskim benedyktynom relikwie drzewa Krzyża Świętego (przechowywane od XVIII wieku w kaplicy Oleśnickich i wg legendy podarowane przez Emeryka, królewicza z Węgier).</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/Bazylika_na_%C5%9Awi%C4%99tym_Krzy%C5%BCu" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                {lat:50.8939812, lng:20.8757823, ico:'img/icons/witch-face6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Łysica<span class="iw-distance">(206. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Najwyższy szczyt Gór Świętokrzyskich</div>' +
                '<div class="iw-content">' +
                  '<img src=img/attractions/Łysica.jpg class="iw-img">' +
                  '<p>Szczyt o wysokości 614 m n.p.m. Znajduje się w zachodniej części Łysogór, na południowy wschód od wsi Święta Katarzyna. Należy do Korony Gór Polski. Znajduje się w obszarze ochrony ścisłej Świętokrzyskiego Parku Narodowego. Od strony północnej i południowej szczyt otaczają gołoborza. Łysica jest całkowicie porośnięta lasem. Podania mówią, że u podnóża Łysicy istniała kiedyś pogańska świątynia, na miejscu której obecnie znajduje się klasztor sióstr bernardynek.</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/%C5%81ysica_(G%C3%B3ry_%C5%9Awi%C4%99tokrzyskie)" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                {lat:50.8611445, lng:20.6153419, ico:'img/icons/minerals6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Kielce<span class="iw-distance">(244. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Rezerwat przyrody Kadzielnia</div>' +
                '<div class="iw-content">' +
                  '<img src=img/attractions/Kadzielnia.jpg class="iw-img">' +
                  '<p>Rezerwat ścisły przyrody nieożywionej znajdujący się na terenie miasta Kielce. Skalne wzgórze Kadzielni zbudowane jest z wapieni górnodewońskich, głównie franu, a w wyższej części także famenu. Występują tu liczne skamieniałości koralowców, stromatoporoidów, trylobitów, łodzikowatych i innych zwierząt morskich sprzed 350 mln lat. Do cenniejszych znalezisk paleontologicznych należą ryby pancerne. Można tu zaobserwować liczne zjawiska tektoniczne, mineralizacyjne i różne formy krasowe. Na terenie rezerwatu, w Skałce Geologów, znajduje się kilkanaście niewielkich jaskiń.</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/Rezerwat_przyrody_Kadzielnia" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                // {lat:50.8253422, lng:20.4969425, ico:'img/cave-entrance6.png', content:'<h1>Jaskinia Raj</h1>'+'<img src=img/Jaskiniaraj.jpg class="info-image">'},
                {lat:50.7975983, lng:20.4574498, ico:'img/icons/castle6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Chęciny<span class="iw-distance">(256. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Zamek Królewski<span class="iw-distance"><img src=img/icons/camping-tent.png></span></div>' +
                '<div class="iw-content">' +
                  '<img src=img/attractions/Chęciny.jpg class="iw-img">' +
                  '<p>Budowę fortecy rozpoczęto prawdopodobnie około 1295-1300 roku. Wówczas została zbudowana górna część Zamku, składającą się z dwóch cylindrycznych baszt obronnych i dziedzińca. Zamek odegrał ważną rolę jako miejsce koncentracji wojsk wyruszających na wojnę z Krzyżakami. Właśnie z tego miejsca w 1331 roku wyruszono na bitwę pod Płowcami. Warownia dzieli się na dwie części: zamek górny, położony między dwiema basztami z murem o grubości 2 m oraz zamek dolny tzw. Przygródek, z obszernym dziedzińcem zakończonym skośną, czworokątną basztą z XV wieku i furtką sklepioną w gotycki łuk.</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/Ch%C4%99ciny" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
            ];

            
        
       // Map options
        var options = {
                zoom: 11,
                center: {
                    lat: 50.943566,
                    lng: 20.9227805
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
          map = new google.maps.Map(document.getElementById('map'), options);
          bounds = new google.maps.LatLngBounds();


            

          //Iterate through all points in mapPoints
          mapPoints.forEach(function(value) {
                //create marker
                var myLatLng = new google.maps.LatLng(value.lat, value.lng);
                var iconImage = value.ico;
                var infoWindow = new google.maps.InfoWindow({
                content: value.content,
                // pixelOffset: new google.maps.Size(400,150)
            });
           
               
                
                marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    visible: false,
                    icon: iconImage,
                });

            
                markers.push(marker);
            
                marker.addListener('click', function(){
                infoWindow.open(map, this); // zmieniając 'this' na 'marker', wszystkie iw wyświetlą się na ostatnich coords, więc możliwe jest łatwy oofset jw.
            });
        
                //add to bounds and path
                bounds.extend(myLatLng);
            });

            //Center & zoom map on all mapPoints
            map.fitBounds(bounds);

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
                strokeWeight: 5,
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
        }
    
        // function kilometres(){
        //     setTimeout(function(){
        //         let distance = 0;
        //         theLabel = document.getElementById("counter");
        //         let interval = setInterval(function(){ 
        //             if (distance === 200) clearInterval(interval);
        //             theLabel.innerHTML = distance; 
        //             distance++;
        //             }, 65);}, 1500);
        // }
        
        document.getElementById("start").addEventListener('click', function() {
                pathAnimation(0);
                // kilometres();
            });

// podobno ma zapobiec niezaładowaniu mapy
// document.addEventListener('DOMContentLoaded', initMap());

// BOOKING SECTION


// GALLERY SECTION

const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = false; // Auto scroll
const intervalTime = 5000;
let slideInterval;

console.log(slides); 

const nextSlide = () => {
  // Get current class
  const current = document.querySelector('.current');
  // Remove current class
  current.classList.remove('current');
  // Check for next slide
  if (current.nextElementSibling) {
    // Add current to next sibling
    current.nextElementSibling.classList.add('current');
  } else {
    // Add current to start
    slides[0].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

const prevSlide = () => {
  // Get current class
  const current = document.querySelector('.current');
  // Remove current class
  current.classList.remove('current');
  // Check for prev slide
  if (current.previousElementSibling) {
    // Add current to prev sibling
    current.previousElementSibling.classList.add('current');
  } else {
    // Add current to last
    slides[slides.length - 1].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

// Button events
next.addEventListener('click', e => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prev.addEventListener('click', e => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

// Auto slide
if (auto) {
    // Run next slide at interval time
    slideInterval = setInterval(nextSlide, intervalTime);
  }

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