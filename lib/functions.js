if (Meteor.isClient) {
  // gets id of catador from url used in page requisition (/catadorprofile/<id>)
  getCatadorIdFromUrl = function getCatadorIdFromUrl() {
    // gets url of current page
    var currentUrl = Router.current().originalUrl;

    // retrieves path
    var a = document.createElement('a');
    a.href = currentUrl;
    var pathname = a.pathname;

    // pathname takes form /catadorprofile/<id>
    var id = pathname.split('/catadorprofile/')[1]
    return id;
  };

  // sets session variables for catador data retrieved from database
  setStoredValues = function setStoredValues() {
    var catador = Carroceiros.findOne({$and: [{'id': getCatadorIdFromUrl()},{'moderation_status': {$in: statusShow}}]});
    Session.set('catador', catador);

    var address = AddressS.findOne({$and: [{'catador_id':catador.id}, {'moderation_status': {$in: statusShow}}]});
    Session.set('address', address);

    var telephone = TelephoneS.findOne({$and: [{'catador_id':catador.id}, {'moderation_status': {$in: statusShow}}]});
    Session.set('telephone', telephone);

    var services = ServiceS.findOne({$and: [{'catador_id':catador.id}, {'moderation_status': {$in: statusShow}}]});
    Session.set('services', services);
  };

  // sets initial values for fields in update catador page
  setUpdateInitialValues = function setUpdateInitialValues(template) {
    // when calling update screen initially or after submit, unchecks all check boxes that indicate that user wants to update that field and makes hidden all corresponding fields
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
    if (Session.get('services').services_other_materials) {
      template.find('#changeServices_other_materials_descriptionInfo').disabled = false;
    } else {
      template.find('#changeServices_other_materials_descriptionInfo').disabled = true;
    }
  };
};

// Put a 0 (zero) to left of string, case its lenght is shorter than 2.
zeroPad = function zeroPad(number) {
  return ("0"+number).substr(-2,2);
};

//Verify if current user is administrator and issues an error message if not.
isUserAdm = function isUserAdm() {
  // Make sure the user is logged in before inserting
  if (!Meteor.userId()) {
    if (Meteor.isClient) {
      FlashMessages.clear();
      FlashMessages.sendError(err_no_user_msg, {autoHide: false});  // shows error message that doesn't hide
      return false;
    } else {
      console.log(err_no_user_msg);
      throw new Meteor.Error(err_no_user_msg);
    }
  };

  var current_user = Meteor.users.findOne({'_id': Meteor.userId()});
  if (current_user.profile.user_type == 'A') { //user is administrator
    return true;
  }
  else //user is not administrator
  {
    FlashMessages.clear();
    FlashMessages.sendError(err_access_adm_msg, {autoHide: false});  // shows error message that doesn't hide
    return false;
  }
};