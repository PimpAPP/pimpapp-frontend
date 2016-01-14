

Template.imageView.helpers({
  images: function () {
    // retrieve picture for selected catador
    var catador = Catadores.findOne(getCatadorIdFromUrl());
    var img = Images.find({'_id': catador.picture});
    return img;
  }
});


Template.CatadorDetails.helpers({
  
  name: function() {
    var catador = Catadores.findOne(getCatadorIdFromUrl());
    return catador.name;
  },

  telephone: function() {
    var catador = Catadores.findOne(getCatadorIdFromUrl());
    return catador.telephone;
  },
  
  whatsapp: function() {
    var catador = Catadores.findOne(getCatadorIdFromUrl());
    if (catador.whatsapp) {
      return "Sim";
    }
    else {
      return 'Não';
    }
  }
});

function getCatadorIdFromUrl() {
  // get url of current page
  var currentUrl = Router.current().originalUrl;
  
  // retrieve path
  var a = document.createElement('a');
  a.href = currentUrl;
  var pathname = a.pathname;

  // pathname takes form /catadorprofile/<id>
  var id = pathname.split('/catadorprofile/')[1]
  return id;
}

