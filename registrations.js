
var catador = "Catador";
var cooperativa = "Cooperativa";
var pontodeentrega = "Ponto de Entrega";
var carroceiroType = 'selectedCarroceiroType'


AddressSchema = new SimpleSchema({
  fullAddress: {
    type: String
  },
  lat: {
    type: Number,
    decimal: true
  },
  lng: {
    type: Number,
    decimal: true
  },
  geometry: {
    type: Object,
    blackbox: true
  },
  placeId: {
    type: String
  },
  street: {
    type: String,
    // max: 100
  },
  city: {
    type: String,
    // max: 50
  },
  state: {
    type: String,
    // regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },
  zip: {
    type: String,
    // regEx: /^[0-9]{5}$/
  },
  country: {
    type: String
  }
});

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
    type: AddressSchema,
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
    type: AddressSchema,
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
    type: AddressSchema,
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
      Session.set(carroceiroType, catador);
      console.log('selected catador');
    }, 
    'change #cooperativa-radio': function(event) {
      Session.set(carroceiroType, cooperativa);
      console.log('selected cooperativa');
    }, 
    'change #pev-radio': function(event) {
      Session.set(carroceiroType, pontodeentrega);
      console.log('selected pev');
    },     
  });

  // Helper functions to dteermine which form to show
  Template.addCarroceiroForm.helpers({
    'showCatadorForm': function() {
      return (catador == Session.get(carroceiroType));
    },
    'showCooperativaForm': function() {
      return (cooperativa == Session.get(carroceiroType));
    },
    'showPevForm': function() {
      return (pontodeentrega == Session.get(carroceiroType));
    },    
  });

  // Starts page fresh with no form before selecting type
  Template.addCarroceiroForm.onCreated(function() {
    delete Session.keys[carroceiroType];
  });

}
