if (Meteor.isClient) {
  AutoForm.hooks({
    insertCatadorForm: {
      before: {
        "method": function(doc) {
          // if address autoform field is different from template field means that field is empty after a previous successful insertion or user didn't click on Google autocomplete suggestion after a previous successful insertion. So, shows an error
          if (AutoForm.templateInstanceForForm().find('#complete_address').value != AutoForm.getFieldValue('complete_address').fullAddress) {
            FlashMessages.clear();
            FlashMessages.sendError("Erro na Inser\u00e7\u00e3o do Catador! - Campo Endere\u00e7o de refer\u00eancia \u00e9 obrigat\u00f3rio (Necess\u00e1rio clicar na sugest\u00e3o)", {hideDelay: 20000});
            return false;
          }
          return doc;
        }
      },
      onSuccess: function(formType, result) {
        FlashMessages.clear();
        FlashMessages.sendSuccess("Catador Inserido com Sucesso!", {hideDelay: 10000});
      },
      onError: function(formType, error) {
        FlashMessages.clear();
        var error_msg = "";
        if (error.error)
        {
          error_msg = " - " + error.error;
        };
        FlashMessages.sendError("Erro na Inser\u00e7\u00e3o do Catador!" + error_msg, {hideDelay: 20000});
      }
    },
    updateCatadorForm: {
      before: {
        "method": function(doc) {
          doc.id = Session.get('catador').id;
          return doc;
        }
      },
      onSuccess: function(formType, result) {
        FlashMessages.clear();
        FlashMessages.sendSuccess("Catador Atualizado com Sucesso!", {hideDelay: 10000});
        setStoredValues();
        setUpdateInitialValues(AutoForm.templateInstanceForForm("updateCatadorForm"));
      },
      onError: function(formType, error) {
        FlashMessages.clear();
        var error_msg = "";
        if (error.error)
        {
          error_msg = " - " + error.error;
        };
        FlashMessages.sendError("Erro na Atualiza\u00e7\u00e3o do Catador!" + error_msg, {hideDelay: 20000});
        setStoredValues();
      }
    },
    updatePhotoForm: {
      before: {
        "method": function(doc) {
          doc.id = Session.get('catador').id;
          return doc;
        }
      },
      onSuccess: function(formType, result) {
        FlashMessages.clear();
        FlashMessages.sendSuccess("Foto Atualizada com Sucesso!", {hideDelay: 10000});
      },
      onError: function(formType, error) {
        FlashMessages.clear();
        var error_msg = "";
        if (error.error)
        {
          error_msg = " - " + error.error;
        };
        FlashMessages.sendError("Erro na Atualiza\u00e7\u00e3o da Foto!" + error_msg, {hideDelay: 20000});
      }
    }
  });
};