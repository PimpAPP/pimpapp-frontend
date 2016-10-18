// puts deletion date as default selection for ordering data
Template.undeleteCatador.onCreated(function() {
  Session.set('orderSelect', 'deletionDate');
});

Template.catadorListUndel.helpers({
  // retrieves catador data according ordering chosen by user
  carroceiros() {
    if (Session.get('orderSelect') == 'name') { //order by name of catador ascending
      return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': 'D'}]}, {sort: {name: +1}});
    } else if (Session.get('orderSelect') == 'deletionDate') { //order by deletion date of catador descending
      return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': 'D'}]}, {sort: {deleted_on: -1}});
    }
    return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': 'D'}]});
  }
});

Template.catadorListUndel.events({
  // calls function that changes catador status in database from D (deleted) to P (pending)
  'click #undelete'() {
    Meteor.call('setStatusCatador', this._id, 'D', 'P');
  },
  // stores ordering selection to be used in catador retrieve data query
  'change #orderSelect'(event, template) {
     Session.set('orderSelect', template.find("#orderSelect").value);
  }
});

// clear all messages sent to user to don't dirty this or other pages
Template.catadorListUndel.onDestroyed(function() {
  FlashMessages.clear();
});