
if (Meteor.isClient) {
  Template.imageView.helpers({
    images: function () {
      return Images.find({'_id': Session.get("currentPictureID")}); // Where Images is an FS.Collection instance
    }
  });
}
