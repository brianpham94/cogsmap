/* getElement from html files */
var onbtn_markers = document.getElementById("btn_markers");
var onbtn_circles = document.getElementById("btn_circles");
var onbtn_all = document.getElementById("btn_all");

var mymap = L.map('mapid').setView([32.7157, -117.1611], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    			maxZoom: 18,
    			id: 'your.mapbox.project.id',
    			accessToken: 'your.mapbox.public.access.token'
			}).addTo(mymap); 

/* Layer as group */
var circles_layer = new L.LayerGroup();
var markers_layer = new L.LayerGroup();

/* Elements */
var marker = L.marker([32.7157, -117.1611]);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
marker.addTo(markers_layer);

var circle = L.circle([32.7145, -117.156386], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
});
circle.bindPopup("I am a circle.");

circle.addTo(circles_layer);

/* Event functions */
onbtn_markers.onclick = function() {
    markers_layer.addTo(mymap);
    circles_layer.remove();
}

onbtn_circles.onclick = function() {
    markers_layer.remove();
    circles_layer.addTo(mymap);    
}

onbtn_all.onclick = function() {
    markers_layer.addTo(mymap);
    circles_layer.addTo(mymap);    
}


