

Template.catadorprofile.onCreated(function() {
  // TODO: ideally not stop these subscriptions when profile is closed
  // because now has to subscribe every time new profile is loaded
  this.subscribe('images');
  this.subscribe('carroceiros');
  this.subscribe('posts');

})


Template.catadorDetails.helpers({
  
  name: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.name;
  },

  telephone1: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.phone;
  },

  telephone2: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.telephone2;
  },
  operator_telephone1: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    var operator = catador.operator_telephone1;
    if (operator) return '(' + operator + ')';
    return '';
  },
  operator_telephone2: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    var operator = catador.operator_telephone2;
    if (operator) return '(' + operator + ')';
    return '';
  },
  region: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.region;
  },

  whatsapp1: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.whatsapp1;
  },

  whatsapp2: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.whatsapp2;
  },

  address: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.geolocation.address;
  },

  carrocaPimpada: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    var returnVal = (catador.carrocaPimpada)? 'Sim' : 'N\u00e3o';
    return returnVal;
  },

  motorizedVehicle: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    var returnVal = (catador.motorizedVehicle)? 'Sim' : 'N\u00e3o';
    return returnVal;
  },

  observations: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.observations;
  },

  // services

  services_recyclable: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.services_recyclable;
  },
  services_construction: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.services_construction;
  },
  services_freight: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.services_freight;
  },
  services_furniture: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.services_furniture;
  },
  services_metals: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.services_metals;
  },      
  services_electronics: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.services_electronics;
  },      
  services_other_materials: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    return catador.services_other_materials;
  },      


  services: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    var services = [];
    if (catador.services_recyclable) services.push(services_recyclable_str);
    if (catador.services_construction) services.push(services_construction_str);
    if (catador.services_freight) services.push(services_freight_str);
    if (catador.services_furniture) services.push(services_furniture_str);
    if (catador.services_metals) services.push(services_metals_str);
    if (catador.services_electronics) services.push(services_electronics_str);
    if (catador.services_other_materials) services.push(services_other_materials_str);

    var servicesString = services.join(", ");
    
    return servicesString;
  }  

});


Template.catadorDetails.events({
  'click .profile-button-update': function() {

    console.log("clicked update button");
    // TODO: appropriate action, e.g. redirect to new page where can update certain information?
    // Or should be able to select which field to update?
    Modal.show('modalUpdateInfo');
    
  },
  'click .profile-button-services': function() {
    console.log("clicked services button");
    Modal.show('modalServices');
    
  }

});


Template.imageView.helpers({
  images: function () {
    // retrieve picture for selected catador
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    var img = Images.find({'_id': catador.picture});
    return img;

  }
});


Template.modalUpdateInfo.events({
  'change #changeNameInfo': function() {
    if (Session.get('changeName')) {
      Session.set('changeName', false);
    }
    else {
      Session.set('changeName', true);
    }
  },
  'change #changeTelephone1Info': function() {
    if (Session.get('changeTelephone1')) {
      Session.set('changeTelephone1', false);
    }
    else {
      Session.set('changeTelephone1', true);
    }
  },
  'change #changeOperator1Info': function() {
    if (Session.get('changeOperator1')) {
      Session.set('changeOperator1', false);
    }
    else {
      Session.set('changeOperator1', true);
    }
  },
  'change #changeWhatsapp1Info': function() {
    if (Session.get('changeWhatsapp1')) {
      Session.set('changeWhatsapp1', false);
    }
    else {
      Session.set('changeWhatsapp1', true);
    }
  },
  'change #changeTelephone2Info': function() {
    if (Session.get('changeTelephone2')) {
      Session.set('changeTelephone2', false);
    }
    else {
      Session.set('changeTelephone2', true);
    }
  },
  'change #changeOperator2Info': function() {
    if (Session.get('changeOperator2')) {
      Session.set('changeOperator2', false);
    }
    else {
      Session.set('changeOperator2', true);
    }
  },
  'change #changeWhatsapp2Info': function() {
    if (Session.get('changeWhatsapp2')) {
      Session.set('changeWhatsapp2', false);
    }
    else {
      Session.set('changeWhatsapp2', true);
    }
  },
  'change #changeAddressInfo': function() {
    if (Session.get('changeAddress')) {
      Session.set('changeAddress', false);
    }
    else {
      Session.set('changeAddress', true);
    }
  },
  'change #changeRegionInfo': function() {
    if (Session.get('changeRegion')) {
      Session.set('changeRegion', false);
    }
    else {
      Session.set('changeRegion', true);
    }
  },
  'change #changeCarrocaPimpadaInfo': function() {
    if (Session.get('changeCarrocaPimpada')) {
      Session.set('changeCarrocaPimpada', false);
    }
    else {
      Session.set('changeCarrocaPimpada', true);
    }
  },
  'change #changeMotorizedVehicleInfo': function() {
    if (Session.get('changeMotorizedVehicle')) {
      Session.set('changeMotorizedVehicle', false);
    }
    else {
      Session.set('changeMotorizedVehicle', true);
    }
  },
  'change #changeObservationsInfo': function() {
    if (Session.get('changeObservations')) {
      Session.set('changeObservations', false);
    }
    else {
      Session.set('changeObservations', true);
    }
  }
})

Template.modalUpdateInfo.helpers({
  'changeName': function() {
    return Session.get('changeName');
  },
  'changeTelephone1': function() {
    return Session.get('changeTelephone1');
  },
  'changeOperator1': function() {
    return Session.get('changeOperator1');
  },
  'changeWhatsapp1': function() {
    return Session.get('changeWhatsapp1');
  },
  'changeTelephone2': function() {
    return Session.get('changeTelephone2');
  },
  'changeOperator2': function() {
    return Session.get('changeOperator2');
  },
  'changeWhatsapp2': function() {
    return Session.get('changeWhatsapp2');
  },
  'changeAddress': function() {
    return Session.get('changeAddress');
  },
  'changeRegion': function() {
    return Session.get('changeRegion');
  },
  'changeCarrocaPimpada': function() {
    return Session.get('changeCarrocaPimpada');
  },
  'changeMotorizedVehicle': function() {
    return Session.get('changeMotorizedVehicle');
  },
  'changeObservations': function() {
    return Session.get('changeObservations');
  }
});


// TODO: Would be better if this was done only once when page is loaded
function getCatadorIdFromUrl() {
  // get url of current page
  var currentUrl = Router.current().originalUrl;

  // retrieve path
  var a = document.createElement('a');
  a.href = currentUrl;
  var pathname = a.pathname;  

  // pathname takes form /catadorprofile/<id>
  var id = pathname.split('/catadorprofile/')[1]
  return id;
};



