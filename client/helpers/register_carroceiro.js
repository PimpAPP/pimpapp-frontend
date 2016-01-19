
Template.selectCarroceiroType.events({
  // 'change #catador-radio': function(event) {
  //   Session.set(carroceiroType, catador);
  //   console.log('selected catador');
  // }, 
  // 'change #cooperativa-radio': function(event) {
  //   Session.set(carroceiroType, cooperativa);
  //   console.log('selected cooperativa');
  // }, 
  // 'change #pev-radio': function(event) {
  //   Session.set(carroceiroType, pontodeentrega);
  //   console.log('selected pev');
  // },     

  'click #catador-button': function(event) {
    Session.set(carroceiroType, catador);
    console.log('selected catador');
  },
  'click #cooperativa-button': function(event) {
    Session.set(carroceiroType, cooperativa);
    console.log('selected cooperativa');
  },
  'click #pev-button': function(event) {
    Session.set(carroceiroType, pontodeentrega);
    console.log('selected pontodeentrega');
  },

  'click .btn-carroceiro': function(event) {
    console.log('in click');
    $('btn-carroceiro').not(this).removeClass();
    $(this).toggleClass('active');
    $(this).bgcolor="#000";
  }

});

// Helper functions to dteermine which form to show
Template.addCarroceiroForm.helpers({
  'showCatadorForm': function() {
    return (catador == Session.get(carroceiroType));
  },
  'showCooperativaForm': function() {
    return (cooperativa == Session.get(carroceiroType));
  },
  'showPevForm': function() {
    return (pontodeentrega == Session.get(carroceiroType));
  },    
});

// Starts page fresh with no form before selecting type
// (Alternative is to select the appropriate checkbox to keep previous selection)
Template.addCarroceiroForm.onCreated(function() {
  delete Session.keys[carroceiroType];
});

