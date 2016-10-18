Template.catadorForm.events({
  'change #services_other_materials': function(event, template) {
    if (event.target.checked) {  // if other materials is checked (catador works with other materials)
      template.find('#services_other_materials_description').disabled = false;
    }
    else {  // if other materials is unchecked (catador doesn't work with other materials)
      template.find('#services_other_materials_description').disabled = true;
      template.find('#services_other_materials_description').value = "";
    }
  }
});