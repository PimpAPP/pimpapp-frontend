// puts name as default selection for ordering data and remove any filter
Template.moderation.onCreated(function() {
  Session.set('orderSelect', 'name');
  Session.set('filterSelect', '');
});

Template.moderationList.helpers({
  // retrieves catador data according ordering and filtering chosen by user
  carroceiros() {
    if (Session.get('filterSelect') == '') { // no filter - show all moderation status
      statusShowResult = statusShowDelMod;
    } else { // show only what user selected to filter
      statusShowResult = [Session.get('filterSelect')];
    };

    if (Session.get('orderSelect') == 'name') { //order by name of catador ascending
      return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': {$in: statusShowResult}}]}, {sort: {name: +1}});
    } else if (Session.get('orderSelect') == 'moderationDate') { //order by moderation date of catador descending
      return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': {$in: statusShowResult}}]}, {sort: {moderated_on: -1}});
    }
    return Carroceiros.find({$and: [{'catador_type': 'C'},{'moderation_status': {$in: statusShowResult}}]});
  }
});

Template.moderationList.events({
  // calls function that changes catador status in database to moderation status chosen by user
  'change'(event, template) {
    Meteor.call('setStatusCatador', this._id, this.moderation_status, event.target.value);
  },
  // stores ordering selection to be used in catador retrieve data query
  'change #orderSelect'(event, template) {
     Session.set('orderSelect', template.find("#orderSelect").value);
  },
  // stores filtering selection to be used in catador retrieve data query
  'change #filterSelect'(event, template) {
     Session.set('filterSelect', template.find("#filterSelect").value);
  }
});

// clear all messages sent to user to don't dirty this or other pages
Template.moderationList.onDestroyed(function() {
  FlashMessages.clear();
});

// checks or unchecks a check box depending on it corresponds to a moderation status
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

