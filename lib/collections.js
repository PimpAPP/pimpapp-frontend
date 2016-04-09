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
    label: "Pa\u00eds",
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


CatadorProfileSchema = new SimpleSchema({
  id_internal: {
    type: Number,
    label: "Identificador do registro"
  },
  catador_user_id: {
    type: Number,
    label: "Identificador do usu\u00e1io associado ao perfil"
  },
  id: {
    type: Number,
    label: "Identificador l\u00f3gico do catador"
  },
  moderation_status: {
    type: String,
    max: 1
  },
  name: {
    type: String,
    label: "Nome",
    max: 256
  },
  catador_type: {
    type: String,
    max: 1
  },
  allow_public_edition: {
    type: Boolean,
    label: 'Permite edi\u00e7\u00e3o p\u00fablica?'
  },
  motorizedVehicle: {
    type: Boolean,
    label: 'Utiliza ve\u00edculo motorizado?'
  },
  carrocaPimpada: {
    type: Boolean,
    label: 'Tem sua carro\u00e7a pimpada?'
  },
  observations: {
    type: String,
    label: "Observa\u00e7\u00f5es",
    max: 256
  },
  user_id: {
    type: Number,
    label: "Identificador do usu\u00e1io de cria\u00e7\u00e3o"
  },
  created_on: {
    type: Date,
    label: "Data de cria\u00e7\u00e3o"
  }
});

CatadorAddressSchema = new SimpleSchema({
  id: {
    type: Number,
    decimal: true,
    label: "Identificador do registro"
  },
  id_catador: {
    type: Number,
    decimal: true,
    label: "Identificador l\u00f3gico do catador"
  },
  moderation_status: {
    type: String,
    max: 1
  },
  base_address: {
    type: String
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
  state: {
    type: String,
    label: "Estado",
    max: 256,
    regEx: /^A[CLMP]|BA|C[E]|D[F]|E[S]|G[O]|M[AGST]|P[ABEIR]|R[JNORS]|S[CEP]|TO$/
  },
  country: {
    type: String,
    label: "Pa\u00eds",
    max: 256
  },
  zip: {
    type: Number,
    optional: true,
    regEx: /^[0-9]{8}$/
  },
  user_id: {
    type: Number,
    label: "Identificador do usu\u00e1io de cria\u00e7\u00e3o"
  },
  created_on: {
    type: Date,
    label: "Data de cria\u00e7\u00e3o"
  }
});

CatadorGeolocationSchema = new SimpleSchema({
  id: {
    type: Number,
    decimal: true,
    label: "Identificador do registro"
  },
  id_catador: {
    type: Number,
    decimal: true,
    label: "Identificador l\u00f3gico do catador"
  },
  moderation_status: {
    type: String,
    max: 1
  },
  latitude: {
    type: Number,
    decimal: true
  },
  longitude: {
    type: Number,
    decimal: true
  },
  reverse_geocoding: {
    type: String,
    label: "Endere\u00e7o da localiza\u00e7\u00e3o geogr\u00e1fica",
    max: 256
  },
  user_id: {
    type: Number,
    label: "Identificador do usu\u00e1io de cria\u00e7\u00e3o"
  },
  created_on: {
    type: Date,
    label: "Data de cria\u00e7\u00e3o"
  }
});

CatadorTelephonesSchema = new SimpleSchema({
  id: {
    type: Number,
    decimal: true,
    label: "Identificador do registro"
  },
  id_catador: {
    type: Number,
    decimal: true,
    label: "Identificador l\u00f3gico do catador"
  },
  moderation_status: {
    type: String,
    max: 1
  },
  telephone1: {
    type: Number,
    label: "Telefone 1"
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
    label: "Operador 1"
  },
  whatsapp1: {
    type: Boolean,
    label: "Whatsapp 1"
  },
  telephone2: {
    type: Number,
    label: "Telefone 2 (opcional)",
    optional: true
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
    label: "Operador 2"
  },
  whatsapp2: {
    type: Boolean,
    label: "Whatsapp 2"
  },
  user_id: {
    type: Number,
    label: "Identificador do usu\u00e1io de cria\u00e7\u00e3o"
  },
  created_on: {
    type: Date,
    label: "Data de cria\u00e7\u00e3o"
  }
});

CatadorServicesSchema = new SimpleSchema({
  id: {
    type: Number,
    decimal: true,
    label: "Identificador do registro"
  },
  id_catador: {
    type: Number,
    decimal: true,
    label: "Identificador l\u00f3gico do catador"
  },
  moderation_status: {
    type: String,
    max: 1
  },
  services_recyclable: {
    type: Boolean,
    label: services_recyclable_str
  },
  services_construction: {
    type: Boolean,
    label: services_construction_str
  },
  services_volume: {
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
  services_freight: {
    type: Boolean,
    label: services_freight_str
  },
  services_other_materials: {
    type: Boolean,
    label: services_other_materials_str
  },
  user_id: {
    type: Number,
    label: "Identificador do usu\u00e1io de cria\u00e7\u00e3o"
  }, 
  created_on: {
    type: Date,
    label: "Data de cria\u00e7\u00e3o"
  }
});

CatadorPhotoSchema = new SimpleSchema({
  id: {
    type: Number,
    decimal: true,
    label: "Identificador do registro"
  },
  id_catador: {
    type: Number,
    decimal: true,
    label: "Identificador l\u00f3gico do catador"
  },
  moderation_status: {
    type: String,
    max: 1
  },
  full_photo: {
    type: Object,
    label: "Foto do catador"
  },
  user_id: {
    type: Number,
    label: "Identificador do usu\u00e1io de cria\u00e7\u00e3o"
  },
  created_on: {
    type: Date,
    label: "Data de cria\u00e7\u00e3o"
  }
});

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






