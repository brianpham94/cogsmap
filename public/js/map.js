  var currLoc;

  $(function() {
    getStoredlist();
  });


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
var list_index;

/* My places */
var myPlaces = new Array;

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
  document.getElementById("view_more").innerHTML = '';
  document.getElementById("categories_info").innerHTML = '';

  document.getElementById("status_list").innerHTML = "<h3>You've searched " + businesses.length + " places</h3>";

  for(var i = 0; i < businesses.length; i++) {
    var iconColor;
    var reviews = businesses[i].review_count;

    if(reviews > 200) {
      iconColor = redIcon;

    }
    else if(reviews < 100) {
      iconColor = greenIcon;
      
    }
    else {
      iconColor = yellowIcon;
    }

    var marker = L.marker([businesses[i].coordinates.latitude, businesses[i].coordinates.longitude], {icon: iconColor}).bindPopup(
      "<b>Place</b><br/>" + "Name: " + 
      businesses[i].name + "<br> Rating: " + businesses[i].rating + "<br>" + "<button class='btn btn-primary btn-review' onclick='openModal(" + i +")' style='width:100%'>Reviews</button>");

    places[i] = businesses[i];
    /* Show informations to info panel on the bottom */
    
    if(i < 5) {
      document.getElementById("panel_info").innerHTML += 
      "<tr id='panel_info'><td>" + places[i].name + "</td><td>" + places[i].review_count + "</td><td>" + places[i].rating + "</td><td>" + places[i].price + "</td><td>"+ places[i].categories[0].title +"</td><td><a href='#map'><button onclick='clickPlace(" + i + ")' class='btn btn-info'>View</button></a></td><td><button onclick='addPlace(" + i + ")' class='btn btn-primary'>Add</button></td></tr>";
    }
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

  list_index = 5;
  document.getElementById("view_more").innerHTML += "<button type='button' class='btn' onclick='viewMore()'>View 5 more places</button>";

  mymap.addLayer(markers_on_map);
  console.log(chart_reviews[0]);
  google.charts.setOnLoadCallback(drawChart);
  
  /* Show categories on the left */
  for(var i = 0; i < categories.length; i++) {
    document.getElementById("categories_info").innerHTML += "<button class='list-group-item'>"+ categories[i] +"</button>";
  }
}

var viewMore = function() {
  var limit_index = list_index + 5;
  for(var i=list_index; (i<limit_index && i<places.length); i++){
    document.getElementById("panel_info").innerHTML += 
      "<tr id='panel_info'><td>" + places[i].name + "</td><td>" + places[i].review_count + "</td><td>" + places[i].rating + "</td><td>" + places[i].price + "</td><td>"+ places[i].categories[0].title +"</td><td><a href='#map'><button onclick='clickPlace(" + i + ")' class='btn btn-info'>View</button></a></td><td><button onclick='addPlace(" + i + ")' class='btn btn-primary'>Add</button></td></tr>";
  }
  list_index = i;

  if(i >= (places.length-1)) {
    document.getElementById("view_more").innerHTML = "No more places found";
  }
}

function drawChart() {
   // Define the chart to be drawn.

   chart_reviews.splice(0, 0, ['Place', 'Review']);
   chart_ratings.splice(0, 0, ['Place', 'Rating']);

   var dataReviews = google.visualization.arrayToDataTable(chart_reviews);
   var dataRatings = google.visualization.arrayToDataTable(chart_ratings);

   console.log(dataReviews);


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

 L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibG1nb25nIiwiYSI6ImNqMXY5ZGxqcTAwMWQycWxucWJjbmxuemEifQ.wJZoNdBrReyKk3u0vt6WAQ', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'your.mapbox.project.id',
  accessToken: 'pk.eyJ1IjoibG1nb25nIiwiYSI6ImNqMXY5ZGxqcTAwMWQycWxucWJjbmxuemEifQ.wJZoNdBrReyKk3u0vt6WAQ'
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
  console.log(index);
  var iconColor = colorIcon(places[index].review_count);

  mymap.setView(new L.LatLng(places[index].coordinates.latitude, places[index].coordinates.longitude), 20);
  markersArray[index].openPopup();
}

var clickSavedPlace = function(index) {
  // body
  console.log(index);
  var iconColor = colorIcon(myPlaces[index].review_count);

  mymap.setView(new L.LatLng(myPlaces[index].coordinates.latitude, myPlaces[index].coordinates.longitude), 20);
  markersArray[index].openPopup();
}

var addPlace = function(index) {
  // body
  console.log("You've added the place!!!!!!");
  console.log(places[index]);
  console.log("------------------");

  $.post("/addPlace", places[index], function(){ console.log("inside the function"); });
  //mymap.setView(new L.LatLng(places[index].coordinates.latitude, places[index].coordinates.longitude), 20);
  //markersArray[index].openPopup();
  getStoredlist();
}

var getStoredlist = function() {
  document.getElementById("stored_list").innerHTML = "";
  console.log("Get the data");
  var doc = "";
  myPlaces = [];

  $.post("/getPlace",  function(data) {
    for(var i = 0; i<data.length; i++) {
      console.log("INSIDE STORE");
      console.log(i);
      console.log(data[i].name);
      doc += "<button class='btn' onclick='clickSavedPlace(" + i + ")' style='display: inline-block;'>"+ data[i].name +"</button><button onclick='removePlace(" + i + ")' style='display: inline-block;' >X</button><div style='height: 5px;'></div>";
      myPlaces.push(data[i]);
    }
    console.log("To html");
    document.getElementById("stored_list").innerHTML = doc;
    if(data.length > 0) {
      document.getElementById("list_fn").innerHTML = "<button onclick='removeAllPlaces()' class='btn'>Delete all</button><br/><button onclick='comparePlaces()' class='btn btn-success'>Compare</button>";
    }
    else {
      document.getElementById("list_fn").innerHTML = "";
    }
  });
}

var removeAllPlaces = function() {
  console.log("removeAllPlaces");

  $.post("/removeAllPlaces", function(){ console.log("inside the function"); });
  getStoredlist();
}

var removePlace = function(index) {
  $.post("/removePlace",{ number:index }, function(){ console.log("inside the function"); });
  getStoredlist();
}

var comparePlaces = function() {
  /* TODO: Compare stored places */
  console.log("Compare class by displaying graph");
}

/*Opening modals using buttons in popup*/
var modal = document.getElementById("modal-reviews");

var span = document.getElementsByClassName("close")[0];

var closeButton = document.getElementById("modal-close");

span.onclick = function() {
  modal.style.display = "none";
}

closeButton.onclick = function() {
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
  modalContent.innerHTML = searchReviews(places[index].id);
  var modalHeader = document.getElementById("modal-header");
  modalHeader.innerHTML = "<h2 style='padding-left: 30px;'> Reviews for " + places[index].name + "</h2>";
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


