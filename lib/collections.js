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


// Address fields - needs to be this way due to autocomplete package for Google map
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
    optional: true
    // max: 100
  },
  city: {
    type: String,
    label: "Cidade",
    optional: true
  },
  state: {
    type: String,
    label: "Estado",
    optional: true
//    regEx: /^A[CLMP]|BA|C[E]|D[F]|E[S]|G[O]|M[AGST]|P[ABEIR]|R[JNORS]|S[CEP]|TO$/
  },
  zip: {
    type: String,
    label: "CEP",
    optional: true
    //regEx: /^[0-9]{8}$/
  },
  country: {
    type: String,
    label: "Pa\u00eds",
    optional: true
  }
});

// Registration form structure for catadores
CatadorProfileInsertSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Nome/Apelido*",
    max: 256,
    optional: true,
    custom: function () {
      if (this.field('changeNameInfo').isSet) {
      // Update - if check box corresponding to this field is checked then field is required. If check box is unchecked then field is optional
        if (this.field('changeNameInfo').value && (!this.isSet || this.value === null || this.value === "")) {
           return "required";
        };
      } else { // Insert - Field is required
        if (!this.isSet || this.value === null || this.value === "") {
          return "required";
        }
      };
    }
  },
  miniBio: {
    type: String,
    label: "Minibiografia (limite de 256 caracteres)",
    optional: true,
    max: 256
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "E-mail",
    max: 256,
    optional: true
  },
  socialNetwork: {
    type: String,
    label: "Perfil nas redes sociais (link)",
    max: 256,
    optional: true
  },
  carrocaPimpada: {
    type: Boolean,
    label: 'Tem sua carro\u00e7a pimpada?',
    optional: true
  },
  motorizedVehicle: {
    type: Boolean,
    label: 'Utiliza ve\u00edculo motorizado?',
    optional: true
  },
  observations: {
    type: String,
    label: "Observa\u00e7\u00f5es",
    max: 256,
    optional: true
  },
  complete_address: {
    type: AddressSchema,
    label: "Endere\u00e7o de refer\u00eancia*",
    optional: true,
    custom: function () {
      if (this.field('changeComplete_addressInfo').isSet) {
      // Update - if check box corresponding to this field is checked then field is required. If check box is unchecked field is optional
        if (this.field('changeComplete_addressInfo').value && (!this.isSet || this.value === null || this.value === "")) { 
           return "required";
        };
      } else { // Insert - Field is required
        if (!this.isSet || this.value === null || this.value === "") {
          return "required";
        }
      };
    }
  },
  region: {
    type: String,
    label: 'Regi\u00e3o/Bairros em que coleta',
    optional: true,
    max: 256
  },
  telephone1: {
    type: String,
    label: "Telefone 1*",
    // regEx: /^[0-9]{8,15}$/,
    // max: 999999999999999,
    // min: 10000000,
    autoform: {
            type: 'masked-input',
            mask: '(00) #0000-0000',
            maskOptions: {
                placeholder: '(__) _____-____'
            }
        },
    optional: true,
    custom: function () {
      if (this.field('changeTelephone1Info').isSet) {
      // Update - if check box corresponding to this field is checked then field is required. If check box is unchecked field is optional
        if (this.field('changeTelephone1Info').value && (!this.isSet || this.value === null || this.value === "")) { 
           return "required";
        };
      } else { // Insert - Field is required
        if (!this.isSet || this.value === null || this.value === "") {
          return "required";
        }
      };
    }
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
    label: "Operadora 1*",
    optional: true,
    custom: function () {
      if (this.field('changeOperator1Info').isSet) {
      // Update - if check box corresponding to this field is checked then field is required. If check box is unchecked field is optional
        if (this.field('changeOperator1Info').value && (!this.isSet || this.value === null || this.value === "")) {
           return "required";
        };
      } else { // Insert - Field is required
        if (!this.isSet || this.value === null || this.value === "") {
          return "required";
        }
      };
    }
  },
  whatsapp1: {
    type: Boolean,
    label: "Whatsapp 1",
    optional: true
  },
  internet1: {
    type: Boolean,
    label: "Internet na Rua 1",
    optional: true
  },
  telephone2: {
    type: String,
    label: "Telefone 2 (opcional, se houver)",
    // regEx: /^[0-9]{8,15}$/,
    // max: 999999999999999,
    // min: 10000000,
    optional: true,
    autoform: {
            type: 'masked-input',
            mask: '(00) #0000-0000',
            maskOptions: {
                placeholder: '(__) _____-____'
            }
        }
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
    label: "Operadora 2",
    optional: true
  },
  whatsapp2: {
    type: Boolean,
    label: "Whatsapp 2",
    optional: true
  },
  internet2: {
    type: Boolean,
    label: "Internet na Rua 2",
    optional: true
  },
  services_recyclable: {
    type: Boolean,
    label: services_recyclable_str,
    optional: true
  },
  services_glass: {
    type: Boolean,
    label: services_glass_str,
    optional: true
  },
  services_construction: {
    type: Boolean,
    label: services_construction_str,
    optional: true
  },
  services_volume: {
    type: Boolean,
    label: services_volume_str,
    optional: true
  },
  services_metals: {
    type: Boolean,
    label: services_metals_str,
    optional: true
  },
  services_electronics: {
    type: Boolean,
    label: services_electronics_str,
    optional: true
  },
  services_freight: {
    type: Boolean,
    label: services_freight_str,
    optional: true
  },
  services_other_materials: {
    type: Boolean,
    label: services_other_materials_str,
    optional: true
  },
  services_other_materials_description: {
    type: String,
    label: "Quais?",
    max: 256,
    optional: true
  },
  full_photo: {
    type: String,
    label: "Foto",
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        label: 'Escolha uma foto'
      }
    }
  }
});

