
var MAP_ZOOM = 15;

// Load GoogleMaps on startup
Meteor.startup(function() {
  GoogleMaps.load({
    libraries: 'places'
  });
});

// Create map and geolocate
Template.map.onCreated(function() {
  this.subscribe('carroceiros');
  var self = this;

  GoogleMaps.ready('map', function(map) {
    var marker;

    var latLng = Geolocation.latLng();
    if (! latLng) {
      // If geolocation fails, center on Sao Paulo
      var latLng = {
        'lat': -23.5528703,
        'lng': -46.6782626
      }
    }

    // create marker at coordinates
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(latLng.lat, latLng.lng),
        map: map.instance
    });
    map.instance.setCenter(marker.getPosition());

    // attaches the search box
    attachSearchBox(map, marker);
    
    self.autorun(function() {
      // update collection Carroceiros with data from Django database
      update_carroceiros();
      
      // add markers for catadores to map
      add_catadores();
 
    });

  });
});


// helper functions for geolocation on the map
Template.map.helpers({

  mapOptions: function() {
    var latLng = Geolocation.latLng();

    // if geolocation error, center on Sao Paulo
    if (!latLng) {
      latLng = {
        'lat': -23.5528703,
        'lng': -46.6782626
      }
    }
    // initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: MAP_ZOOM,
        mapTypeControl: false,
        streetViewControl: false
      };
    }
  },

});


// attaches the address search box
function attachSearchBox(map, marker) {
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.instance.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  // move marker and set new map center when user inputs place
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    else if (places.length == 1) {
      console.log('here');
      var location = places[0].geometry.location;
      marker.setPosition(location);
      map.instance.setCenter(location);
    };
  });
};


// CLEARABLE INPUT
function tog(v) {
  return v?'addClass':'removeClass';
} 

$(document).on('input', '.clearable', function(){
    $(this)[tog(this.value)]('x');
}).on('mousemove', '.x', function(e) {
    $(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');
}).on('touchstart click', '.onX', function(ev) {
    ev.preventDefault();
    $(this).removeClass('x onX').val('').change();
});


function add_catadores() {
  var icon = catador_icon_source;
  
  var carroceiroType = 'carroceiro';
  var catadores = Carroceiros.find({'type':carroceiroType}).fetch();

  catadores.forEach(function(catador) {
    // retrieve data for catador
    var catadorID = catador._id;
    var name = catador.name;
    var address = catador.address;
    var locationObject = {
      'lat': catador.latitude,
      'lng': catador.longitude
    };

    // create infowindow string
    var contentString = name;
    contentString += "<br>";
    contentString += "<a href='/catadorprofile/" + catadorID + "''>";
    contentString += "Veja mais</a>";    

    addMarkerInfowindow(locationObject, icon, contentString);
  });
};

// Function that calls Meteor method that updates the collection
// Carroceiros with data from Django
function update_carroceiros() {
  Meteor.call('getCarroceiros');
}


// Adds marker and associated info window to map
function addMarkerInfowindow(addressObject, iconUrl, contentString) {
  var map = GoogleMaps.maps.map.instance;
  var marker = new google.maps.Marker({
    map: map,
    position: {lat: addressObject.lat, lng: addressObject.lng},
    icon: iconUrl
  });

  // add info window
  marker.info = new google.maps.InfoWindow({
    content: contentString
  });

  // open infowindow on click
  google.maps.event.addListener(marker, 'click', function() {
    marker.info.open(map, marker);
  });

  google.maps.event.addListener(map, "click", function(event) {
    marker.info.close();
  });
};



////////////////////////////////////////////////////////////////////////////////////
// WE WILL WAIT TO IMPLEMENT FUNCTIONALITY FOR COOPERATIVAS AND PONTO DE ENTREGAS 
////////////////////////////////////////////////////////////////////////////////////

// adds markers for cooperativas and associated info windows
// function addCooperativasToMap() {
//   var icon = cooperativa_icon_source;

//   Cooperativas.find().fetch().forEach(function(coop) {
    
//     // retrieve relevant data
//     var address = coop.address
//     var name = coop.name;
//     var telephone = coop.telephone;
//     var hours = coop.hours;
//     var coleta = coop.coleta;
//     var cooperativaID = coop._id;

//     // create infowindow string
//     var contentString = "Name: "+ name;
//     contentString += "<br>";
//     contentString += "Telephone: " + telephone;
//     contentString += "<br>";
//     contentString += "Hours: " + hours;
//     contentString += "<br>";
//     contentString += "<a href='/cooperativaprofile/" + cooperativaID + "''>";
//     contentString += "Veja mais</a>";    

//     addMarkerInfowindow(address, icon, contentString);
//   });  
// };

// function addPevsToMap() {
//   var icon = pev_icon_source;

//   PontoDeEntregas.find().fetch().forEach(function(pev) {

//     // retrieve relevant data
//     var name = pev.name;
//     var hours = pev.hours;
//     var address = pev.address;
//     var pevID = pev._id;

//     // create infowindow string
//     var contentString = "Name: "+ name;
//     contentString += "<br>";
//     contentString += "Hours: " + hours;
//     contentString += "<br>";
//     contentString += "<a href='/pevprofile/" + pevID + "''>";
//     contentString += "Veja mais</a>";       

//     addMarkerInfowindow(address, icon, contentString);
//   });
// };



