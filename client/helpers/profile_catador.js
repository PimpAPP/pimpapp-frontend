

Template.catadorprofile.onCreated(function() {
  // TODO: ideally not stop these subscriptions when profile is closed
  // because now has to subscribe every time new profile is loaded
  this.subscribe('images');
  this.subscribe('carroceiros');
  this.subscribe('addresses');
  this.subscribe('telephones');
  this.subscribe('services');
});

Template.catadorDetails.onCreated(function() {
  //store values from database in session variables
  setStoredValues();

  //retrieve image of catador from database
  image = Images.find({$and: [{'catador_id':Session.get('catador').id}, {'moderation_status': {$in: statusShow}}]});
});

// clear all messages sent to user to don't dirty future pages
Template.modalUpdateInfo.onDestroyed(function() {
  FlashMessages.clear();
});

// clear all messages sent to user to don't dirty future pages
Template.modalPhotoInfo.onDestroyed(function() {
  FlashMessages.clear();
});

// retrieve data from session variables
Template.catadorDetails.helpers({
  name: function() {
    return Session.get('catador').name;
  },

  miniBio: function() {
    return Session.get('catador').miniBio;
  },

  telephone1: function() {
    return Session.get('telephone').telephone1;
  },

  telephone2: function() {
    return Session.get('telephone').telephone2;
  },
  operator_telephone1: function() {
    var operator = Session.get('telephone').operator_telephone1;
    if (operator) return '(' + operator + ')';
    return '';
  },
  operator_telephone2: function() {
    var operator = Session.get('telephone').operator_telephone2;
    if (operator) return '(' + operator + ')';
    return '';
  },

  whatsapp1: function() {
    return Session.get('telephone').whatsapp1;
  },

  whatsapp2: function() {
    return Session.get('telephone').whatsapp2;
  },

  internet1: function() {
    return Session.get('telephone').internet1;
  },

  internet2: function() {
    return Session.get('telephone').internet2;
  },

  email: function() {
    return Session.get('catador').email;
  },

  socialNetwork: function() {
    return Session.get('catador').socialNetwork;
  },

  complete_address: function() {
    return Session.get('address').base_address;
  },

  region: function() {
    return Session.get('address').region;
  },

  city: function() {
    return Session.get('address').city;
  },

  state: function() {
    return Session.get('address').state;
  },

  country: function() {
    return Session.get('address').country;
  },

  zip: function() {
    return Session.get('address').zip;
  },

  carrocaPimpada: function() {
    var returnVal = (Session.get('catador').carrocaPimpada)? 'Sim' : 'N\u00e3o';
    return returnVal;
  },

  motorizedVehicle: function() {
    var returnVal = (Session.get('catador').motorizedVehicle)? 'Sim' : 'N\u00e3o';
    return returnVal;
  },

  observations: function() {
    return Session.get('catador').observations;
  },

  // services

  services_recyclable: function() {
    return Session.get('services').services_recyclable;
  },
  services_glass: function() {
    return Session.get('services').services_glass;
  },
  services_construction: function() {
    return Session.get('services').services_construction;
  },
  services_volume: function() {
    return Session.get('services').services_volume;
  },
  services_metals: function() {
    return Session.get('services').services_metals;
  },      
  services_electronics: function() {
    return Session.get('services').services_electronics;
  },
  services_freight: function() {
    return Session.get('services').services_freight;
  },      
  services_other_materials: function() {
    return Session.get('services').services_other_materials;
  },      
  services_other_materials_description: function() {
    return Session.get('services').services_other_materials_description;
  }
});

Template.catadorDetails.events({
  'click .profile-button-update': function(event, template) {
    console.log("clicked update button");

    // call screen for update catador data, except photo
    Modal.show('modalUpdateInfo');
  },
  'click .photo-button-update': function(event, template) {
    console.log("clicked photo button");

    // call screen for update photo of catador
    Modal.show('modalPhotoInfo');
  },
  'click .profile-button-services': function() {
    console.log("clicked services button");
    Modal.show('modalServices');  // call screen of services legends and descriptions
  }
});

