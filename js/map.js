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

/* Elements */
var marker = L.marker([32.7157, -117.1611]);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
marker.addTo(markers_layer);

var redCircle = L.circle([32.7145, -117.156386], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
    }).addTo(mymap);

    redCircle.bindPopup("I am a circle.");
    redCircle.addTo(redcircles_layer);

var orangeCircle = L.circle([32.7245, -117.136386], {
    color: 'orange',
    fillColor: '#DC7633',
    fillOpacity: 0.5,
    radius: 500
    }).addTo(mymap);

    orangeCircle.bindPopup("I am a circle.");
    orangeCircle.addTo(orangecircles_layer);

var yellowCircle = L.circle([32.7045, -117.156386], {
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



