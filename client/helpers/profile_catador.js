

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
    Session.set('currName', catador.name);
    return catador.name;
  },

  telephone1: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    Session.set('currTelephone1', catador.phone);
    return catador.phone;
  },

  telephone2: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    Session.set('currTelephone2', catador.telephone2);
    return catador.telephone2;
  },
  operator_telephone1: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    Session.set('currOperator1', catador.operator_telephone1);
    var operator = catador.operator_telephone1;
    if (operator) return '(' + operator + ')';
    return '';
  },
  operator_telephone2: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    Session.set('currOperator2', catador.operator_telephone2);
    var operator = catador.operator_telephone2;
    if (operator) return '(' + operator + ')';
    return '';
  },
  region: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    Session.set('currRegion', catador.region);
    return catador.region;
  },

  whatsapp1: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    Session.set('currWhatsapp1', catador.whatsapp1);
    return catador.whatsapp1;
  },

  whatsapp2: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    Session.set('currWhatsapp2', catador.whatsapp2);
    return catador.whatsapp2;
  },

  address_base: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    Session.set('currAddress_base', catador.address_base);
    return catador.address_base;
  },
  city: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    Session.set('currCity', catador.city);
    return catador.city;
  },

  carrocaPimpada: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    var returnVal = (catador.carrocaPimpada)? 'Sim' : 'N\u00e3o';
    Session.set('currCarrocaPimpada', returnVal);
    return returnVal;
  },

  motorizedVehicle: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    var returnVal = (catador.motorizedVehicle)? 'Sim' : 'N\u00e3o';
    Session.set('currMotorizedVehicle', returnVal);
    return returnVal;
  },

  observations: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    Session.set('currObservations', catador.observations);
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

    // when calling update screen initially uncheck all check boxes that indicate that user wants to update that field
    Session.set('changeName', false);
    Session.set('changeTelephone1', false);
    Session.set('changeOperator1', false);
    Session.set('changeWhatsapp1', false);
    Session.set('changeTelephone2', false);
    Session.set('changeOperator2', false);
    Session.set('changeWhatsapp2', false);
    Session.set('changeAddress_base', false);
    Session.set('changeRegion', false);
    Session.set('changeCity', false);
    Session.set('changeCarrocaPimpada', false);
    Session.set('changeMotorizedVehicle', false);
    Session.set('changeObservations', false);

    // call screen of update
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
  'change #changeAddress_baseInfo': function() {
    if (Session.get('changeAddress_base')) {
      Session.set('changeAddress_base', false);
    }
    else {
      Session.set('changeAddress_base', true);
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
  'change #changeCityInfo': function() {
    if (Session.get('changeCity')) {
      Session.set('changeCity', false);
    }
    else {
      Session.set('changeCity', true);
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
  'currName': function() {
    return Session.get('currName');
  },
  'changeTelephone1': function() {
    return Session.get('changeTelephone1');
  },
  'currTelephone1': function() {
    return Session.get('currTelephone1');
  },
  'changeOperator1': function() {
    return Session.get('changeOperator1');
  },
  'currOperator1': function() {
    return Session.get('currOperator1');
  },
  'changeWhatsapp1': function() {
    return Session.get('changeWhatsapp1');
  },
  'currWhatsapp1': function() {
    return Session.get('currWhatsapp1');
  },
  'changeTelephone2': function() {
    return Session.get('changeTelephone2');
  },
  'currTelephone2': function() {
    return Session.get('currTelephone2');
  },
  'changeOperator2': function() {
    return Session.get('changeOperator2');
  },
  'currOperator2': function() {
    return Session.get('currOperator2');
  },
  'changeWhatsapp2': function() {
    return Session.get('changeWhatsapp2');
  },
  'currWhatsapp2': function() {
    return Session.get('currWhatsapp2');
  },
  'changeAddress_base': function() {
    return Session.get('changeAddress_base');
  },
  'currAddress_base': function() {
    return Session.get('currAddress_base');
  },
  'changeRegion': function() {
    return Session.get('changeRegion');
  },
  'currRegion': function() {
    return Session.get('currRegion');
  },
  'changeCity': function() {
    return Session.get('changeCity');
  },
  'currCity': function() {
    return Session.get('currCity');
  },
  'changeCarrocaPimpada': function() {
    return Session.get('changeCarrocaPimpada');
  },
  'currCarrocaPimpada': function() {
    return Session.get('currCarrocaPimpada');
  },
  'changeMotorizedVehicle': function() {
    return Session.get('changeMotorizedVehicle');
  },
  'currMotorizedVehicle': function() {
    return Session.get('currMotorizedVehicle');
  },
  'changeObservations': function() {
    return Session.get('changeObservations');
  },
  'currObservations': function() {
    return Session.get('currObservations');
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



