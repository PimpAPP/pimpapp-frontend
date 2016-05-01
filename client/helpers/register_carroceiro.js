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

Template.catadorForm.events({
  'change #services_other_materials': function(event, template) {
    if (event.target.checked) {
      template.find('#services_other_materials_description').disabled = false;
    }
    else {
      template.find('#services_other_materials_description').disabled = true;
      template.find('#services_other_materials_description').value = "";
    }
  }
});