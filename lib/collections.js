// FS collection to store files
Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images")]
});

Images.allow({
  insert: function(){
    return true;
  },
  download: function(){
    return true;
  }
});

////////////////////////////////////////////////////////////////
// The following schemas and collections define how the autoform shows up
////////////////////////////////////////////////////////////////

// Schema to define accepted address details
// The address entered in the form is automaticlaly converted to 
// a json object with this structure

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
    optional: true
    // regEx: /^[0-9]{5}$/
  },
  country: {
    type: String
  }
});

GeolocationSchema = new SimpleSchema({
  pk: {
    type: Number,
    decimal: true
  },
  created_on: {
    type: Date,
    label: "Data de Cria\u00e7\u00e3o"
  },
  lat: {
    type: Number,
    decimal: true
  },
  lng: {
    type: Number,
    decimal: true
  },
  reverse_geocoding: {
    type: String,
    label: "Endere\u00e7o da localiza\u00e7\u00e3o geogr\u00e1fica",
    max: 256
  },
  materials: {
    type: String
  }
});

// Registration form structure for catadores

Catadores = new Mongo.Collection("catadores");
Catadores.attachSchema(new SimpleSchema({
  pk: {
    type: Number,
    decimal: true
  },
  catador_type: {
    type: String,
    max: 1
  },
  geolocation: {
    type: GeolocationSchema,
    label: "Localiza\u00e7\u00e3o geogr\u00e1fica"
  },
  name: {
    type: String,
    label: "Nome",
    max: 256
  },
  address_base: {
    type: String,
    label: "Endere\u00e7o base",
    max: 256
  },
  region: {
    type: String,
    label: 'Trabalha em qual regi\u00e3o?',
    max: 256
  },
  city: {
    type: String,
    label: "Cidade",
    max: 256
  },
  country: {
    type: String,
    label: "Cidade",
    max: 256
  },
  motorizedVehicle: {
    type: Boolean,
    label: 'Utiliza ve\u00edculo motorizado?'
  },
  carrocaPimpada: {
    type: Boolean,
    label: 'Tem sua carro\u00e7a pimpada?'
  },
  telephone1: {
    type: Number,
    label: "Telefone 1"
  },
  telephone2: {
    type: Number,
    label: "Telefone 2 (opcional)",
    optional: true
  },  
  operator_telephone1: {
    type: String,
    allowedValues: [
       "Claro",
       "Oi",
       "Vivo",
       "TIM",
       "Outra"
    ],
    optional: true,
    label: "Operador"
  },

  operator_telephone2: {
    type: String,
    allowedValues: [
       "Claro",
       "Oi",
       "Vivo",
       "TIM",
       "Outra"
    ],
    optional: true,
    label: "Operador"
  },

  whatsapp1: {
    type: Boolean,
    label: "Whatsapp"
  },
  whatsapp2: {
    type: Boolean,
    label: "Whatsapp"
  },

  picture: {
    type: String,
    label: "Foto",
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        label: 'Escolha uma foto'
      }
    }
  },

  // services
  services_recyclable: {
    type: Boolean,
    label: services_recyclable_str
  },

  services_construction: {
    type: Boolean,
    label: services_construction_str
  },
  services_freight: {
    type: Boolean,
    label: services_freight_str
  },
  services_furniture: {
    type: Boolean,
    label: services_furniture_str
  },
  services_metals: {
    type: Boolean,
    label: services_metals_str
  },
  services_electronics: {
    type: Boolean,
    label: services_electronics_str
  },
  services_other_materials: {
    type: Boolean,
    label: services_other_materials_str
  },
  services_metals: {
    type: Boolean,
    label: services_metals_str
  },   
  observations: {
    type: String,
    label: 'Observa\u00e7\u00f5es: (campo texto)',
    optional: true
  }
}));





// TODO: Include the collections for cooperatives and 
// ponto de entregas once there is full support elsewhere.

// Registration form structure for cooperativas

