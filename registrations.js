CarroceiroData = new Mongo.Collection('carroceiros');

if (Meteor.isServer) {
  Meteor.publish('carroceiros', function() {
    return CarroceiroData.find();
  });
}


if (Meteor.isClient) {
  Template.addCarroceiroForm.events({
    'submit form': function(event) {
      event.preventDefault();

      // retrieve form data
      var carroceiroName = event.target.carroceiroName.value;
      var carroceiroLocation = event.target.desiredAddress.value;
      var carroceiroTelephone = event.target.carroceiroTelephone.value;
      
      // TODO: retrieve tipo de servicos
      // TODO: retrieve outra informacao

      console.log('Form submitted. Carroceiro name: ' + carroceiroName + ', Location: ' + carroceiroLocation);

      Meteor.call('insertCarroceiro', carroceiroName, carroceiroLocation, carroceiroTelephone);
      
      // clear form
      document.getElementById("carroceiroRegistrationForm").reset();
    }
  });
}

Meteor.methods({
  'insertCarroceiro': function(name, address, telephone) {
    CarroceiroData.insert({
      'name': name,
      'address': address,
      'telephone': telephone
    });
  }
});