Template.imageView.helpers({
  images: function () {
    // retrieve picture for selected catador
    return image;
  }
});

Template.modalUpdateInfo.onRendered (function() {
  setUpdateInitialValues(this);  // call function to load initial (database) data to fields that can be updated
});

// when receive an event that user clicked on a check box, changes session values of this check box to checked or unchecked, depending on its previous state, puts corresponding field to visible or hidden and fill this field with value loaded from database, if it is visible
Template.modalUpdateInfo.events({
  'change #changeNameInfo': function(event, template) {
    if (Session.get('changeName')) {
      Session.set('changeName', false);
      template.find("#name").style.visibility = "hidden";
    }
    else {
      Session.set('changeName', true);
      template.find("#name").style.visibility = "visible";
      template.find("#name").value = Session.get('catador').name;
    }
  },
  'change #changeMiniBioInfo': function(event, template) {
    if (Session.get('changeMiniBio')) {
      Session.set('changeMiniBio', false);
      template.find('#miniBio').style.visibility = "hidden";
    }
    else {
      Session.set('changeMiniBio', true);
      template.find('#miniBio').style.visibility = "visible";
      template.find('#miniBio').value = Session.get('catador').miniBio;
    }
  },
  'change #changeTelephone1Info': function(event, template) {
    if (Session.get('changeTelephone1')) {
      Session.set('changeTelephone1', false);
      template.find('#telephone1').style.visibility = "hidden";
    }
    else {
      Session.set('changeTelephone1', true);
      template.find('#telephone1').style.visibility = "visible";
      template.find('#telephone1').value = Session.get('telephone').telephone1;
    }
  },
  'change #changeOperator1Info': function(event, template) {
    if (Session.get('changeOperator1')) {
      Session.set('changeOperator1', false);
      template.find('#operator_telephone1').style.visibility = "hidden";
    }
    else {
      Session.set('changeOperator1', true);
      template.find('#operator_telephone1').style.visibility = "visible";
      template.find('#operator_telephone1').value = Session.get('telephone').operator_telephone1;
    }
  },
  'change #changeWhatsapp1Info': function(event, template) {
    if (Session.get('changeWhatsapp1')) {
      Session.set('changeWhatsapp1', false);
      template.find('#whatsapp1').style.visibility = "hidden";
    }
    else {
      Session.set('changeWhatsapp1', true);
      template.find('#whatsapp1').style.visibility = "visible";
      template.find('#whatsapp1').checked = Session.get('telephone').whatsapp1;
    }
  },
  'change #changeInternet1Info': function(event, template) {
    if (Session.get('changeInternet1')) {
      Session.set('changeInternet1', false);
      template.find('#internet1').style.visibility = "hidden";
    }
    else {
      Session.set('changeInternet1', true);
      template.find('#internet1').style.visibility = "visible";
      template.find('#internet1').checked = Session.get('telephone').internet1;
    }
  },
  'change #changeTelephone2Info': function(event, template) {
    if (Session.get('changeTelephone2')) {
      Session.set('changeTelephone2', false);
      template.find('#telephone2').style.visibility = "hidden";
    }
    else {
      Session.set('changeTelephone2', true);
      template.find('#telephone2').style.visibility = "visible";
      template.find('#telephone2').value = Session.get('telephone').telephone2;
    }
  },
  'change #changeOperator2Info': function(event, template) {
    if (Session.get('changeOperator2')) {
      Session.set('changeOperator2', false);
      template.find('#operator_telephone2').style.visibility = "hidden";
    }
    else {
      Session.set('changeOperator2', true);
      template.find('#operator_telephone2').style.visibility = "visible";
      template.find('#operator_telephone2').value = Session.get('telephone').operator_telephone2;
    }
  },
  'change #changeWhatsapp2Info': function(event, template) {
    if (Session.get('changeWhatsapp2')) {
      Session.set('changeWhatsapp2', false);
      template.find('#whatsapp2').style.visibility = "hidden";
    }
    else {
      Session.set('changeWhatsapp2', true);
      template.find('#whatsapp2').style.visibility = "visible";
      template.find('#whatsapp2').checked = Session.get('telephone').whatsapp2;
    }
  },
  'change #changeInternet2Info': function(event, template) {
    if (Session.get('changeInternet2')) {
      Session.set('changeInternet2', false);
      template.find('#internet2').style.visibility = "hidden";
    }
    else {
      Session.set('changeInternet2', true);
      template.find('#internet2').style.visibility = "visible";
      template.find('#internet2').checked = Session.get('telephone').internet2;
    }
  },
  'change #changeEmailInfo': function(event, template) {
    if (Session.get('changeEmail')) {
      Session.set('changeEmail', false);
      template.find('#email').style.visibility = "hidden";
    }
    else {
      Session.set('changeEmail', true);
      template.find('#email').style.visibility = "visible";
      template.find('#email').value = Session.get('catador').email;
    }
  },
  'change #changeSocialNetworkInfo': function(event, template) {
    if (Session.get('changeSocialNetwork')) {
      Session.set('changeSocialNetwork', false);
      template.find('#socialNetwork').style.visibility = "hidden";
    }
    else {
      Session.set('changeSocialNetwork', true);
      template.find('#socialNetwork').style.visibility = "visible";
      template.find('#socialNetwork').value = Session.get('catador').socialNetwork;
    }
  },
  'change #changeComplete_addressInfo': function(event, template) {
    if (Session.get('changeComplete_address')) {
      Session.set('changeComplete_address', false);
      template.find('#complete_address').style.visibility = "hidden";
    }
    else {
      Session.set('changeComplete_address', true);
      template.find('#complete_address').style.visibility = "visible";
      template.find('#complete_address').value = Session.get('address').base_address;
    }
  },
  'change #changeRegionInfo': function(event, template) {
    if (Session.get('changeRegion')) {
      Session.set('changeRegion', false);
      template.find('#region').style.visibility = "hidden";
    }
    else {
      Session.set('changeRegion', true);
      template.find('#region').style.visibility = "visible";
      template.find('#region').value = Session.get('address').region;
    }
  },
  'change #changeCarrocaPimpadaInfo': function(event, template) {
    if (Session.get('changeCarrocaPimpada')) {
      Session.set('changeCarrocaPimpada', false);
      template.find('#carrocaPimpada').style.visibility = "hidden";
    }
    else {
      Session.set('changeCarrocaPimpada', true);
      template.find('#carrocaPimpada').style.visibility = "visible";
      template.find('#carrocaPimpada').checked = Session.get('catador').carrocaPimpada;
    }
  },
  'change #changeMotorizedVehicleInfo': function(event, template) {
    if (Session.get('changeMotorizedVehicle')) {
      Session.set('changeMotorizedVehicle', false);
      template.find('#motorizedVehicle').style.visibility = "hidden";
    }
    else {
      Session.set('changeMotorizedVehicle', true);
      template.find('#motorizedVehicle').style.visibility = "visible";
      template.find('#motorizedVehicle').checked = Session.get('catador').motorizedVehicle;
    }
  },
  'change #changeObservationsInfo': function(event, template) {
    if (Session.get('changeObservations')) {
      Session.set('changeObservations', false);
      template.find('#observations').style.visibility = "hidden";
    }
    else {
      Session.set('changeObservations', true);
      template.find('#observations').style.visibility = "visible";
      template.find('#observations').value = Session.get('catador').observations;
    }
  },
  'change #changeServices_recyclableInfo': function(event, template) {
    if (Session.get('changeServices_recyclable')) {
      Session.set('changeServices_recyclable', false);
      template.find('#services_recyclable').style.visibility = "hidden";
    }
    else {
      Session.set('changeServices_recyclable', true);
      template.find('#services_recyclable').style.visibility = "visible";
      template.find('#services_recyclable').checked = Session.get('services').services_recyclable;
    }
  },
  'change #changeServices_glassInfo': function(event, template) {
    if (Session.get('changeServices_glass')) {
      Session.set('changeServices_glass', false);
      template.find('#services_glass').style.visibility = "hidden";
    }
    else {
      Session.set('changeServices_glass', true);
      template.find('#services_glass').style.visibility = "visible";
      template.find('#services_glass').checked = Session.get('services').services_glass;
    }
  },
  'change #changeServices_constructionInfo': function(event, template) {
    if (Session.get('changeServices_construction')) {
      Session.set('changeServices_construction', false);
      template.find('#services_construction').style.visibility = "hidden";
    }
    else {
      Session.set('changeServices_construction', true);
      template.find('#services_construction').style.visibility = "visible";
      template.find('#services_construction').checked = Session.get('services').services_construction;
    }
  },
  'change #changeServices_volumeInfo': function(event, template) {
    if (Session.get('changeServices_volume')) {
      Session.set('changeServices_volume', false);
      template.find('#services_volume').style.visibility = "hidden";
    }
    else {
      Session.set('changeServices_volume', true);
      template.find('#services_volume').style.visibility = "visible";
      template.find('#services_volume').checked = Session.get('services').services_volume;
    }
  },
  'change #changeServices_metalsInfo': function(event, template) {
    if (Session.get('changeServices_metals')) {
      Session.set('changeServices_metals', false);
      template.find('#services_metals').style.visibility = "hidden";
    }
    else {
      Session.set('changeServices_metals', true);
      template.find('#services_metals').style.visibility = "visible";
      template.find('#services_metals').checked = Session.get('services').services_metals;
    }
  },
  'change #changeServices_electronicsInfo': function(event, template) {
    if (Session.get('changeServices_electronics')) {
      Session.set('changeServices_electronics', false);
      template.find('#services_electronics').style.visibility = "hidden";
    }
    else {
      Session.set('changeServices_electronics', true);
      template.find('#services_electronics').style.visibility = "visible";
      template.find('#services_electronics').checked = Session.get('services').services_electronics;
    }
  },
  'change #changeServices_freightInfo': function(event, template) {
    if (Session.get('changeServices_freight')) {
      Session.set('changeServices_freight', false);
      template.find('#services_freight').style.visibility = "hidden";
    }
    else {
      Session.set('changeServices_freight', true);
      template.find('#services_freight').style.visibility = "visible";
      template.find('#services_freight').checked = Session.get('services').services_freight;
    }
  },
  'change #changeServices_other_materialsInfo': function(event, template) {
    if (Session.get('changeServices_other_materials')) {
      Session.set('changeServices_other_materials', false);
      template.find('#services_other_materials').style.visibility = "hidden";

      //handles other materials description field according database value of other materials field
      setServices_Other_Materials_Description(Session.get('services').services_other_materials, template);
    }
    else {
      Session.set('changeServices_other_materials', true);
      template.find('#services_other_materials').style.visibility = "visible";
      template.find('#services_other_materials').checked = Session.get('services').services_other_materials;
    }
  },
  'change #changeServices_other_materials_descriptionInfo': function(event, template) {
    if (Session.get('changeServices_other_materials_description')) {
      Session.set('changeServices_other_materials_description', false);
      template.find('#services_other_materials_description').style.visibility = "hidden";
    }
    else {
      Session.set('changeServices_other_materials_description', true);
      template.find('#services_other_materials_description').style.visibility = "visible";
      template.find('#services_other_materials_description').value = Session.get('services').services_other_materials_description;
    }
  },
  'change #services_other_materials': function(event, template) {
      //handles other materials description field according what user put in other materials field
      setServices_Other_Materials_Description(event.target.checked, template);
  }
});

function setServices_Other_Materials_Description(servicesChecked, template) {
    if (servicesChecked) {  // if other materials is checked (catador works with other materials)
      template.find('#changeServices_other_materials_descriptionInfo').disabled = false;
    }
    else { // if other materials is unchecked (catador doesn't work with other materials)
      template.find('#changeServices_other_materials_descriptionInfo').disabled = true;
      template.find('#changeServices_other_materials_descriptionInfo').checked = false;
      Session.set('changeServices_other_materials_description', false);
      template.find('#services_other_materials_description').style.visibility = "hidden";
    }
};
