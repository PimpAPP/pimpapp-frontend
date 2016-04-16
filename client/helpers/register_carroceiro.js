AutoForm.hooks({
  insertCatadorForm: {
    onSuccess: function(formType, result) {
      FlashMessages.sendSuccess('Catador Inserido com Sucesso!');
    },
    onError: function(formType, error) {
      FlashMessages.sendError('Erro na Inser\u00e7\u00e3o do Catador!');
    }
  }
});