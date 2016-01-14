
// Variables:
// selectedCarroceiroID is defined in lib/str_variables.js

Template.imageView.helpers({
  images: function () {
    // retrieve picture for selected catador
    var catador = Catadores.findOne(Session.get(selectedCarroceiroID));
    var img = Images.find({'_id': catador.picture});
    return img;
  }
});


// TODO: now only works for catadores
// design general way of storing carroceiro id and retrieve correct object
// idea: create separate profile for catador, cooperativa, ponto de entrega
//      then this takes care of it?
Template.CatadorDetails.helpers({
  
  name: function() {
    var catador = Catadores.findOne(Session.get(selectedCarroceiroID));
    return catador.name;
  },

  telephone: function() {
    var catador = Catadores.findOne(Session.get(selectedCarroceiroID));
    return catador.telephone;
  },
  
  whatsapp: function() {
    var catador = Catadores.findOne(Session.get(selectedCarroceiroID));
    if (catador.whatsapp) {
      return "Sim";
    }
    else {
      return 'Não';
    }
  }
});