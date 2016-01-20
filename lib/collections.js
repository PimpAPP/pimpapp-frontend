// TODO: Add hooks to autoforms to add which user registered
// the carroceiro.


// FS collection to store files
Images = new FS.Collection("images", {
  // stores: [new FS.Store.FileSystem("images", {path: "img"})]
  stores: [new FS.Store.FileSystem("images")]
});

Images.allow({
  insert: function(){
    return true;
  },
  // update: function(){
  //   return true;
  // },
  // remove: function(){
  //   return true;
  // },
  download: function(){
    return true;
  }
});



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
  region: {
    type: String,
    label: 'Trabalha em qual região?'
  },
  carrocaPimpada: {
    type: Boolean,
    label: 'Tem sua carroça pimpada?'
  },
  motorizedVehicle: {
    type: Boolean,
    label: 'Utiliza veículo motorizado?'
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
        label: 'Escolha um foto'
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
  // Ideal method --> But difficult making it work
  // services: {
  //     type: String,
  //     // allowedValues: ['recylable', 'construction', 'frete', 'volumosos', 
  //     //   'metals', 'electronics', 'otherMaterials'],
  //     optional: true,
  //     autoform: {
  //       options: [
  //         {label: "Coleta de material reciclável (papel, vidro, latas, embalagens, vidro, embalagem longa vida, etc.)", 
  //           value: "recyclable"},
  //         {label: "Coleta de Resíduo de Construção Civil (entulho, tintas, madeira, etc.)", 
  //           value: "construction"},
  //         {label: "Frete e Carreto", 
  //           value: "frete"},  
  //         {label: "Coleta de Resíduos Volumosos (sofá, geladeira, fogão, etc.)", 
  //           value: "volumosos"},
  //         {label: "Coleta de ferro e metais (cobre, alumínio, etc.)", 
  //           value: "metals"},
  //         {label: "Coleta de resíduos eletroeletrônicos (computadores, pilhas, baterias, etc.)", 
  //           value: "electronics"},
  //         {label: "Coleta de Outros materiais", 
  //           value: "otherMaterials"}
  //       ]
  //     },
  //     label: 'Serviços prestados'  
  observations: {
    type: String,
    label: 'Observações: (campo texto)',
    optional: true
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
  site: {
    type: String,
    label: "Site"
  },  
  coleta: {
    type: Boolean,
    label: "Faz coleta?"
  },

  // Materials they receive
  receive_paper: {
    type: Boolean,
    label: "Papel (jornal, revista, papel branco, papelão, etc.)"
  },
  receive_glass: {
    type: Boolean,
    label: "Vidro (garrafas, embalagens, etc.)"
  },
  receive_metal: {
    type: Boolean,
    label: "Metal (latas de alumínio, embalagem de marmita, etc.)"
  },
  receive_plastic: {
    type: Boolean,
    label: "Plástico (embalagens, canos, etc.)"
  },
  receive_furniture: {
    type: Boolean,
    label: "Volumosos  (sofá, geladeira, fogão, etc.)"
  },
  receive_electronics: {
    type: Boolean,
    label: "Eletroeletrônicos (computadores, pilhas, baterias, etc.)"
  },
  receive_wood: {
    type: Boolean,
    label: "Madeira"
  },
  receive_waste: {
    type: Boolean,
    label: "Sucata (ferro, alumínio, metais, etc.)"
  },
  receive_oil: {
    type: Boolean,
    label: "Óleo de cozinha"
  },
  receive_other: {
    type: Boolean,
    label: "Outros (embalagem longa vida, etc.)"
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
  },

  // Materials they receive
  receive_paper: {
    type: Boolean,
    label: "Papel (jornal, revista, papel branco, papelão, etc.)"
  },
  receive_glass: {
    type: Boolean,
    label: "Vidro (garrafas, embalagens, etc.)"
  },
  receive_metal: {
    type: Boolean,
    label: "Metal (latas de alumínio, embalagem de marmita, etc.)"
  },
  receive_plastic: {
    type: Boolean,
    label: "Plástico (embalagens, canos, etc.)"
  },
  receive_furniture: {
    type: Boolean,
    label: "Volumosos  (sofá, geladeira, fogão, etc.)"
  },
  receive_electronics: {
    type: Boolean,
    label: "Eletroeletrônicos (computadores, pilhas, baterias, etc.)"
  },
  receive_construction: {
    type: Boolean,
    label: "Resíduo de Construção Civil (entulho, madeira, ferro, tintas, aluminio, etc.)"
  },  
  receive_waste: {
    type: Boolean,
    label: "Sucata (ferro, alumínio, metais, etc.)"
  },
  receive_other: {
    type: Boolean,
    label: "Outros (embalagem longa vida, etc.)"
  }  
}));






