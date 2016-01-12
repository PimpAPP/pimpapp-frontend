
var catador = "Catador";
var cooperativa = "Cooperativa";
var pontodeentrega = "Ponto de Entrega";


CarroceiroType = new Mongo.Collection("carroceiroType");
CarroceiroType.attachSchema(new SimpleSchema({
   choose: {
      type: String,
      allowedValues: [
         catador,
         cooperativa,
         pontodeentrega
      ],
      optional: true,
      label: "O que você quer cadastrar?"
   }
}));


Catadores = new Mongo.Collection("catadores");
Catadores.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Nome",
    max: 200
  },
  address: {
    type: String,
    label: "Endereço"
  },
  telephone: {
    type: Number,
    label: "Telefone"
  },
  whatsapp: {
    type: Boolean,
    label: "Tem Whatsapp"
  }
}));


Cooperativas = new Mongo.Collection("cooperativas");
Cooperativas.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Nome",
    max: 200
  },
  address: {
    type: String,
    label: "Endereço"
  },
  telephone: {
    type: Number,
    label: "Telefone"
  },
  hours: {
    type: String,
    label: "Horário de atendimento"
  },
  coleta: {
    type: Boolean,
    label: "Faz coleta?"
  }
}));

PontoDeEntregas = new Mongo.Collection("pontodeentregas");
PontoDeEntregas.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Nome",
    max: 200
  },
  address: {
    type: String,
    label: "Endereço"
  },
  hours: {
    type: String,
    label: "Horário de atendimento"
  }
}));


if (Meteor.isClient) {

  Template.selectCarroceiroType.events({
    'change #catador-radio': function(event) {
      Session.set("selectedCarroceiroType", catador);
      console.log('selected catador');
    }, 
    'change #cooperativa-radio': function(event) {
      Session.set("selectedCarroceiroType", cooperativa);
      console.log('selected cooperativa');
    }, 
    'change #pev-radio': function(event) {
      Session.set("selectedCarroceiroType", pontodeentrega);
      console.log('selected pev');
    },     

  });


  Template.addCarroceiroForm.helpers({
    'showCatadorForm': function() {
      return (catador == Session.get("selectedCarroceiroType"));
    },
    'showCooperativaForm': function() {
      return (cooperativa == Session.get("selectedCarroceiroType"));
    },
    'showPevForm': function() {
      return (pontodeentrega == Session.get("selectedCarroceiroType"));
    },    
  })
}
