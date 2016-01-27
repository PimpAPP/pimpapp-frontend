
Carroceiros = new Mongo.Collection('carroceiros');
Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    Meteor.publish('carroceiros', function() {
        return Carroceiros.find();
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

