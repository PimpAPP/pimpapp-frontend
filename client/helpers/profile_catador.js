

Template.catadorprofile.onCreated(function() {
  // TODO: ideally not stop these subscriptions when profile is closed
  // because now has to subscribe every time new profile is loaded
  this.subscribe('images');
  this.subscribe('carroceiros');
  this.subscribe('addresses');
  this.subscribe('telephones');
  this.subscribe('services');
  this.subscribe('posts');
});

Template.catadorDetails.onCreated(function() {
  catador = Carroceiros.findOne({$and: [{'id': getCatadorIdFromUrl()},{'moderation_status': {$in: statusShow}}]});

  telephone = TelephoneS.findOne({$and: [{'catador_id':catador.id}, {'moderation_status': {$in: statusShow}}]});

  address = AddressS.findOne({$and: [{'catador_id':catador.id}, {'moderation_status': {$in: statusShow}}]});

  services = ServiceS.findOne({$and: [{'catador_id':catador.id}, {'moderation_status': {$in: statusShow}}]});
});

Template.catadorDetails.helpers({
  name: function() {
    return catador.name;
  },

  miniBio: function() {
    return catador.miniBio;
  },

  telephone1: function() {
    return telephone.telephone1;
  },

  telephone2: function() {
    return telephone.telephone2;
  },
  operator_telephone1: function() {
    var operator = telephone.operator_telephone1;
    if (operator) return '(' + operator + ')';
    return '';
  },
  operator_telephone2: function() {
    var operator = telephone.operator_telephone2;
    if (operator) return '(' + operator + ')';
    return '';
  },

  whatsapp1: function() {
    return telephone.whatsapp1;
  },

  whatsapp2: function() {
    return telephone.whatsapp2;
  },

  internet1: function() {
    return telephone.internet1;
  },

  internet2: function() {
    return telephone.internet2;
  },

  email: function() {
    return catador.email;
  },

  socialNetwork: function() {
    return catador.socialNetwork;
  },

  complete_address: function() {
    return address.base_address;
  },

  region: function() {
    return address.region;
  },

  city: function() {
    return address.city;
  },

  state: function() {
    return address.state;
  },

  country: function() {
    return address.country;
  },

  zip: function() {
    return address.zip;
  },

  carrocaPimpada: function() {
    var returnVal = (catador.carrocaPimpada)? 'Sim' : 'N\u00e3o';
    return returnVal;
  },

  motorizedVehicle: function() {
    var returnVal = (catador.motorizedVehicle)? 'Sim' : 'N\u00e3o';
    return returnVal;
  },

  observations: function() {
    return catador.observations;
  },

  // services

  services_recyclable: function() {
    return services.services_recyclable;
  },
  services_glass: function() {
    return services.services_glass;
  },
  services_construction: function() {
    return services.services_construction;
  },
  services_volume: function() {
    return services.services_volume;
  },
  services_metals: function() {
    return services.services_metals;
  },      
  services_electronics: function() {
    return services.services_electronics;
  },
  services_freight: function() {
    return services.services_freight;
  },      
  services_other_materials: function() {
    return services.services_other_materials;
  },      
  services_other_materials_description: function() {
    return services.services_other_materials_description;
  }
});


Template.catadorDetails.events({
  'click .profile-button-update': function(event, template) {
    console.log("clicked update button");

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
    var img = Images.find({$and: [{'catador_id':catador.id}, {'moderation_status': {$in: statusShow}}]});
    return img;
  }
});

Template.modalUpdateInfo.onRendered (function() {
  setUpdateInitialValues(this);
});

Template.modalUpdateInfo.events({
  'submit': function(event, template) {
    //setUpdateInitialValues(template);
  },
  'change #changeNameInfo': function(event, template) {
    if (Session.get('changeName')) {
      Session.set('changeName', false);
      template.find("#name").style.visibility = "hidden";
    }
    else {
      Session.set('changeName', true);
      template.find("#name").style.visibility = "visible";
      template.find("#name").value = catador.name;
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
      template.find('#miniBio').value = catador.miniBio;
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
      template.find('#telephone1').value = telephone.telephone1;
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
      template.find('#operator_telephone1').value = telephone.operator_telephone1;
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
      template.find('#whatsapp1').checked = telephone.whatsapp1;
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
      template.find('#internet1').checked = telephone.internet1;
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
      template.find('#telephone2').value = telephone.telephone2;
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
      template.find('#operator_telephone2').value = telephone.operator_telephone2;
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
      template.find('#whatsapp2').checked = telephone.whatsapp2;
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
      template.find('#internet2').checked = telephone.internet2;
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
      template.find('#email').value = catador.email;
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
      template.find('#socialNetwork').value = catador.socialNetwork;
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
      template.find('#complete_address').value = address.base_address;
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
      template.find('#region').value = address.region;
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
      template.find('#carrocaPimpada').checked = catador.carrocaPimpada;
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
      template.find('#motorizedVehicle').checked = catador.motorizedVehicle;
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
      template.find('#observations').value = catador.observations;
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
      template.find('#services_recyclable').checked = services.services_recyclable;
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
      template.find('#services_glass').checked = services.services_glass;
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
      template.find('#services_construction').checked = services.services_construction;
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
      template.find('#services_volume').checked = services.services_volume;
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
      template.find('#services_metals').checked = services.services_metals;
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
      template.find('#services_electronics').checked = services.services_electronics;
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
      template.find('#services_freight').checked = services.services_freight;
    }
  },
  'change #changeServices_other_materialsInfo': function(event, template) {
    if (Session.get('changeServices_other_materials')) {
      Session.set('changeServices_other_materials', false);
      template.find('#services_other_materials').style.visibility = "hidden";

      setServices_Other_Materials_Description(services.services_other_materials, template);
    }
    else {
      Session.set('changeServices_other_materials', true);
      template.find('#services_other_materials').style.visibility = "visible";
      template.find('#services_other_materials').checked = services.services_other_materials;
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
      template.find('#services_other_materials_description').value = services.services_other_materials_description;
    }
  },
  'change #services_other_materials': function(event, template) {
      setServices_Other_Materials_Description(event.target.checked, template);
  }
});

function setServices_Other_Materials_Description(servicesChecked, template) {
    if (servicesChecked) {
      template.find('#changeServices_other_materials_descriptionInfo').disabled = false;
    }
    else {
      template.find('#changeServices_other_materials_descriptionInfo').disabled = true;
      template.find('#changeServices_other_materials_descriptionInfo').checked = false;
      Session.set('changeServices_other_materials_description', false);
      template.find('#services_other_materials_description').style.visibility = "hidden";
    }
};
