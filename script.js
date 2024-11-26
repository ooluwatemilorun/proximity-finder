(function () {
    var zoomLevel = 14,
      mapCenter = [52.2, 21];
  
    var options2 = {
      center: mapCenter,
      zoom: zoomLevel
    };
  
    var map = L.map("map", options2);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    var points2,
      $body = $("body"),
      $locate = $("#locate"),
      $fire = $("#fire");
  
    function createAnotherIcon(feature, latlng) {
      let myIcon = L.icon({
        iconUrl: "fire-station.png",
        iconSize: [35, 35],
        iconAnchor: [12, 12],
        popupAnchor: [0, 0]
      });
      return L.marker(latlng, { icon: myIcon });
    }
  
    // create an options object that specifies which function will be called on each feature
    let myFireOptions = {
      pointToLayer: createAnotherIcon
    };
    // fire station location Geojson
    var fireStations = [
      {
        type: "FeatureCollection",
        name: "Fire Stations",
        features: [
          {
            type: "Feature",
            properties: { name: "001" },
            geometry: {
              type: "Point",
              coordinates: [22.86699819, 52.988353069999988]
            }
          },
          {
            type: "Feature",
            properties: { name: "002" },
            geometry: {
              type: "Point",
              coordinates: [23.28754438, 50.71254832]
            }
          },
          {
            type: "Feature",
            properties: { name: "003" },
            geometry: {
              type: "Point",
              coordinates: [18.99818037, 50.21137801]
            }
          },
          {
            type: "Feature",
            properties: { name: "004" },
            geometry: {
              type: "Point",
              coordinates: [18.29042268, 50.514845140000013]
            }
          },
          {
            type: "Feature",
            properties: { name: "005" },
            geometry: {
              type: "Point",
              coordinates: [18.4134164, 50.880762299999986]
            }
          },
          {
            type: "Feature",
            properties: { name: "006" },
            geometry: {
              type: "Point",
              coordinates: [17.329402874027927, 50.47137455]
            }
          },
          {
            type: "Feature",
            properties: { name: "007" },
            geometry: {
              type: "Point",
              coordinates: [18.151338813593519, 50.3321404]
            }
          },
          {
            type: "Feature",
            properties: { name: "008" },
            geometry: {
              type: "Point",
              coordinates: [19.447730039877733, 51.75910585]
            }
          },
          {
            type: "Feature",
            properties: { name: "009" },
            geometry: {
              type: "Point",
              coordinates: [21.78217682, 54.03683149]
            }
          },
          {
            type: "Feature",
            properties: { name: "010" },
            geometry: {
              type: "Point",
              coordinates: [16.11728784, 52.11668652]
            }
          },
          {
            type: "Feature",
            properties: { name: "011" },
            geometry: {
              type: "Point",
              coordinates: [14.771918323035596, 53.378365450000011]
            }
          },
          {
            type: "Feature",
            properties: { name: "012" },
            geometry: {
              type: "Point",
              coordinates: [21.19075727, 50.56153109]
            }
          },
          {
            type: "Feature",
            properties: { name: "013" },
            geometry: {
              type: "Point",
              coordinates: [16.678992985940937, 53.71251245]
            }
          },
          {
            type: "Feature",
            properties: { name: "014" },
            geometry: {
              type: "Point",
              coordinates: [14.5054973, 53.4481634]
            }
          },
          {
            type: "Feature",
            properties: { name: "015" },
            geometry: {
              type: "Point",
              coordinates: [16.2133046, 54.1979356]
            }
          },
          {
            type: "Feature",
            properties: { name: "016" },
            geometry: {
              type: "Point",
              coordinates: [15.1744235, 53.9243016]
            }
          },
          {
            type: "Feature",
            properties: { name: "017" },
            geometry: {
              type: "Point",
              coordinates: [15.03618702, 53.342814569999987]
            }
          },
          {
            type: "Feature",
            properties: { name: "018" },
            geometry: {
              type: "Point",
              coordinates: [23.28754438, 50.71254832]
            }
          },
          {
            type: "Feature",
            properties: { name: "019" },
            geometry: {
              type: "Point",
              coordinates: [15.41358515, 53.16568253]
            }
          },
          {
            type: "Feature",
            properties: { name: "020" },
            geometry: {
              type: "Point",
              coordinates: [21.751444, 50.6985605]
            }
          },
        ]
      }
    ];
  
    {
      //script based on https://bl.ocks.org/rgdonohue/0598de175f591803fa97d65d8330f40d
  
      points2 = L.geoJson(fireStations, myFireOptions).addTo(map);
      $locate.fadeIn().on("click", function (e) {
        if (!navigator.geolocation) {
          alert("<p>Sorry, your browser does not support Geolocation</p>");
          return;
        }
  
        $body.removeClass("loaded");
  
        navigator.geolocation.getCurrentPosition(success2, error2);
  
        $locate.fadeOut();
      });
  
      function success2(position2) {
        var currentPos2 = [position2.coords.latitude, position2.coords.longitude];
  
        map.setView(currentPos2, zoomLevel);
  
        var myLocation2 = L.marker(currentPos2)
          .addTo(map)
          .bindTooltip("HELP ME!")
          .openTooltip();
  
        $fire.fadeIn().on("click", function (e) {
          $fire.fadeOut();
  
          queryFeatures2(currentPos2, 1);
  
          myLocation2.unbindTooltip();
        });
      }
  
      function error2() {
        alert("Unable to retrieve your location");
      }
  
      function queryFeatures2(currentPos2, numResults2) {
        var distances2 = [];
  
        points2.eachLayer(function (l) {
          var distance2 = L.latLng(currentPos2).distanceTo(l.getLatLng()) / 1000;
  
          distances2.push(distance2);
        });
  
        distances2.sort(function (a, b) {
          return a - b;
        });
  
        var pointsLayer2 = L.featureGroup();
  
        points2.eachLayer(function (l) {
          var distance2 = L.latLng(currentPos2).distanceTo(l.getLatLng()) / 1000;
          var time2 = Math.floor(distance2 / 0.75);
          var timeH2 = Math.floor(distance2 / 2.5 + 3);
  
          //comparing distance from the nearest fire station
          if (distance2 < distances2[numResults2]) {
            if (distance2 > 6) {
              l.bindTooltip(
                "You are " +
                  distance2.toLocaleString() +
                  " km far away from the nearest fire station. ETA: approx " +
                  timeH2 +
                  " minutes"
              );
            } 
            else {
              l.bindTooltip(
                "Distance: " +
                  distance2.toLocaleString() +
                  " km. Fire Service will arrive in approx " +
                  time2.toLocaleString() +
                  " minutes"
              );
            }
  
            L.polyline([currentPos2, l.getLatLng()], {
              color: "blue",
              weight: 2
            }).addTo(pointsLayer2);
          }
        });
  
        map.flyToBounds(pointsLayer2.getBounds(), {
          duration: 3,
          easeLinearity: 0.1
        });
  
        map.on("zoomend", function () {
          map.addLayer(pointsLayer2);
        });
      }
    }
  })();
  