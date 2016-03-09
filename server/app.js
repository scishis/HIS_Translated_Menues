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
  Meteor.users.deny({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function () {
      return true;
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
    if (this.userId) {
      if (Meteor.users.findOne({_id: this.userId}).paid || Meteor.users.findOne({_id: this.userId}).admin) {
        return Menus.find();
      }
    } else {
      return [];
    }
  });
  Meteor.publish("users", function () {
    //publish all users to admin and the current user to non-admin
    if (this.userId) {
      if (Meteor.users.findOne({_id: this.userId}).admin) {
        return Meteor.users.find({}, {fields: {emails: 1, paid: 1, admin: 1}});
      } else {
        return Meteor.users.find({_id: this.userId}, {fields: {emails: 1, paid: 1, admin: 1}});
      }
    } else {
      return [];
    }
  });
});
