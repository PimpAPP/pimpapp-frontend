Template.deleteCatador.onCreated(function() {
  Session.set('orderSelect', 'name');
});

Template.catadorListDel.helpers({
  carroceiros() {
    if (Session.get('orderSelect') == 'name') { //order by name of catador ascending
      return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': {$in: statusShow}}]}, {sort: {name: +1}});
    } else if (Session.get('orderSelect') == 'creationDate') { //order by creation date of catador descending
      return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': {$in: statusShow}}]}, {sort: {created_on: -1}});
    }
    return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': {$in: statusShow}}]});
  }
});

Template.catadorListDel.events({
  'click #delete'() {
    Meteor.call('setStatusCatador', this._id, 'D');
  },
  'change #orderSelect'(event, template) {
     Session.set('orderSelect', template.find("#orderSelect").value);
  }
});

Template.catadorListDel.onDestroyed(function() {
  FlashMessages.clear();
});
