
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
      addCooperativasToMap();

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
  var icon = 'https://dl.dropboxusercontent.com/u/6293956/cart.png';

  Catadores.find().fetch().forEach(function(catador) {
    
    // retrieve relevant data
    var address = catador.address;
    var name = catador.name;
    var telephone = catador.telephone;
    
    // retrieve picture
    var picture_id = catador.picture;
    console.log(picture_id);
    var catador_img_name = Images.findOne({'_id': picture_id}).name();
    // var img_src = '/img/images-' + picture_id+ '-' + catador_img_name;
    img_src = '/cfs/files/images/' + picture_id;
    var img_string = '<img style="width: 60px" ' + 'src="' + img_src + '">';

    // create infowindow string
    var contentString = "Name: "+ name;
    contentString += "<br>";
    contentString += "Telephone: " + telephone;
    contentString += "<br>";
    contentString += img_string;
    addMarkerInfowindow(address, icon, contentString);
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
}

