if (Meteor.isClient) {
  getCatadorIdFromUrl = function getCatadorIdFromUrl() {
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

  updateStoredValues = function updateStoredValues() {
    catador = Carroceiros.findOne({$and: [{'id': getCatadorIdFromUrl()},{'moderation_status': {$in: statusShow}}]});

    address = AddressS.findOne({$and: [{'catador_id':catador.id}, {'moderation_status': {$in: statusShow}}]});

    telephone = TelephoneS.findOne({$and: [{'catador_id':catador.id}, {'moderation_status': {$in: statusShow}}]});

    services = ServiceS.findOne({$and: [{'catador_id':catador.id}, {'moderation_status': {$in: statusShow}}]});
  };

  setUpdateInitialValues = function setUpdateInitialValues(template) {
    // when calling update screen initially or after submit, uncheck all check boxes that indicate that user wants to update that field
    Session.set('changeName', false);
    Session.set('changeMiniBio', false);
    Session.set('changeTelephone1', false);
    Session.set('changeOperator1', false);
    Session.set('changeWhatsapp1', false);
    Session.set('changeInternet1', false);
    Session.set('changeTelephone2', false);
    Session.set('changeOperator2', false);
    Session.set('changeWhatsapp2', false);
    Session.set('changeInternet2', false);
    Session.set('changeEmail', false);
    Session.set('changeSocialNetwork', false);
    Session.set('changeComplete_address', false);
    Session.set('changeRegion', false);
    Session.set('changeCarrocaPimpada', false);
    Session.set('changeMotorizedVehicle', false);
    Session.set('changeObservations', false);

    Session.set('changeServices_recyclable', false);
    Session.set('changeServices_glass', false);
    Session.set('changeServices_construction', false);
    Session.set('changeServices_volume', false);
    Session.set('changeServices_metals', false);
    Session.set('changeServices_electronics', false);
    Session.set('changeServices_freight', false);
    Session.set('changeServices_other_materials', false);
    Session.set('changeServices_other_materials_description', false);

    template.find("#name").style.visibility = "hidden";
    template.find("#miniBio").style.visibility = "hidden";
    template.find("#telephone1").style.visibility = "hidden";
    template.find("#operator_telephone1").style.visibility = "hidden";
    template.find("#whatsapp1").style.visibility = "hidden";
    template.find("#internet1").style.visibility = "hidden";
    template.find("#telephone2").style.visibility = "hidden";
    template.find("#operator_telephone2").style.visibility = "hidden";
    template.find("#whatsapp2").style.visibility = "hidden";
    template.find("#internet2").style.visibility = "hidden";
    template.find("#email").style.visibility = "hidden";
    template.find("#socialNetwork").style.visibility = "hidden";
    template.find("#complete_address").style.visibility = "hidden";
    template.find("#region").style.visibility = "hidden";
    template.find("#carrocaPimpada").style.visibility = "hidden";
    template.find("#motorizedVehicle").style.visibility = "hidden";
    template.find("#observations").style.visibility = "hidden";

    template.find("#services_recyclable").style.visibility = "hidden";
    template.find("#services_glass").style.visibility = "hidden";
    template.find("#services_construction").style.visibility = "hidden";
    template.find("#services_volume").style.visibility = "hidden";
    template.find("#services_metals").style.visibility = "hidden";
    template.find("#services_electronics").style.visibility = "hidden";
    template.find("#services_freight").style.visibility = "hidden";
    template.find("#services_other_materials").style.visibility = "hidden";
    template.find("#services_other_materials_description").style.visibility = "hidden";

    //when loading, if other services field is checked in catador record than check box for other services description is enabled
    if (services.services_other_materials) {
      template.find('#changeServices_other_materials_descriptionInfo').disabled = false;
    } else {
      template.find('#changeServices_other_materials_descriptionInfo').disabled = true;
    }
  };
};
