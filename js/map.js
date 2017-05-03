    /* getElement from html files */
var onbtn_markers = document.getElementById("btn_markers");
var onbtn_redcircles = document.getElementById("btn_redcircles");
var onbtn_orangecircles = document.getElementById("btn_orangecircles");
var onbtn_yellowcircles = document.getElementById("btn_yellowcircles");
var onbtn_all = document.getElementById("btn_all");

var mymap = L.map('mapid').setView([32.7157, -117.1611], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    			maxZoom: 18,
    			id: 'your.mapbox.project.id',
    			accessToken: 'your.mapbox.public.access.token'
			}).addTo(mymap); 

/* Layer as group */
var redcircles_layer = new L.LayerGroup();
var orangecircles_layer = new L.LayerGroup();
var yellowcircles_layer = new L.LayerGroup();
var markers_layer = new L.LayerGroup();

/*Get user's location*/

mymap.locate({setView: true, maxZoom: 14}).on('locationfound', function(e){
    var marker = L.marker([e.latitude, e.longitude]).addTo(mymap);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    marker.addTo(markers_layer);
});


/* Elements */

var redCircle = L.circle([32.8845, -117.2386], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
    }).addTo(mymap);

    redCircle.bindPopup("I am a circle.");
    redCircle.addTo(redcircles_layer);

var orangeCircle = L.circle([32.8700, -117.2310], {
    color: 'orange',
    fillColor: '#DC7633',
    fillOpacity: 0.5,
    radius: 500
    }).addTo(mymap);

    orangeCircle.bindPopup("I am a circle.");
    orangeCircle.addTo(orangecircles_layer);

var yellowCircle = L.circle([32.8600, -117.2563], {
    color: 'yellow',
    fillColor: '#FFC300',
    fillOpacity: 0.5,
    radius: 500
    }).addTo(mymap);

    yellowCircle.bindPopup("I am a circle.");
    yellowCircle.addTo(yellowcircles_layer);

/* Event functions */
onbtn_markers.onclick = function() {
    markers_layer.addTo(mymap);
    redcircles_layer.remove();
    orangecircles_layer.remove();
    yellowcircles_layer.remove();
}

onbtn_redcircles.onclick = function() {
    markers_layer.remove();
    orangecircles_layer.remove();
    yellowcircles_layer.remove();
    redcircles_layer.addTo(mymap);    
}

onbtn_orangecircles.onclick = function() {
    markers_layer.remove();
    redcircles_layer.remove();
    yellowcircles_layer.remove();
    orangecircles_layer.addTo(mymap);    
}

onbtn_yellowcircles.onclick = function() {
    markers_layer.remove();
    redcircles_layer.remove();
    orangecircles_layer.remove();
    yellowcircles_layer.addTo(mymap);    
}

onbtn_all.onclick = function() {
    markers_layer.addTo(mymap);
    redcircles_layer.addTo(mymap);
    orangecircles_layer.addTo(mymap);
    yellowcircles_layer.addTo(mymap);    
}

/*Zoom on click*/

redCircle.on('click', function(event){
    mymap.fitBounds(redCircle.getBounds());
});

orangeCircle.on('click', function(event){
    mymap.fitBounds(orangeCircle.getBounds());
});

yellowCircle.on('click', function(event){
    mymap.fitBounds(yellowCircle.getBounds());
});

/*Search Function*/
function initAutocomplete() {
        // var map = new google.maps.Map(document.getElementById('map'), {
        //   center: {lat: -33.8688, lng: 151.2195},
        //   zoom: 13,
        //   mapTypeId: 'roadmap'
        // });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('search-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }

