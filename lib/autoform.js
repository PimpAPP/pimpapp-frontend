if (Meteor.isClient) {
  AutoForm.hooks({
    insertCatadorForm: {
      onSuccess: function(formType, result) {
        FlashMessages.clear();
        FlashMessages.sendSuccess("Catador Inserido com Sucesso!");
      },
      onError: function(formType, error) {
        FlashMessages.clear();
        var error_msg = "";
        if (error.error)
        {
          error_msg = " - " + error.error;
        };
        FlashMessages.sendError("Erro na Inser\u00e7\u00e3o do Catador!" + error_msg);
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