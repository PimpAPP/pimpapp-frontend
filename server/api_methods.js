// All methods that call Database stay here

Meteor.methods({

  // TODO: insert records in all tables of database related to catador 
  submitCatadorRegistration: function(formInsertCatador) {
    try {
      // Make sure the user is logged in before inserting
      if (!Meteor.userId()) {
        console.log(err_no_user_msg);
        throw new Meteor.Error(err_no_user_msg);
      };

      var catador = {
        catador_user_id: String,
        id: String,
        moderation_status: String,
        name: String,
        miniBio: String,
        email: String,
        socialNetwork: String,
        catador_type: String,
        allow_public_edition: Boolean,
        carrocaPimpada: Boolean,
        motorizedVehicle: Boolean,
        observations: String,
        user_id: String,
        created_on: Date
      };

      catador.catador_user_id = null;
      catador.id = null;
      catador.moderation_status = 'P';
      catador.name = formInsertCatador.name;
      catador.catador_type = 'C';
      catador.allow_public_edition = true;
      catador.miniBio = formInsertCatador.miniBio;
      catador.email = formInsertCatador.email;
      catador.socialNetwork = formInsertCatador.socialNetwork;
      catador.carrocaPimpada = formInsertCatador.carrocaPimpada;
      catador.motorizedVehicle = formInsertCatador.motorizedVehicle;
      catador.observations = formInsertCatador.observations;
      catador.user_id = Meteor.userId();
      catador.created_on = new Date();

      var responseCarrIns = Carroceiros.insert(catador);
      if (!responseCarrIns) {
        console.log(responseCarrIns);
        throw new Meteor.Error(err_insert_cat_msg);
      } else {
        catador.id = responseCarrIns;

        var responseCarrUpd = Carroceiros.update({"_id":catador.id},{$set:{"id":catador.id}});
        if (!responseCarrUpd) {
          console.log(responseCarrUpd);
          throw new Meteor.Error(err_insert_cat_id_msg);
        };
      };

      var geolocation = {
        catador_id: String,
        moderation_status: String,
        latitude: Number,
        longitude: Number,
        user_id: String,
        created_on: Date
      };

      geolocation.catador_id = catador.id;
      geolocation.moderation_status = catador.moderation_status;
      geolocation.latitude = formInsertCatador.complete_address.lat;
      geolocation.longitude = formInsertCatador.complete_address.lng;
      geolocation.user_id = catador.user_id;
      geolocation.created_on = catador.created_on;

      var responseGeoIns = GeolocationS.insert(geolocation);
      if (!responseGeoIns) {
        console.log(responseGeoIns);
        throw new Meteor.Error(err_insert_geo_msg);
      };

      var address = {
        catador_id: String,
        moderation_status: String,
        base_address: String,
        region: String,
        city: String,
        state: String,
        country: String,
        zip: String,
        user_id: String,
        created_on: Date
      };

      address.catador_id = catador.id;
      address.moderation_status = catador.moderation_status;
      address.base_address = formInsertCatador.complete_address.fullAddress;
      address.region = formInsertCatador.region;
      address.city = formInsertCatador.complete_address.city;
      address.state = formInsertCatador.complete_address.state;
      address.country = formInsertCatador.complete_address.country;
      address.zip = formInsertCatador.complete_address.zip;
      address.user_id = catador.user_id;
      address.created_on = catador.created_on;

      var responseAddrIns = AddressS.insert(address);
      if (!responseAddrIns) {
        console.log(responseAddrIns);
        throw new Meteor.Error(err_insert_addr_msg);
      }

      var telephone = {
        catador_id: String,
        moderation_status: String,
        telephone1: Number,
        operator_telephone1: String,
        whatsapp1: Boolean,
        internet1: Boolean,
        telephone2: Number,
        operator_telephone2: String,
        whatsapp2: Boolean,
        internet2: Boolean,
        user_id: String,
        created_on: Date
      };

      telephone.catador_id = catador.id;
      telephone.moderation_status = catador.moderation_status;
      telephone.telephone1 = formInsertCatador.telephone1;
      telephone.operator_telephone1 = formInsertCatador.operator_telephone1;
      telephone.whatsapp1 = formInsertCatador.whatsapp1;
      telephone.internet1 = formInsertCatador.internet1;
      telephone.telephone2 = formInsertCatador.telephone2;
      telephone.operator_telephone2 = formInsertCatador.operator_telephone2;
      telephone.whatsapp2 = formInsertCatador.whatsapp2;
      telephone.internet2 = formInsertCatador.internet2;
      telephone.user_id = catador.user_id;
      telephone.created_on = catador.created_on;

      var responseTelIns = TelephoneS.insert(telephone);
      if (!responseTelIns) {
        console.log(responseTelIns);
        throw new Meteor.Error(err_insert_tel_msg);
      };

      var service = {
        catador_id: String,
        moderation_status: String,
        services_recyclable: Boolean,
        services_glass: Boolean,
        services_construction: Boolean,
        services_volume: Boolean,
        services_metals: Boolean,
        services_electronics: Boolean,
        services_freight: Boolean,
        services_other_materials: Boolean,
        services_other_materials_description: String,
        user_id: String,
        created_on: Date
      };

      service.catador_id = catador.id;
      service.moderation_status = catador.moderation_status;
      service.services_recyclable = formInsertCatador.services_recyclable;
      service.services_glass = formInsertCatador.services_glass;
      service.services_construction = formInsertCatador.services_construction;
      service.services_volume = formInsertCatador.services_volume;
      service.services_metals = formInsertCatador.services_metals;
      service.services_electronics = formInsertCatador.services_electronics;
      service.services_freight = formInsertCatador.services_freight;
      service.services_other_materials = formInsertCatador.services_other_materials;
      service.services_other_materials_description = formInsertCatador.services_other_materials_description;

      service.user_id = catador.user_id;
      service.created_on = catador.created_on;

      var responseServIns = ServiceS.insert(service);
      if (!responseServIns) {
        console.log(responseServIns);
        throw new Meteor.Error(err_insert_serv_msg);
      };

      if (formInsertCatador.full_photo) {
        var responsePhotoUpd = Images.update({"_id":formInsertCatador.full_photo},{$set:{"catador_id":catador.id, "moderation_status":catador.moderation_status}}); 
        if (!responsePhotoUpd) {
          console.log(responsePhotoUpd);
          throw new Meteor.Error(err_insert_photo_msg);
        };
      };
    } // try
    catch (error) {
      console.log("Error in submitCatadorRegistration");
      console.log(error);
      if (error.error) {
        throw new Meteor.Error(error.error);
      } else {
        throw new Meteor.Error(err_system_msg);
      };
    };
  },

  // Insert new records according fields that user wants to update and update previous record with moderation status equal to "Historic" - "H"
  updateCatadorDetails: function(formUpdateCatador) {
    try {
      // Make sure the user is logged in before updating
      if (!Meteor.userId()) {
        console.log(err_no_user_msg);
        throw new Meteor.Error(err_no_user_msg);
      };

      var bol_itemChecked = false;
      var all_moderation_status = 'P';
      var all_user_id = Meteor.userId();
      var all_created_on = new Date();

      // if there is at least one field to update in catador table, prepare new record for insertion
      if (formUpdateCatador.changeNameInfo || formUpdateCatador.changeMiniBioInfo || formUpdateCatador.changeEmailInfo || formUpdateCatador.changeSocialNetworkInfo || formUpdateCatador.changeCarrocaPimpadaInfo || formUpdateCatador.changeMotorizedVehicleInfo || formUpdateCatador.changeObservationsInfo) {
        bol_itemChecked = true;
        var catador = Carroceiros.findOne({$and: [{'id': formUpdateCatador.id},{'moderation_status': {$in: statusShow}}]});

        //_id field (underscore id) is internal primary key - don't confuse with id field, that is logical auto relationship for father's record - _id is deleted from json structure for BD generate a new primary key for record being inserted; _id is saved in another field to update previous record moderation status field with "Historic" value
        var _idCatador = catador._id;
        delete catador["_id"];

        // don't change catador.id field - it is always the same for all historic records of one catador
        catador.catador_user_id = null;
        catador.moderation_status = all_moderation_status;
        catador.catador_type = 'C';
        catador.allow_public_edition = true;
        catador.user_id = all_user_id;
        catador.created_on = all_created_on;

        //Verify with fields user requests to update in catador table
        if (formUpdateCatador.changeNameInfo) {
          catador.name = formUpdateCatador.insertFields.name;
        };
        if (formUpdateCatador.changeMiniBioInfo) {
          catador.miniBio = formUpdateCatador.insertFields.miniBio;
        };
        if (formUpdateCatador.changeEmailInfo) {
          catador.email = formUpdateCatador.insertFields.email;
        };
        if (formUpdateCatador.changeSocialNetworkInfo) {
          catador.socialNetwork = formUpdateCatador.insertFields.socialNetwork;
        };
        if (formUpdateCatador.changeCarrocaPimpadaInfo) {
          catador.carrocaPimpada = formUpdateCatador.insertFields.carrocaPimpada;
        };
        if (formUpdateCatador.changeMotorizedVehicleInfo) {
          catador.motorizedVehicle = formUpdateCatador.insertFields.motorizedVehicle;
        };
        if (formUpdateCatador.changeObservationsInfo) {
          catador.observations = formUpdateCatador.insertFields.observations;
        };

        var responseCarrIns = Carroceiros.insert(catador);
        if (!responseCarrIns) {
          console.log(responseCarrIns);
          throw new Meteor.Error(err_update_cat_msg);
        } else {
          var responseCarrUpd = Carroceiros.update({"_id":_idCatador},{$set:{"moderation_status":"H"}});
          if (!responseCarrUpd) {
            console.log(responseCarrUpd);
            throw new Meteor.Error(err_update_hist_cat_msg);
          }; //if (!responseCarrUpd)
        }; //if (!responseCarrIns)
      }; //if (formUpdateCatador.changeNameInfo || ...

      // if there is at least one field to update in telephone table, prepare new record for insertion
      if (formUpdateCatador.changeTelephone1Info || formUpdateCatador.changeOperator1Info || formUpdateCatador.changeWhatsapp1Info || formUpdateCatador.changeInternet1Info || formUpdateCatador.changeTelephone2Info || formUpdateCatador.changeOperator2Info || formUpdateCatador.changeWhatsapp2Info || formUpdateCatador.changeInternet2Info) {
        bol_itemChecked = true;
        var telephone = TelephoneS.findOne({$and: [{'catador_id':formUpdateCatador.id}, {'moderation_status': {$in: statusShow}}]});

        //_id field (underscore id) is internal primary key - it is deleted from json structure for BD generate a new primary key for record being inserted; _id is saved in another field to update previous record moderation status field with "Historic" value
        var _idTelephone = telephone._id;
        delete telephone["_id"];

        // don't change telephone.catador_id field - it is always the same for all historic records of one catador
        telephone.moderation_status = all_moderation_status;
        telephone.user_id = all_user_id;
        telephone.created_on = all_created_on;

        //Verify with fields user requests to update in catador table
        if (formUpdateCatador.changeTelephone1Info) {
          telephone.telephone1 = formUpdateCatador.insertFields.telephone1;
        };
        if (formUpdateCatador.changeOperator1Info) {
          telephone.operator_telephone1 = formUpdateCatador.insertFields.operator_telephone1;
        };
        if (formUpdateCatador.changeWhatsapp1Info) {
          telephone.whatsapp1 = formUpdateCatador.insertFields.whatsapp1;
        };
        if (formUpdateCatador.changeInternet1Info) {
          telephone.internet1 = formUpdateCatador.insertFields.internet1;
        };
        if (formUpdateCatador.changeTelephone2Info) {
          telephone.telephone2 = formUpdateCatador.insertFields.telephone2;
        };
        if (formUpdateCatador.changeOperator2Info) {
          telephone.operator_telephone2 = formUpdateCatador.insertFields.operator_telephone2;
        };
        if (formUpdateCatador.changeWhatsapp2Info) {
          telephone.whatsapp2 = formUpdateCatador.insertFields.whatsapp2;
        };
        if (formUpdateCatador.changeInternet2Info) {
          telephone.internet2 = formUpdateCatador.insertFields.internet2;
        };

        var responseTelIns = TelephoneS.insert(telephone);
        if (!responseTelIns) {
          console.log(responseTelIns);
          throw new Meteor.Error(err_update_tel_msg);
        } else {
          var responseTelUpd = TelephoneS.update({"_id":_idTelephone},{$set:{"moderation_status":"H"}});
          if (!responseTelUpd) {
            console.log(responseTelUpd);
            throw new Meteor.Error(err_update_hist_tel_msg);
          }; //if (!responseTelUpd)
        }; //if (!responseTelIns)
      }; //if (formUpdateCatador.changeTelephone1Info || ...

      // if there is at least one field to update in address table, prepare new record for insertion
      if (formUpdateCatador.changeComplete_addressInfo || formUpdateCatador.changeRegionInfo) {
        bol_itemChecked = true;
        var address = AddressS.findOne({$and: [{'catador_id':formUpdateCatador.id}, {'moderation_status': {$in: statusShow}}]});

        //_id field (underscore id) is internal primary key - it is deleted from json structure for BD generate a new primary key for record being inserted; _id is saved in another field to update previous record moderation status field with "Historic" value
        var _idAddress = address._id;
        delete address["_id"];

        // don't change address.catador_id field - it is always the same for all historic records of one catador
        address.moderation_status = all_moderation_status;
        address.user_id = all_user_id;
        address.created_on = all_created_on;

        //Verify with fields user requests to update in catador table
        if (formUpdateCatador.changeComplete_addressInfo) {
        // If address was changed, insert corresponding record for geolocation and update previous one status to "Historic"
          var geolocation = {
            catador_id: String,
            moderation_status: String,
            latitude: Number,
            longitude: Number,
            user_id: String,
            created_on: Date
          };

          geolocation.catador_id = address.catador_id;
          geolocation.moderation_status = all_moderation_status;
          geolocation.latitude = formUpdateCatador.insertFields.complete_address.lat;
          geolocation.longitude = formUpdateCatador.insertFields.complete_address.lng;
          geolocation.user_id = all_user_id;
          geolocation.created_on = all_created_on;

          var responseGeoIns = GeolocationS.insert(geolocation);
          if (!responseGeoIns) {
            console.log(responseGeoIns);
            throw new Meteor.Error(err_update_geo_msg);
          } else {
            var responseGeoUpd = GeolocationS.update({$and: [{'catador_id':formUpdateCatador.id}, {'moderation_status': {$in: statusShow}}]},{$set:{"moderation_status":"H"}});
            if (!responseGeoUpd) {
              console.log(responseGeoUpd);
              throw new Meteor.Error(err_update_hist_geo_msg);
            }; //if (!responseGeoUpd)
          }; //if (!responseGeoIns)

          // Change addresses fields
          address.base_address = formUpdateCatador.insertFields.complete_address.fullAddress;
          address.city = formUpdateCatador.insertFields.complete_address.city;
          address.state = formUpdateCatador.insertFields.complete_address.state;
          address.country = formUpdateCatador.insertFields.complete_address.country;
          address.zip = formUpdateCatador.insertFields.complete_address.zip;
        };
        if (formUpdateCatador.changeRegionInfo) {
          address.region = formUpdateCatador.insertFields.region;
        };

        var responseAddrIns = AddressS.insert(address);
        if (!responseAddrIns) {
          console.log(responseAddrIns);
          throw new Meteor.Error(err_update_addr_msg);
        } else {
          var responseAddrUpd = AddressS.update({"_id":_idAddress},{$set:{"moderation_status":"H"}});
          if (!responseAddrUpd) {
            console.log(responseAddrUpd);
            throw new Meteor.Error(err_update_hist_addr_msg);
          }; //if (!responseAddrUpd)
        }; //if (!responseAddrIns)
      }; //if (formUpdateCatador.changeComplete_addressInfo || ...

      // if there is at least one field to update in services table, prepare new record for insertion
      if (formUpdateCatador.changeServices_recyclableInfo || formUpdateCatador.changeServices_glassInfo || formUpdateCatador.changeServices_constructionInfo || formUpdateCatador.changeServices_volumeInfo || formUpdateCatador.changeServices_metalsInfo || formUpdateCatador.changeServices_electronicsInfo || formUpdateCatador.changeServices_freightInfo || formUpdateCatador.changeServices_other_materialsInfo || formUpdateCatador.changeServices_other_materials_descriptionInfo) {
        bol_itemChecked = true;
        var service = ServiceS.findOne({$and: [{'catador_id':formUpdateCatador.id}, {'moderation_status': {$in: statusShow}}]});

        //_id field (underscore id) is internal primary key - it is deleted from json structure for BD generate a new primary key for record being inserted; _id is saved in another field to update previous record moderation status field with "Historic" value
        var _idService = service._id;
        delete service["_id"];

        // don't change service.catador_id field - it is always the same for all historic records of one catador
        service.moderation_status = all_moderation_status;
        service.user_id = all_user_id;
        service.created_on = all_created_on;

        //Verify with fields user requests to update in catador table
        if (formUpdateCatador.changeServices_recyclableInfo) {
          service.services_recyclable = formUpdateCatador.insertFields.services_recyclable;
        };
        if (formUpdateCatador.changeServices_glassInfo) {
          service.services_glass = formUpdateCatador.insertFields.services_glass;
        };
        if (formUpdateCatador.changeServices_constructionInfo) {
          service.services_construction = formUpdateCatador.insertFields.services_construction;
        };
        if (formUpdateCatador.changeServices_volumeInfo) {
          service.services_volume = formUpdateCatador.insertFields.services_volume;
        };
        if (formUpdateCatador.changeServices_metalsInfo) {
          service.services_metals = formUpdateCatador.insertFields.services_metals;
        };
        if (formUpdateCatador.changeServices_electronicsInfo) {
          service.services_electronics = formUpdateCatador.insertFields.services_electronics;
        };
        if (formUpdateCatador.changeServices_freightInfo) {
          service.services_freight = formUpdateCatador.insertFields.services_freight;
        };
        if (formUpdateCatador.changeServices_other_materialsInfo) {
          service.services_other_materials = formUpdateCatador.insertFields.services_other_materials;
          //if unchecked other materials services (catador doesn't make this service) then corresponding description must be null
          if (!service.services_other_materials) {
            service.services_other_materials_description = "";
          };
        };
        if (formUpdateCatador.changeServices_other_materials_descriptionInfo) {
          service.services_other_materials_description = formUpdateCatador.insertFields.services_other_materials_description;
        };

        var responseServIns = ServiceS.insert(service);
        if (!responseServIns) {
          console.log(responseServIns);
          throw new Meteor.Error(err_update_serv_msg);
        } else {
          var responseServUpd = ServiceS.update({"_id":_idService},{$set:{"moderation_status":"H"}});
          if (!responseServUpd) {
            console.log(responseServUpd);
            throw new Meteor.Error(err_update_hist_serv_msg);
          }; //if (!responseServUpd)
        }; //if (!responseServIns)
      }; //if (formUpdateCatador.changeServices_recyclableInfo || ...

      if (!bol_itemChecked) {
        throw new Meteor.Error(err_no_item_msg);
      };
    } // try
    catch (error) {
      console.log("Error in updateCatadorDetails");
      console.log(error);
      if (error.error) {
        throw new Meteor.Error(error.error);
      } else {
        throw new Meteor.Error(err_system_msg);
      };
    };
  },

  //Update photo of catador
  updatePhotoDetails: function(formPhotoCatador) {
    try {
      // Make sure the user is logged in before updating
      if (!Meteor.userId()) {
        console.log(err_no_user_msg);
        throw new Meteor.Error(err_no_user_msg);
      };

      // Make sure the user uploaded a photo
      if (!formPhotoCatador.full_photo) {
        console.log(err_no_photo_msg);
        throw new Meteor.Error(err_no_photo_msg);
      };

      //Retrieve current photo from database to know if it is needed to update previous photo moderation status to "Historic"
      var currPhoto = Images.findOne({$and: [{'catador_id':formPhotoCatador.id}, {'moderation_status': {$in: statusShow}}]});

      var responsePhotoUpd = Images.update({"_id":formPhotoCatador.full_photo},{$set:{"catador_id":formPhotoCatador.id, "moderation_status":"P"}}); 
      if (!responsePhotoUpd) {
        console.log(responsePhotoUpd);
        throw new Meteor.Error(err_update_photo_msg);
      } else if (currPhoto) {
        var responsePhotoHistUpd = Images.update({"_id":currPhoto._id},{$set:{"moderation_status":"H"}});
        if (!responsePhotoHistUpd) {
          console.log(responsePhotoHistUpd);
          throw new Meteor.Error(err_update_hist_photo_msg);
        } //if (!responsePhotoHistUpd)
      }; //if (!responsePhotoUpd)
    } // try
    catch (error) {
      console.log("Error in updatePhotoDetails");
      console.log(error);
      if (error.error) {
        throw new Meteor.Error(error.error);
      } else {
        throw new Meteor.Error(err_system_msg);
      };
    };
  },

  //Sets status of catador according to parameters - available only for admin users
  'setStatusCatador' (_id, status) {
    try {
      // Make sure the user is logged in before inserting
      if (!isUserAdm()) {
        console.log(err_access_adm_msg);
        throw new Meteor.Error(err_access_adm_msg);
      };

      var deletedOn = null;
      if (status == 'D') {
        deletedOn = new Date();
      }
      Carroceiros.update({"_id": _id}, {$set:{"moderation_status":status, deleted_on: deletedOn}});
    } // try
    catch (error) {
      console.log("Error in setStatusCatador");
      console.log(error);
      if (error.error) {
        throw new Meteor.Error(error.error);
      } else {
        throw new Meteor.Error(err_system_msg);
      };
    };
  }
});