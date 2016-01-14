
Meteor.methods({
    showUserInfo: function() {
        console.log('in method');
        console.log(Meteor.user().profile)
        return Meteor.user();
    }
})