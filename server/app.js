Meteor.startup(function () {
  //add usernames of admins here
  //allow admin users to insert, update, and remove menus
  Menus.allow({
    insert: function (userId) {
      return Meteor.users.findOne({_id: userId}).admin;
    },
    update: function (userId) {
      return Meteor.users.findOne({_id: userId}).admin;
    },
    remove: function () {
      return Meteor.users.findOne({_id: userId}).admin;
    }
  });
  //allow admin users to set users to paid or not paid
  Meteor.methods({
    "setUserToPaid": function (userId) {
      if (Meteor.users.findOne({_id: this.userId}).admin) {
        Meteor.users.update({_id: userId}, {$set: {paid: true}});
      }
    },
    "setUserToNotPaid": function (userId) {
      if (Meteor.users.findOne({_id: this.userId}).admin) {
        Meteor.users.update({_id: userId}, {$set: {paid: false}});
      }
    },
    "setUserToAdmin": function (userId) {
      if (Meteor.users.findOne({_id: this.userId}).admin) {
        Meteor.users.update({_id: userId}, {$set: {admin: true}});
      }
    }
  });
  Meteor.publish("menus", function () {
    //publish menus to users who have set the paid field to true or admin users
    if (Meteor.users.findOne({_id: this.userId}).paid || Meteor.users.findOne({_id: this.userId}).admin) {
      return Menus.find();
    }
  });
});
