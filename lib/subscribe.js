
// Manage what data the client has access to here.
// Note: first need to publish data from publish.js on server side

if (Meteor.isClient) {
  Meteor.subscribe('carroceiros');
  Meteor.subscribe('images');
  
  Meteor.subscribe('djangoCatadores');
  Meteor.subscribe('catadores');
  Meteor.subscribe('cooperativas');
  Meteor.subscribe('pontodeentregas');
}