SimpleSchema.messages ({
  "required": required_error_message_str,
  "maxString": maxString_error_message_str,
  "maxNumber": maxNumber_error_message_str,
  "minNumber": minNumber_error_message_str,
  "regEx": regEx_error_message_str,
  "notAllowed": notAllowed_error_message_str
});

CatadorProfileUpdateSchema = new SimpleSchema({
  insertFields: {
    type: CatadorProfileInsertSchema
  },
  //check boxes that user clicks if he/she wants to update corresponding field
  changeNameInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeMiniBioInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeTelephone1Info: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeOperator1Info: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeWhatsapp1Info: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeInternet1Info: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeTelephone2Info: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeOperator2Info: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeWhatsapp2Info: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeInternet2Info: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeEmailInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeSocialNetworkInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeComplete_addressInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeRegionInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeCarrocaPimpadaInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeMotorizedVehicleInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeServices_recyclableInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeServices_glassInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeServices_constructionInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeServices_volumeInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeServices_metalsInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeServices_electronicsInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeServices_freightInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeServices_other_materialsInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeServices_other_materials_descriptionInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  changeObservationsInfo: {
    type: Boolean,
    label: " ",
    optional: true
  },
  id: { // id of catador to locate which record will be updated
    type: String,
    optional: true
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
//     label: "Metal (latas de alum\u00ed�nio, embalagem de marmita, etc.)"
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
//     label: "Sucata (ferro, alum\u00ed�nio, metais, etc.)"
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
//     label: "Metal (latas de alum\u00ed�nio, embalagem de marmita, etc.)"
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
//     label: "Res\u00ed�duo de Constru\u00e7\u00e3o Civil (entulho, madeira, ferro, tintas, alum\u00ednio, etc.)"
//   },  
//   receive_waste: {
//     type: Boolean,
//     label: "Sucata (ferro, alum\u00ed�nio, metais, etc.)"
//   },
//   receive_other: {
//     type: Boolean,
//     label: "Outros (embalagem longa vida, etc.)"
//   }  
// }));