// Cooperativas = new Mongo.Collection("cooperativas");
// Cooperativas.attachSchema(new SimpleSchema({
//   name: {
//     type: String,
//     label: "Nome",
//     max: 200
//   },
//   address: {
//     type: AddressSchema,
//     label: "Endere\u00e7o"
//   },
//   telephone: {
//     type: Number,
//     label: "Telefone"
//   },
//   hours: {
//     type: String,
//     label: "Hor\u00e1rio de atendimento"
//   },
//   site: {
//     type: String,
//     label: "Site"
//   },  
//   coleta: {
//     type: Boolean,
//     label: "Faz coleta?"
//   },

//   // Materials they receive
//   receive_paper: {
//     type: Boolean,
//     label: "Papel (jornal, revista, papel branco, papel\u00e3o, etc.)"
//   },
//   receive_glass: {
//     type: Boolean,
//     label: "Vidro (garrafas, embalagens, etc.)"
//   },
//   receive_metal: {
//     type: Boolean,
//     label: "Metal (latas de alum\u00ed要io, embalagem de marmita, etc.)"
//   },
//   receive_plastic: {
//     type: Boolean,
//     label: "Pl\u00e1stico (embalagens, canos, etc.)"
//   },
//   receive_furniture: {
//     type: Boolean,
//     label: "Volumosos  (sof\u00e1, geladeira, fog\u00e3o, etc.)"
//   },
//   receive_electronics: {
//     type: Boolean,
//     label: "Eletroeletr\u00f4nicos (computadores, pilhas, baterias, etc.)"
//   },
//   receive_wood: {
//     type: Boolean,
//     label: "Madeira"
//   },
//   receive_waste: {
//     type: Boolean,
//     label: "Sucata (ferro, alum\u00ed要io, metais, etc.)"
//   },
//   receive_oil: {
//     type: Boolean,
//     label: "\u00d3leo de cozinha"
//   },
//   receive_other: {
//     type: Boolean,
//     label: "Outros (embalagem longa vida, etc.)"
//   }

// }));

// // Registration form structure for ponto de entregas

// PontoDeEntregas = new Mongo.Collection("pontodeentregas");
// PontoDeEntregas.attachSchema(new SimpleSchema({
//   name: {
//     type: String,
//     label: "Nome",
//     max: 200
//   },
//   address: {
//     type: AddressSchema,
//     label: "Endere\u00e7o"
//   },
//   hours: {
//     type: String,
//     label: "Hor\u00e1rio de atendimento"
//   },

//   // Materials they receive
//   receive_paper: {
//     type: Boolean,
//     label: "Papel (jornal, revista, papel branco, papel\u00e3o, etc.)"
//   },
//   receive_glass: {
//     type: Boolean,
//     label: "Vidro (garrafas, embalagens, etc.)"
//   },
//   receive_metal: {
//     type: Boolean,
//     label: "Metal (latas de alum\u00ed要io, embalagem de marmita, etc.)"
//   },
//   receive_plastic: {
//     type: Boolean,
//     label: "Pl\u00e1stico (embalagens, canos, etc.)"
//   },
//   receive_furniture: {
//     type: Boolean,
//     label: "Volumosos  (sof\u00e1, geladeira, fog\u00e3o, etc.)"
//   },
//   receive_electronics: {
//     type: Boolean,
//     label: "Eletroeletr\u00f4nicos (computadores, pilhas, baterias, etc.)"
//   },
//   receive_construction: {
//     type: Boolean,
//     label: "Res\u00ed苓uo de Constru\u00e7\u00e3o Civil (entulho, madeira, ferro, tintas, alum\u00ednio, etc.)"
//   },  
//   receive_waste: {
//     type: Boolean,
//     label: "Sucata (ferro, alum\u00ed要io, metais, etc.)"
//   },
//   receive_other: {
//     type: Boolean,
//     label: "Outros (embalagem longa vida, etc.)"
//   }  
// }));






