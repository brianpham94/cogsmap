  var currLoc;

  $( "#searchID" ).submit(function( event ) {
    console.log(currLoc);
    var numInputs = $("#searchID input").length;
    console.log(numInputs);
    if (numInputs === 2) {
      console.log("no inputs");
      $('<input />').attr('type', 'hidden')
      .attr('name', "search[current]")
      .attr('value', JSON.stringify(currLoc))
      .appendTo('#searchID');
      console.log("posted waiting for success");
    }
    event.preventDefault();
    $.post("/test", $("#searchID").serialize(), yelpSearchSuccess);
  });

/*
  $( "#searchLocation" ).submit(function( event ) {
    event.preventDefault();
    $.post("/test", $("#searchLocation").serialize(), yelpSearchSuccess);
  });
  */

  function yelpSearchSuccess(result){
    //You can get businesses which is returned as an array in this json format
    /*
      "businesses": [
    {
      "rating": 4,
      "price": "$",
      "phone": "+14152520800",
      "id": "four-barrel-coffee-san-francisco",
      "is_closed": false,
      "categories": [
        {
          "alias": "coffee",
          "title": "Coffee & Tea"
        }
      ],
      "review_count": 1738,
      "name": "Four Barrel Coffee",
      "url": "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
      "coordinates": {
        "latitude": 37.7670169511878,
        "longitude": -122.42184275
      },
      "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
      "location": {
        "city": "San Francisco",
        "country": "US",
        "address2": "",
        "address3": "",
        "state": "CA",
        "address1": "375 Valencia St",
        "zip_code": "94103"
      },
      "distance": 1604.23,
      "transactions": ["pickup", "delivery"]
    },
    // ...
  ],


  Typically you can retrieve it after you stringify it then parse it as shown below.
  then they give you an array of businesses

  You can iterate through the array and reference them through dot notation as shown below
  */
  console.log("successful search Callback entering extraction");
  var strResult = JSON.stringify(result.businesses);
  var javaObject = JSON.parse(strResult);
  console.log(javaObject[0].review_count);
  placeMarkers(javaObject);
}

/* Array to store search result */
var places = new Array;

/* Array to classify categories */
var categories = new Array;

/* Markers to be displayed on the map */
var markers_on_map = new L.MarkerClusterGroup();

/* Markers - to open & close popup freely */
var markersArray = new Array;

/* Chart array to be displayed */
var chart_reviews = new Array;
var chart_ratings = new Array;

function findReviews(id) {
    console.log("clicked");
    $.post("/reviews", {businessID: id}, function(returnedReviews) {
      console.log(returnedReviews);
    });
}

function colorIcon(reviews) {
  var iconColor;
  if(reviews > 200) {
    iconColor = redIcon;
  }
  else if(reviews < 100) {
    iconColor = greenIcon;
  }
  else {
    iconColor = yellowIcon;
  }
  return iconColor;
}

