Template.moderation.onCreated(function() {
  Session.set('orderSelect', 'name');
  Session.set('filterSelect', '');
});

Template.moderationList.helpers({
  carroceiros() {
    if (Session.get('filterSelect') == '') { // no filter - show all moderation status
      statusShowResult = statusShowDelMod;
    } else { // show only what user selected to filter
      statusShowResult = [Session.get('filterSelect')];
    };

    if (Session.get('orderSelect') == 'name') { //order by name of catador ascending
      return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': {$in: statusShowResult}}]}, {sort: {name: +1}});
    } else if (Session.get('orderSelect') == 'moderationDate') { //order by creation date of catador descending
      return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': {$in: statusShowResult}}]}, {sort: {moderated_on: -1}});
    }
    return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': {$in: statusShowResult}}]});
  }
});

Template.moderationList.events({
  'change'(event, template) {
    Meteor.call('setStatusCatador', this._id, this.moderation_status, event.target.value);
  },
  'change #orderSelect'(event, template) {
     Session.set('orderSelect', template.find("#orderSelect").value);
  },
  'change #filterSelect'(event, template) {
     Session.set('filterSelect', template.find("#filterSelect").value);
  }
});

Template.moderationList.onDestroyed(function() {
  FlashMessages.clear();
});

Template.moderationItem.helpers({
  pending: function() {
    return this.moderation_status == 'P'?'checked':'';
},
  approved: function() {
    return this.moderation_status == 'A'?'checked':'';
},
  rejected: function() {
    return this.moderation_status == 'R'?'checked':'';
}
});

