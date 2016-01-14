
// TODO: make variables like this stored elsewhere so that they are defined only once
// rather than in each file

var currentPictureID = "currentPictureID";
var selectedCarroceiroID = "currentCarroceiroID";

Template.imageView.helpers({
  images: function () {
    var img = Images.find({'_id': Session.get(currentPictureID)});
    console.log("Returning image from collection");
    console.log(Images.findOne({'_id': Session.get(currentPictureID)}));
    return img;
  }
});


// TODO: now only works for catadores
// design general way of storing carroceiro id and retrieve correct object
// idea: create separate profile for catador, cooperativa, ponto de entrega
//      then this takes care of it?
Template.ProfileDetails.helpers({
  
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