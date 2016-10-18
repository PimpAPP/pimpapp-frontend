// puts name as default selection for ordering data
Template.deleteCatador.onCreated(function() {
  Session.set('orderSelect', 'name');
});

Template.catadorListDel.helpers({
  // retrieves catador data according ordering chosen by user
  carroceiros() {
    if (Session.get('orderSelect') == 'name') { //order by name of catador ascending
      return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': {$in: statusShowDelMod}}]}, {sort: {name: +1}});
    } else if (Session.get('orderSelect') == 'creationDate') { //order by creation date of catador descending
      return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': {$in: statusShowDelMod}}]}, {sort: {created_on: -1}});
    }
    return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': {$in: statusShowDelMod}}]});
  }
});

Template.catadorListDel.events({
  // calls function that changes catador status in database to D (deleted)
  'click #delete'() {
    Meteor.call('setStatusCatador', this._id, '', 'D');
  },
  // stores ordering selection to be used in catador retrieve data query
  'change #orderSelect'(event, template) {
     Session.set('orderSelect', template.find("#orderSelect").value);
  }
});

// clear all messages sent to user to don't dirty this or other pages
Template.catadorListDel.onDestroyed(function() {
  FlashMessages.clear();
});
