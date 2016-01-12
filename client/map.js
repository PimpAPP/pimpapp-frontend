
/*
If using Google API key, do not include it here.
Use Meteor.settings.
http://joshowens.me/environment-settings-and-security-with-meteor-js/
*/

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

      addCatadoresToMap();

    });
  });
});

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
  Catadores.find().fetch().forEach(function(catador) {
    
    // retrieve relevant data
    var map = GoogleMaps.maps.map.instance
    var address = catador.address
    var name = catador.name;
    var telephone = catador.telephone;

    // add marker
    var marker = new google.maps.Marker({
        map: map,
        position: {lat: address.lat, lng: address.lng},
        icon: 'https://dl.dropboxusercontent.com/u/6293956/cart.png'
    });

    // add infowindow
    var contentString = "Name: "+ name;
    contentString += "<br>";
    contentString += "Telephone: " + telephone;

    marker.info = new google.maps.InfoWindow({
      content: contentString
    });      

    // open infowindow on click
    google.maps.event.addListener(marker, 'click', function() {
      marker.info.open(map, marker);
    });

  });  
}



