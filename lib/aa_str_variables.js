// Define global variables here

// catador services
services_recyclable_str = "Material recicl\u00e1vel (papel, papel\u00e3o, latas, pl\u00e1sticos, embalagens, caixas longa vida, etc.)";
services_glass_str = "Vidro"
services_construction_str = "Res\u00edduo de constru\u00e7\u00e3o civil (entulho, tintas, madeira, etc.)";
services_freight_str = "Frete e carreto";
services_volume_str = "Res\u00edduos Volumosos (sof\u00e1, geladeira, fog\u00e3o, etc.)";
services_metals_str = "Ferro e metais (cobre, alum\u00ednio, etc.)";
services_electronics_str = "Res\u00edduos eletroeletr\u00f4nicos (computadores, pilhas, baterias, etc.)";
services_other_materials_str = "Outros materiais";

// error messages for Simple Schema
required_error_message_str = "Campo [label] \u00e9 obrigat\u00f3rio.";
maxString_error_message_str = "Campo [label] n\u00e3o pode ter mais do que [max] caracteres";
maxNumber_error_message_str = "Campo [label] n\u00e3o pode ter mais do que 15 caracteres";
minNumber_error_message_str = "Campo [label] n\u00e3o pode ter menos do que 8 caracteres";
regEx_error_message_str = "Campo [label] fornecido \u00e9 inv\u00e1lido";
notAllowed_error_message_str = "Campo [label] n\u00e3o \u00e9 permitido";

// system error messages
err_system_msg = "Erro interno de sistema - Pedimos que avise a Pimp.";

// no items error messages
err_no_user_msg = "N\u00e3o h\u00e1 usu\u00e1rio conectado.";
err_no_item_msg = "Nenhum item selecionado.";
err_no_photo_msg = "Nenhuma foto escolhida.";

// insert error messages
err_insert_cat_msg = "Erro na inser\u00e7\u00e3o do perfil do catador.";
err_insert_cat_id_msg = "Erro na inser\u00e7\u00e3o do identificador do catador.";
err_insert_tel_msg = "Erro na inser\u00e7\u00e3o dos telefones do catador.";
err_insert_addr_msg = "Erro na inser\u00e7\u00e3o do endere\u00e7o do catador.";
err_insert_geo_msg = "Erro na inser\u00e7\u00e3o da geolocaliza\u00e7\u00e3o do catador.";
err_insert_serv_msg = "Erro na inser\u00e7\u00e3o dos servi\u00e7os do catador.";
err_insert_photo_msg = "Erro na inser\u00e7\u00e3o da foto do catador.";

// update error messages
err_update_cat_msg = "Erro na atualiza\u00e7\u00e3o do perfil do catador.";
err_update_hist_cat_msg = "Erro na atualiza\u00e7\u00e3o do hist\u00f3rico do catador.";
err_update_tel_msg = "Erro na atualiza\u00e7\u00e3o dos telefones do catador.";
err_update_hist_tel_msg = "Erro na atualiza\u00e7\u00e3o do hist\u00f3rico dos telefones.";
err_update_addr_msg = "Erro na atualiza\u00e7\u00e3o do endere\u00e7o do catador.";
err_update_hist_addr_msg = "Erro na atualiza\u00e7\u00e3o do hist\u00f3rico do endere\u00e7o.";
err_update_geo_msg = "Erro na atualiza\u00e7\u00e3o da geolocaliza\u00e7\u00e3o do catador.";
err_update_hist_geo_msg = "Erro na atualiza\u00e7\u00e3o do hist\u00f3rico da geolocaliza\u00e7\u00e3o.";
err_update_serv_msg = "Erro na atualiza\u00e7\u00e3o dos servi\u00e7os do catador.";
err_update_hist_serv_msg = "Erro na atualiza\u00e7\u00e3o do hist\u00f3rico dos servi\u00e7os.";
err_update_photo_msg = "Erro na atualiza\u00e7\u00e3o da foto do catador.";
err_update_hist_photo_msg = "Erro na atualiza\u00e7\u00e3o do hist\u00f3rico da foto.";

// location of images used
catador_icon_source  = "img/IconesRECO-08.png";
cooperativa_icon_source = "img/IconesRECO-09.jpg";
pev_icon_source = "img/IconesRECO-10.jpg";

// values of moderation status that make records to be shown in screens
//P - Pending, A - Approved
statusShow = ['P', 'A'];