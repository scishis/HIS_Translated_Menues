/* global Menus */
Meteor.startup(function () {
  //testing purposes
  Meteor.users.update({username: "dom"}, {$set: {admin: true}});
  if (Menus.find().count() === 0) {
    Menus.insert({
      restaurant: {chinese: "Dom's Restaurant (Chinese)", english: "Dom's Restaurant (English)", korean: "Dom's Restaurant (Korean)"},
      menu: [{
        name: {chinese: "Chinese Pizza", english: "English Pizza", korean: "Korean Pizza"},
        price: 20
      }, {
        name: {chinese: "Chinese Bread", english: "English Bread", korean: "Korean Bread"},
        price: 10
      }]
    });
    Menus.insert({
      restaurant: {chinese: "Ter's Restaurant (Chinese)", english: "Ter's Restaurant (English)", korean: "Ter's Restaurant (Korean)"},
      menu: [{
        name: {chinese: "Chinese Lemonade", english: "English Lemonade", korean: "Korean Lemonade"},
        price: 5
      }, {
        name: {chinese: "Chinese Breadrolls", english: "English Breadrolls", korean: "Korean Breadrolls"},
        price: 25
      }]
    });
    Menus.insert({
      restaurant: {chinese: "Jd's Restaurant (Chinese)", english: "Jd's Restaurant (English)", korean: "Jd's Restaurant (Korean)"},
      menu: [{
        name: {chinese: "Chinese Rice", english: "English Rice", korean: "Korean Rice"},
        price: 5
      }, {
        name: {chinese: "Chinese Green Bean", english: "English Green Bean", korean: "Korean Green Bean"},
        price: 20
      }]
    });
  }
  //allow admin users to insert, update, and remove menus
  Menus.allow({
    insert: function (userId) {
      return Meteor.users.findOne({_id: userId}).admin;
    },
    update: function (userId) {
      return Meteor.users.findOne({_id: userId}).admin;
    },
    remove: function (userId) {
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
      check(userId, String);
      if (Meteor.users.findOne({_id: this.userId}).admin) {
        Meteor.users.update({_id: userId}, {$set: {paid: true}});
      }
    },
    "setUserToNotPaid": function (userId) {
      check(userId, String);
      if (Meteor.users.findOne({_id: this.userId}).admin) {
        Meteor.users.update({_id: userId}, {$set: {paid: false}});
      }
    },
    "setUserToAdmin": function (userId) {
      check(userId, String);
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
