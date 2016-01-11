
CarroceiroData = new Mongo.Collection('carroceiros');

if (Meteor.isClient) {
  Template.addCarroceiroForm.events({
    'submit form': function(event) {
      event.preventDefault();
      var carroceiroName = event.target.carroceiroName.value;
      var carroceiroLocation = event.target.carroceiroLocation.value;
      console.log('Form submitted. Carroceiro name: ' + carroceiroName + ', Location: ' + carroceiroLocation);

      CarroceiroData.insert({
        'name': carroceiroName,
        'location': carroceiroLocation
      });
    }
  });
}
