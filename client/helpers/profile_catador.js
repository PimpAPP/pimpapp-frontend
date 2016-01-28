

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
    return catador.address.fullAddress;
  },

  motorizedVehicle: function() {
    var catador = Carroceiros.findOne(getCatadorIdFromUrl());
    var returnVal = (catador.motorizedVehicle)? 'Sim' : 'Não';
    return returnVal;
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



