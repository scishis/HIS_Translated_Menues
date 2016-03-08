var admins = []; //add usernames of admins here
//allow admin users to insert, update, and remove menus
Menus.allow({
  insert: function (userId) {
    return admins.indexOf(Meteor.users.findOne({_id: userId}).username) !== -1;
  },
  update: function (userId) {
    return admins.indexOf(Meteor.users.findOne({_id: userId}).username) !== -1;
  },
  remove: function () {
    return admins.indexOf(Meteor.users.findOne({_id: userId}).username) !== -1;
  }
});
//allow admin users to set users to paid or not paid
Meteor.methods({
  "setUserToPaid", function (userId) {
    if (admins.indexOf(Meteor.users.findOne({_id: this.userId}).username) !== -1) {
      Meteor.users.update({_id: userId}, {$set: {paid: true}});
    }
  },
  "setUserToNotPaid": function (userId) {
    if (admins.indexOf(Meteor.users.findOne({_id: this.userId}).username) !== -1) {
      Meteor.users.update({_id: userId}, {$set: {paid: false}});
    }
  }
});
Meteor.publish("menus", function () {
  //publish menus to users who have set the paid field to true
  if (Meteor.users.findOne({_id: this.userId}).paid) {
    return Menus.find();
  }
});