function placeMarkers(businesses) { 

  markers_on_map.clearLayers();

  /* Clear all arrays */
  markersArray = [];
  places = [];
  categories = [];
  chart_reviews = [];
  chart_ratings = [];

  /* Clear all HTML elements */
  document.getElementById("panel_info").innerHTML = '';
  document.getElementById("categories_info").innerHTML = '';
/*
  console.log("given businesses: " + businesses);
  document.getElementById("panel_info").innerHTML = "";

      var redCircle = L.circle([32.7157, -117.2712717], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
      });

      redCircle.bindPopup("High Traffic");
      redCircle.addTo(redcircles_layer);
      */
      for(var i = 0; i < businesses.length; i++) {
        var iconColor;
        console.log("Businesses count review: " + businesses[i].review_count);
        var reviews = businesses[i].review_count;

        if(reviews > 200) {
          iconColor = redIcon;

        }
        else if(reviews < 100) {
          iconColor = greenIcon;
      /*
      var greenCircle = L.circle([businesses[i].coordinates.latitude, businesses[i].coordinates.longitude], {
        color: 'green',
        fillColor: '#32CD32',
        fillOpacity: 0.5,
        radius: 100
      }).addTo(mymap);

      orangeCircle.bindPopup("Low Traffic");
      orangeCircle.addTo(orangecircles_layer);
      */
    }
    else {
      iconColor = yellowIcon;
      /*
      var yellowCircle = L.circle([businesses[i].coordinates.latitude, businesses[i].coordinates.longitude], {
        color: 'yellow',
        fillColor: '#FFC300',
        fillOpacity: 0.5,
        radius: 200
      }).addTo(mymap);

      yellowCircle.bindPopup("Medium Traffic");
      yellowCircle.addTo(yellowcircles_layer);
      */

    }
    console.log("Icon Color is: " + iconColor);

    var marker = L.marker([businesses[i].coordinates.latitude, businesses[i].coordinates.longitude], {icon: iconColor}).bindPopup(
      "<b>Place</b><br/>" + "Name: " + 
      businesses[i].name + "<br> Rating: " + businesses[i].rating + "<br>" + "<button class='btn btn-primary btn-review' onclick='openModal(" + i +")' style='width:100%'>Reviews</button>");

    places[i] = businesses[i];
    /* Show informations to info panel on the bottom */
    document.getElementById("panel_info").innerHTML += 
    "<tr id='panel_info'><td>" + places[i].name + "</td><td>" + places[i].review_count + "</td><td>" + places[i].rating + "</td><td>" + places[i].price + "</td><td>"+ places[i].categories[0].title +"</td><td><a href='#map'><button onclick='clickPlace(" + i + ")' class='btn btn-info'>Click to see on the map</button></a></td></tr>";
    markers_on_map.addLayer(marker);
    markersArray.push(marker);

    /* Store categories array */
    if(categories.indexOf(places[i].categories[0].title) < 0) {
      categories.push(places[i].categories[0].title);
    }

    /* Store charts array */
    chart_reviews.push([places[i].name,places[i].review_count]);
    chart_ratings.push([places[i].name,places[i].rating]);

  }

  mymap.addLayer(markers_on_map);
  console.log(chart_reviews[0]);
  google.charts.setOnLoadCallback(drawChart);
  
  /* Show categories on the left */
  for(var i = 0; i < categories.length; i++) {
    document.getElementById("categories_info").innerHTML += "<button class='list-group-item'>"+categories[i]+"</button>";
  }
}

function drawChart() {
   // Define the chart to be drawn.
   chart_reviews.splice(0, 0, ['Place', 'Review']);
   chart_ratings.splice(0, 0, ['Place', 'Rating']);

   var dataReviews = google.visualization.arrayToDataTable(chart_reviews);
   var dataRatings = google.visualization.arrayToDataTable(chart_ratings);

   var optionsReviews = {
    title: 'Reviews Ranks'   
  }; 

  var optionsRatings = {
    title: 'Ratings Ranks'   
  }; 

  document.getElementById('chart_review').style.height = '400px';
  document.getElementById('chart_rating').style.height = '400px';


   // Instantiate and draw the chart.
   var chartReviews = new google.visualization.ColumnChart(document.getElementById('chart_review'));
   var chartRatings = new google.visualization.ColumnChart(document.getElementById('chart_rating'));

   chartReviews.draw(dataReviews, optionsReviews);
   chartRatings.draw(dataRatings, optionsRatings);
 }

 var onbtn_current = document.getElementById("btn_current");
 var mymap = L.map('mapid').setView([32.7157, -117.1611], 13);

 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'your.mapbox.project.id',
  accessToken: 'your.mapbox.public.access.token'
}).addTo(mymap); 

 /* Get user's location */
 var current;

 mymap.locate({setView: true, maxZoom: 14}).on('locationfound', function(e){
  console.log("Current location here");
  current = {latitude:e.latitude, longitude:e.longitude};
  currLoc = current;
  var marker = L.marker([e.latitude, e.longitude]);
  marker.addTo(mymap);
  marker.bindPopup("<b>You are here</b>.").openPopup();
});

 /* This function move map to user's current location */
 onbtn_current.onclick = function(){
  mymap.setView(new L.LatLng(current.latitude, current.longitude));
}

