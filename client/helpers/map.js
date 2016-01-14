
var MAP_ZOOM = 15;

Meteor.subscribe('carroceiros');

Meteor.startup(function() {
  GoogleMaps.load({
    libraries: 'places'
  });
});

Template.map.onCreated(function() {
  var self = this;

  GoogleMaps.ready('map', function(map) {
    var marker;

    // Create and move the marker when latLng changes.
    self.autorun(function() {
      var latLng = Geolocation.latLng();
      if (! latLng)
        return;

      // If the marker doesn't yet exist, create it.
      if (! marker) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(latLng.lat, latLng.lng),
          map: map.instance
        });
      }
      // The marker already exists, so we'll just change its position.
      else {
        marker.setPosition(latLng);
      }

      // Center and zoom the map view onto the current position.
      map.instance.setCenter(marker.getPosition());
      map.instance.setZoom(MAP_ZOOM);

      // Add markers for catadores, cooperatives, and ponto de entregas
      addCatadoresToMap();
      addCooperativasToMap();
      addPevsToMap();

    });
  });
});

// Helper functions for geolocation on the map
Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: MAP_ZOOM
      };
    }
  }
});


// Go to specified address
Template.SearchMap.events({
  'submit form': function(event) {
      event.preventDefault();
      var address = event.target.desiredAddress.value;
      console.log(address);
      var map = GoogleMaps.maps.map.instance

      // Code from Google Developers
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });

    }
})

// Autocompletes the address searched
Template.addressGeoAutoComplete.onRendered(function() {
    this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#geocomplete").geocomplete();
    }
  });
});


// Adds markers for catadores and associated info windows
function addCatadoresToMap() {
  var icon = 'https://dl.dropboxusercontent.com/u/6293956/cart.png';

  Catadores.find().fetch().forEach(function(catador) {
    
    // used to retrieve data for catador on profile
    var carroceiroID = catador._id;

    // retrieve data for marker
    var name = catador.name;
    var address = catador.address;
    
    // create infowindow string
    var contentString = "Name: "+ name;
    contentString += "<br>";
    contentString += "<a href='/catadorprofile/" + carroceiroID + "''>";
    contentString += "Veja mais</a>";
    
    addMarkerInfowindow(address, icon, contentString, carroceiroID);
  });  
}

// Adds markers for cooperativas and associated info windows
function addCooperativasToMap() {
  var icon = 'https://dl.dropboxusercontent.com/u/6293956/cooperativa.jpg';

  Cooperativas.find().fetch().forEach(function(coop) {
    
    // retrieve relevant data
    var address = coop.address
    var name = coop.name;
    var telephone = coop.telephone;
    var hours = coop.hours;
    var coleta = coop.coleta;

    // create infowindow string
    var contentString = "Name: "+ name;
    contentString += "<br>";
    contentString += "Telephone: " + telephone;
    contentString += "<br>";
    contentString += "Hours: " + hours;


    addMarkerInfowindow(address, icon, contentString);
  });  
}

function addPevsToMap() {
  var icon = "https://dl.dropboxusercontent.com/u/6293956/pev.jpg";

  PontoDeEntregas.find().fetch().forEach(function(pev) {
    
    // retrieve relevant data
    var name = pev.name;
    var hours = pev.hours;
    var address = pev.address;

    // create infowindow string
    var contentString = "Name: "+ name;
    contentString += "<br>";
    contentString += "Hours: " + hours;

    addMarkerInfowindow(address, icon, contentString);

  })
}


// Adds marker and associated info window to map
function addMarkerInfowindow(addressObject, iconUrl, contentString, carroceiroID) {
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

  marker.carroceiroID = carroceiroID;

  // open infowindow on click
  google.maps.event.addListener(marker, 'click', function() {
    Session.set(selectedCarroceiroID, marker.carroceiroID);
    marker.info.open(map, marker);
  });      
}