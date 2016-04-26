// All methods that call Database stay here

Meteor.methods({

  // TODO: insert records in all tables of database related to catador 
  submitCatadorRegistration: function(formInsertCatador) {

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

    // Make sure the user is logged in before inserting 
    if (! catador.user_id) {
      throw new Meteor.Error('not-authorized');
    }

    Carroceiros.insert(catador, function( errorCarrIns, responseCarrIns ) {
      if ( errorCarrIns ) {
        console.log( "errorCarrIns");
        console.log( errorCarrIns );
        throw new Meteor.Error('');
      } else {
        catador.id = responseCarrIns;

        Carroceiros.update({"_id":catador.id},{$set:{"id":catador.id}}, function( errorCarrUpd, responseCarrUpd ) {
          if ( errorCarrUpd ) {
            console.log( "errorCarrUpd");
            console.log( errorCarrUpd );
          } else {
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

            GeolocationS.insert(geolocation, function( errorGeo, responseGeo ) {
              if ( errorGeo ) {
                console.log( "errorGeo");
                console.log( errorGeo );
              } else {          

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

                AddressS.insert(address, function( errorAddr, responseAddr ) {
                  if ( errorAddr ) {
                    console.log( "errorAddr");
                    console.log( errorAddr );
                  } else {

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

                    TelephoneS.insert(telephone, function( errorTel, responseTel ) {
                      if ( errorTel ) {
                        console.log( "errorTel");
                        console.log( errorTel );
                      } else {

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
                        service.user_id = catador.user_id;
                        service.created_on = catador.created_on;

                        ServiceS.insert(service, function( errorServ, responseServ ) {
                          if ( errorServ ) {
                            console.log( "errorServ");
                            console.log( errorServ );
                          } else {     
                            console.log( "responseServ = " );
                            console.log( responseServ );
                          } // Service insert
                        });

                      } // Telephone insert
                    });

                  }  //Addresses insert
                });

              }  //Geolocation insert
            });

          }  //Carroceiros update
        });

      } //Carroceiros insert
    });
  },

  // TODO: call Django API here to update catador information in Django database
  // Careful to either 
  //    1. prefill form with existing catador information before
  //      shown to user in profile_catador.html
  //    OR
  //    2.only update the fields that are filled out in this doc form, and not insert
  //      the entire doc as is to Django database 
  // IDEAL: Don't use this form, instead customize update for each different elemnet
  updateCatadorDetails: function(doc) {
    console.log("updating catador information");
    console.log(doc);

  }

});