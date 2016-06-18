if (Meteor.isClient) {
  AutoForm.hooks({
    insertCatadorForm: {
      onSuccess: function(formType, result) {
        FlashMessages.sendSuccess("Catador Inserido com Sucesso!");
      },
      onError: function(formType, error) {
        FlashMessages.sendError("Erro na Inser\u00e7\u00e3o do Catador! - " + error.error);
      }
    },
    updateCatadorForm: {
      before: {
        "method": function(doc) {
          doc.id = getCatadorIdFromUrl();
          return doc;
        }
      },
      onSuccess: function(formType, result) {
        FlashMessages.sendSuccess("Catador Atualizado com Sucesso!", {hideDelay: 15000});
        updateStoredValues();
        setUpdateInitialValues(AutoForm.templateInstanceForForm("updateCatadorForm"));
      },
      onError: function(formType, error) {
        FlashMessages.sendError("Erro na Atualiza\u00e7\u00e3o do Catador! - " + error.error, {hideDelay: 30000});
        updateStoredValues();
      }
    }
  });
};