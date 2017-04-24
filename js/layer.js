	var cities = new L.LayerGroup();
	var hiddenCity = L.marker([39.69, -105.05]).bindPopup('This is Test city, CO.');


	L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities),
	L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities),
	L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities),
	L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);


	var mbAttr = 
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';


	// We defined layers!
	var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
		streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

	var map = L.map('mapid', {
		center: [39.73, -104.99],
		zoom: 10,
		layers: [grayscale, cities]
	});


/*
	var baseLayers = {
		"Grayscale": grayscale,
		"Streets": streets
	};

	*/

	var onbtn_color = document.getElementById("btn_color");
		onbtn_gray = document.getElementById("btn_gray");

	//L.control.layers(baseLayers).addTo(map);

	var baseLayers;

	onbtn_gray.onclick = function() {
		grayscale.addTo(map);
		hiddenCity.addTo(map);
		streets.remove();
		console.log("hey gray");
	}

	onbtn_color.onclick = function() {
		streets.addTo(map);
		hiddenCity.remove();
		grayscale.remove();
		console.log("hey color");
	}

	//L.control.layers(baseLayers).addTo(map);
	