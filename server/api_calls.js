
var endpoint = 'http://104.131.46.101/';

Meteor.methods({
  getCarroceiros: function() {
    var carroceiro = 'carroceiro/';
    var carroceiro_endpoint = endpoint + carroceiro;
    HTTP.call( 'GET', carroceiro_endpoint, 
      function( error, response ) {
        if (error) {
          console.log(error);
        }
        else {
          var data = response.data;
          for(var i = 0; i < data.length; i++) {
              var carroceiro = data[i];

              var exists = Carroceiros.findOne({'id': carroceiro.id})
              if (!exists) {
                console.log('inserting ' + carroceiro.name);
                Carroceiros.insert(carroceiro);
              }              
          }
      }
    });
  }
});