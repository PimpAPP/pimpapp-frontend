
Carroceiros = new Mongo.Collection('carroceiros');

if (Meteor.isServer) {
    Meteor.publish('carroceiros', function() {
        return Carroceiros.find();
    });
    
    Meteor.publish('images', function() {
        return Images.find();
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

