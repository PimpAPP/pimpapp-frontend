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