$( "#search-location" ).click(function() {
  searchMap();
});

function searchMap() {
  var geocoder = new google.maps.Geocoder();
  geocodeAddress(geocoder, mymap);
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('location-search').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0){
      var splitAddr = address.split(', ');
      if(splitAddr[splitAddr.length-1] == 'United States'){
        if(splitAddr[0] == results[0].address_components[0].long_name && 
          splitAddr[1] == results[0].address_components[2].short_name){
          resultsMap.setView([results[0].geometry.location.lat(),results[0].geometry.location.lng()], 13);
      }
      else{
        resultsMap.setView([current.latitude,current.longitude], 13);
      }
    }
    else{
      if(address){
        resultsMap.setView([results[0].geometry.location.lat(),results[0].geometry.location.lng()], 13);
      }
      else{
        resultsMap.setView([current.latitude,current.longitude], 13);
      }
    }
  } 
  else {
    alert('Geocode was not successful for the following reason: ' + status);
  }
});
}

var clickPlace = function(index) {
  // body
  console.log("You've click one of button");
  console.log(index);
  var iconColor = colorIcon(places[index].review_count);

  // markers_on_map.clearLayers();

  // var marker = L.marker([places[index].coordinates.latitude, places[index].coordinates.longitude], {icon: iconColor}).bindPopup(
  //    "<b>Place</b><br/>" + "Name: " + 
  //    places[index].name + "<br> Rating: " + places[index].rating);

  // markers_on_map.addLayer(marker);
  // mymap.addLayer(markers_on_map);

  // Move to the place user clicked

  mymap.setView(new L.LatLng(places[index].coordinates.latitude, places[index].coordinates.longitude), 20);
  markersArray[index].openPopup();
}

/*Opening modals using buttons in popup*/
var modal = document.getElementById("modal-reviews");

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var openModal = function(index) {
  modal.style.display = "block";
  var modalContent = document.getElementById("modal-body");
  modalContent.innerHTML = searchReviews(places[index].reviews);
}

/* Search Function */
function initAutocomplete() {

        // Create the search box and link it to the UI element.
        var input = document.getElementById('location-search');
        var searchBox = new google.maps.places.SearchBox(input);
        //mymap.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

        //var input2 = document.getElementById('location-search');
        // var searchBox2 = new google.maps.places.SearchBox2(input2);
        //mymap.controls[google.maps.ControlPosition.TOP_LEFT].push(input2);

        // Bias the SearchBox results towards current map's viewport.

        
        mymap.addListener('bounds_changed', function() {
          searchBox.setBounds(mymap.getBounds());
        });

        // mymap.addListener('bounds_changed', function() {
        //   searchBox2.setBounds(mymap.getBounds());
        // });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          // markers.forEach(function(marker) {
          //   marker.setMap(null);
          // });
          // markers = [];

          // For each place, get the icon, name and location.
          //var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
          //   var icon = {
          //     url: place.icon,
          //     size: new google.maps.Size(71, 71),
          //     origin: new google.maps.Point(0, 0),
          //     anchor: new google.maps.Point(17, 34),
          //     scaledSize: new google.maps.Size(25, 25)
          //   };

          //   // Create a marker for each place.
          //   markers.push(new google.maps.Marker({
          //     map: mymap,
          //     icon: icon,
          //     title: place.name,
          //     position: place.geometry.location
          //   }));

          if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          //mymap.fitBounds(bounds);
        });
      }


      /*Circle consolidation*/

      var circleCenters = ['32.881151, -117.23745', '32.8700, -117.2310', '32.8600, -117.2563']

      /*for (i = 0; i < circleCenters.length, i++){
        var cluster = new L.markerClusterGroup({
            circleClusterFucntion: function(circle) {
                var circleCluster = circle.getAllChildMarkers()[0].1;

            }
        })
      }*/


