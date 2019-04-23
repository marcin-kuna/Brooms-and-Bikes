var map, markers = [], pointsDone = [], bounds, myInterval, startPoint, endPoint, progress;

        //Settings
        var stepSize = 300; //Size of every animation increment
        var stepTime = 4;   //Decrease to speed up

        var mapPoints = [
                {lat:50.9574758, lng:20.4740367, ico:'img/quill6.png'},
                {lat:50.9574758, lng:20.4740367, ico:'img/quill6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Oblęgorek<span class="iw-distance">(1. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Muzeum H. Sienkiewicza</div>' +
                '<div class="iw-content">' +
                  '<img src=img/Oblęgorek.jpg class="iw-img">' +
                  '<p>W 1900 r. z okazji 25-lecia pracy literackiej dla przyszłego noblisty polskie społeczeństwo zorganizowało zbiórkę na zakup majątku w Oblęgorku i ufundowało go w podziękowaniu za jego pracę. XIX wieczny dworek zbudowany został w stylu eklektycznym w latach 1900-1902 na terenie starego parku. Okolice wokół dworku otacza duży park w stylu angielskim. Muzeum powstało 26 października 1958 roku z inicjatywy dzieci pisarza. Na parterze odtworzony został wygląd i wystrój pomieszczeń z czasów pobytu pisarza. Na piętrze ulokowano ekspozycje poświęcone pisarzowi.</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/Muzeum_Henryka_Sienkiewicza_w_Obl%C4%99gorku" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                {lat:50.9874838, lng:20.6478957, ico:'img/oak6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Zagnańsk<span class="iw-distance">(18. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Dąb Bartek</div>' +
                '<div class="iw-content">' +
                  '<img src=img/Zagnańsk.jpg class="iw-img">' +
                  '<p>Jeden z najstarszych w Polsce dębów, od 1954 roku chroniony prawem jako pomnik przyrody. W okresie międzywojennym wiek dębu oceniano nawet na 1200 lat. Zgodnie z pomiarami wykonanymi w 2013 roku drzewo ma 28,5 metra wysokości. W 1934 sąd konkursowy pod przewodnictwem profesora Władysława Szafera uznał Bartka za „najokazalsze drzewo w Polsce”. Według jednej z legend Jan III Sobieski i Marysieńka ukryli w Bartku skarby.</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/D%C4%85b_Bartek" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                {lat:50.904747, lng:20.7601087, ico:'img/imp6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Klonówka<span class="iw-distance">(38. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Diabelski Kamień</div>' +
                '<div class="iw-content">' +
                  '<img src=img/Klonówka.jpg class="iw-img">' +
                  '<p>Okazały fragment kwarcytowej grani skalnej środkowej części Pasma Masłowskiego w Górach Świętokrzyskich. Według legendy, skałę zrzucił diabeł, przelatujący w stronę klasztoru na Świętym Krzyżu. Diabeł nie zdążył zniszczyć klasztoru i upuścił kamień na szczyt góry Klonówki z powodu koguta, który zapiał w pobliskich Mąchocicach. Do tej pory można znaleźć ślady czarcich pazurów na skale.</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/Diabelski_Kamie%C5%84_(G%C3%B3ry_%C5%9Awi%C4%99tokrzyskie)" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                {lat:51.075185, lng:21.0130638, ico:'img/monk-face6.png', content:
                '<div id="iw-container">' +
                '<div class="iw-title1">Wąchock<span class="iw-distance">(70. kilometr trasy)</span></div>' +
                '<div class="iw-title2">Opactwo Cystersów<span class="iw-distance"><img src=img/camping-tent.png></span></div>' +
                '<div class="iw-content">' +
                  '<img src=img/Wąchock.jpg class="iw-img">' +
                  '<p>Opactwo cystersów zostało ufundowane w 1179 roku przez biskupa krakowskiego Gedeona. Mnisi przybyli do Wąchocka w 1179 roku z legendarnym opatem – bratem Haymo. Plan kościoła nawiązuje do tzw. planu bernardyńskiego, czyli plan bazylikowy o trzech nawach, z transeptem i płytkim, prosto zamkniętym prezbiterium. Po raz pierwszy w Polsce zastosowano system sklepień krzyżowo-żebrowych. Od 2011 roku opactwo jest gospodarzem koncertów i międzynarodowych festiwali muzycznych Muzyka w Opactwie Bach u Cystersów. Muzyka rozbrzmiewa w posiadającym doskonałe warunki akustyczne kościele przyklasztornym.</p>' +
                  '<a href="https://pl.wikipedia.org/wiki/Opactwo_Cysters%C3%B3w_w_W%C4%85chocku" target="_blank" class="link">Więcej informacji...</a>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>'},
                // {lat:51.0493753, lng:21.0660387, ico:'img/chimney6.png', content:'<h1>Starachowice – Wielki Piec</h1>'+'<img src=img/Wielkipiec.jpg class="info-image">'},
                {lat:50.9585754, lng:21.2473663, ico:'img/bell6.png', content:'<h1>Kunów – Dzwonnica wg projektu W. Gersona</h1>'+'<img src=img/Kunow.jpg class="info-image">'},
                {lat:51.0170261, lng:21.5465691, ico:'img/diplodocus6.png', content:'<h1>Bałtów – JuraPark</h1>'+'<img src=img/Baltow.jpg class="info-image">'},
                {lat:50.886216, lng:21.5306813, ico:'img/vase6.png', content:'<h1>Ćmielów – Żywe Muzeum Porcelany</h1>'+'<img src=img/Cmielow.jpg class="info-image">'},
                {lat:50.8026259, lng:21.4188986, ico:'img/church6.png', content:'<h1>Opatów – Kolegiata św. Marcina</h1>'+'<img src=img/Opatów.jpg class="info-image">'},
                {lat:50.8590574, lng:21.0441959, ico:'img/crucifix6.png', content:'<h1>Święty Krzyż</h1>'+'<img src=img/SwietyKrzyz.jpg class="info-image">'},
                {lat:50.8939812, lng:20.8757823, ico:'img/witch-face6.png', content:'<h1>Łysica</h1>'+'<img src=img/Lysica.jpg class="info-image">'},
                {lat:50.8611445, lng:20.6153419, ico:'img/minerals6.png', content:'<h1>Kielce – Rezerwat Kadzielnia</h1>'+'<img src=img/Kadzielnia.jpg class="info-image">'},
                // {lat:50.8253422, lng:20.4969425, ico:'img/cave-entrance6.png', content:'<h1>Jaskinia Raj</h1>'+'<img src=img/Jaskiniaraj.jpg class="info-image">'},
                {lat:50.7975983, lng:20.4574498, ico:'img/castle6.png', content:'<h1>Chęciny – Zamek Królewski</h1>'+'<img src=img/Chęciny.jpg class="info-image">'},
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
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#aee2e0"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#abce83"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#769e72"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7B8758"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#EBF4A4"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#8dab68"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#5B5B3F"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ABCE83"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#A4C67D"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#9BBF72"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#EBF4A4"
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
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#87ae79"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#7f2200"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "on"
            },
            {
                "weight": 4.1
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#495421"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
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
            endPoint = new google.maps.LatLng(mapPoints[point+1].lat, mapPoints[point+1].lng);

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

          
            // setTimeout(function(){ alert("Hello"); }, 15000);
        }

        function kilometres(){
            setTimeout(function(){
                let distance = 0;
                theLabel = document.getElementById("counter");
                let interval = setInterval(function(){ 
                    if (distance === 200) clearInterval(interval);
                    theLabel.innerHTML = distance; 
                    distance++;
                    }, 65);}, 1500);
        }
        
        document.getElementById("start").addEventListener('click', function() {
                pathAnimation(0);
                kilometres();
            });
