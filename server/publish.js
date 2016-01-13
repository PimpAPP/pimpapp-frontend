Meteor.publish('catadores', function() {
    return Catadores.find();
});

Meteor.publish('images', function() {
    return Images.find();
});