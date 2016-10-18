// Autoform handling when inserting and updating a catador
if (Meteor.isClient) {
  AutoForm.hooks({
    insertCatadorForm: {
      // checks if user filled address correctly according Google autocomplete rules
      before: {
        "method": function(doc) {
          // if address autoform field is different from template field means that field is empty after a previous successful insertion or user didn't click on Google autocomplete suggestion after a previous successful insertion. So, shows an error
          if (AutoForm.templateInstanceForForm().find('#complete_address').value != AutoForm.getFieldValue('complete_address').fullAddress) {
            FlashMessages.clear();
            FlashMessages.sendError(err_insert_compl_addr_msg, {hideDelay: 20000});
            return false;
          }
          return doc;
        }
      },
      // sends message for a successful insertion in database
      onSuccess: function(formType, result) {
        FlashMessages.clear();
        FlashMessages.sendSuccess(succ_insert_cat_msg, {hideDelay: 10000});  // shows message per 10 seconds
      },
      // sends message for some error occurred during insertion in database
      onError: function(formType, error) {
        FlashMessages.clear();
        var error_msg = "";
        if (error.error)
        {
          error_msg = " - " + error.error;
        };
        FlashMessages.sendError(err_insert_cat_proc_msg + error_msg, {hideDelay: 20000}); // shows message per 20 seconds
      }
    },
    updateCatadorForm: {
      // sets catador_id to be submitted to server
      before: {
        "method": function(doc) {
          doc.id = Session.get('catador').id;
          return doc;
        }
      },
      // sends message for a successful update in database
      onSuccess: function(formType, result) {
        FlashMessages.clear();
        FlashMessages.sendSuccess(succ_update_cat_msg, {hideDelay: 10000});  // shows message per 10 seconds
        setStoredValues();
        setUpdateInitialValues(AutoForm.templateInstanceForForm("updateCatadorForm"));
      },
      // sends message for some error occurred during update in database
      onError: function(formType, error) {
        FlashMessages.clear();
        var error_msg = "";
        if (error.error)
        {
          error_msg = " - " + error.error;
        };
        FlashMessages.sendError(err_update_cat_proc_msg + error_msg, {hideDelay: 20000});  // shows message per 20 seconds
        setStoredValues();
      }
    },
    updatePhotoForm: {
      // sets catador_id to be submitted to server
      before: {
        "method": function(doc) {
          doc.id = Session.get('catador').id;
          return doc;
        }
      },
      // sends message for a successful photo update in database
      onSuccess: function(formType, result) {
        FlashMessages.clear();
        FlashMessages.sendSuccess(succ_update_photo_msg, {hideDelay: 10000});  // shows message per 10 seconds
      },
      // sends message for some error occurred during photo update in database
      onError: function(formType, error) {
        FlashMessages.clear();
        var error_msg = "";
        if (error.error)
        {
          error_msg = " - " + error.error;
        };
        FlashMessages.sendError(err_update_photo_proc_msg + error_msg, {hideDelay: 20000});  // shows message per 20 seconds
      }
    }
  });
};