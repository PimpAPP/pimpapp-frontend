Template.undeleteCatador.onCreated(function() {
  Session.set('orderSelect', 'deletionDate');
});

Template.catadorListUndel.helpers({
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
  'click #undelete'() {
    Meteor.call('setStatusCatador', this._id, 'P');
  },
  'change #orderSelect'(event, template) {
     Session.set('orderSelect', template.find("#orderSelect").value);
  }
});

Template.catadorListUndel.onDestroyed(function() {
  FlashMessages.clear();
});