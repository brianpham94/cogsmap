/* getElement from Menus in html files */

var onbtn_markers = document.getElementById("btn_markers");
var onbtn_redcircles = document.getElementById("btn_redcircles");
var onbtn_orangecircles = document.getElementById("btn_orangecircles");
var onbtn_yellowcircles = document.getElementById("btn_yellowcircles");
var onbtn_all = document.getElementById("btn_all");

var onbtn_restaurants = document.getElementById("btn_restaurants");
var onbtn_hotels = document.getElementById("btn_hotels");
var onbtn_beach = document.getElementById("btn_beach");

/* Layer as group */
/* 1. Area layers */

var redcircles_layer = new L.LayerGroup();
var orangecircles_layer = new L.LayerGroup();
var yellowcircles_layer = new L.LayerGroup();
var markers_layer = new L.LayerGroup();

/* 2. Place layers */
var restaurants_layer = new L.LayerGroup();
var beach_layer = new L.LayerGroup();
var hotels_layer = new L.LayerGroup();

/* 3. Places in area */
var places_in_redcircles = new L.LayerGroup();
var places_in_orangecircles = new L.LayerGroup();
var places_in_yellowcircles_layer = new L.LayerGroup();

/* Elements - Area circles */

/*
var redCircle = L.circle([32.881151, -117.23745], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
    });

    redCircle.bindPopup("I am a circle.");
    redCircle.addTo(redcircles_layer);
    mymap.addLayer(redcircles_layer);
    */
/*
var redCircle2 = L.circle([32.863151, -117.22645], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
    }).addTo(mymap);

    redCircle2.bindPopup("I am a circle.");
    redCircle2.addTo(redcircles_layer);

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
*/
/* Elements - Icons */

var restaurantIcon = L.icon({
    iconUrl: '../images/icons/restaurants/Tourism icon (21).png',

    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var hotelIcon = L.icon({
    iconUrl: '../images/icons/hotel/Tourism icon (66).png',

    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var beachIcon = L.icon({
    iconUrl: '../images/icons/beach/Tourism icon (71).png',

    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var restaurantMarker = L.marker([32.879573, -117.236341], {icon: restaurantIcon});
    restaurantMarker.addTo(restaurants_layer).addTo(places_in_redcircles);

var hotelMarker = L.marker([32.877501, -117.241148], {icon: hotelIcon});
    hotelMarker.addTo(hotels_layer).addTo(places_in_redcircles);

var beachMarker = L.marker([32.877501, -117.238680], {icon: beachIcon});
    beachMarker.addTo(beach_layer).addTo(places_in_redcircles);

/* Event functions */
/*
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

onbtn_restaurants.onclick = function() {
    restaurants_layer.addTo(mymap);
    beach_layer.remove();
    hotels_layer.remove();
}

onbtn_beach.onclick = function() {
    restaurants_layer.remove();
    beach_layer.addTo(mymap);
    hotels_layer.remove();
}

onbtn_hotels.onclick = function() {
    restaurants_layer.remove();
    beach_layer.remove();
    hotels_layer.addTo(mymap);
}
*/
/* Zoom on click */
/*
redCircle.on('click', function(event){
    mymap.fitBounds(redCircle.getBounds());
    document.getElementById("panel_info").innerHTML = "All the place in red circle list here";
    places_in_redcircles.addTo(mymap);
});

redCircle2.on('click', function(event){
    mymap.fitBounds(redCircle2.getBounds());
    document.getElementById("panel_info").innerHTML = "All the place in red circle2 list here";
    places_in_redcircles.addTo(mymap);
});

orangeCircle.on('click', function(event){
    mymap.fitBounds(orangeCircle.getBounds());
    document.getElementById("panel_info").innerHTML = "All the place in orange circle list here";
    places_in_orangecircles.addTo(mymap);
    places_in_redcircles.remove();
});

yellowCircle.on('click', function(event){
    mymap.fitBounds(yellowCircle.getBounds());
    document.getElementById("panel_info").innerHTML = "All the place in yellow circle list here";
    places_in_yellowcircles.addTo(mymap);
    places_in_redcircles.remove();
});
*/