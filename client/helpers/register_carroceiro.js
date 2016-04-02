Template.catadorForm.events({

'submit form': function(event){
    event.preventDefault();
    var catador = {
      moderation_status: String,
      name: String,
      catador_type: String,
      address_base: String,
      region: String,
      city: String,
      country: String,
      motorizedVehicle: Boolean,
      carrocaPimpada: Boolean
    };
    catador.moderation_status = 'P';
    catador.name = event.target.name.value;
    catador.catador_type = 'C';
    catador.address_base = event.target.address_base.value;
    catador.region = event.target.region.value;
    catador.city = event.target.city.value;
    catador.country = event.target.country.value;
    catador.motorizedVehicle = event.target.motorizedVehicle.value;
    catador.carrocaPimpada = event.target.carrocaPimpada.value;

    //call meteor method named submitCatadorRegistration with parameter catador
    Meteor.call('submitCatadorRegistration', catador, function(error, result) {
      if (error) {
        alert(error);
      }
    });
}
});