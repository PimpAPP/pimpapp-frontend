
Carroceiros = new Mongo.Collection('carroceiros');
GeolocationS = new Mongo.Collection('geolocations');
AddressS = new Mongo.Collection('addresses');
TelephoneS = new Mongo.Collection('telephones');
ServiceS = new Mongo.Collection('services');
Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    Meteor.publish('carroceiros', function() {
        return Carroceiros.find();
    });

    Meteor.publish('addresses', function() {
        return AddressS.find();
    });

    Meteor.publish('geolocations', function() {
        return GeolocationS.find();
    });

    Meteor.publish('telephones', function() {
        return TelephoneS.find();
    });

    Meteor.publish('services', function() {
        return ServiceS.find();
    });
  
    Meteor.publish('images', function() {
        return Images.find();
    });
    
    Meteor.publish('posts', function() {
        return Posts.find();
    });


    // Meteor.publish('catadores', function() {
    //     return Catadores.find();
    // });

    // Meteor.publish('cooperativas', function() {
    //     return Cooperativas.find();
    // });

    // Meteor.publish('pontodeentregas', function() {
    //     return PontoDeEntregas.find();
    // })
};

