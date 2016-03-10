Tracker.autorun(function () {
  Meteor.subscribe("menus");
  Meteor.subscribe("users");
});
Template.header.helpers({
  active: function (tab) {
    return Router.current().route.getName() === tab ? "active" : "";
  },
  adminUser: function () {
    return Meteor.user().admin;
  }
});
Template.menus.helpers({
  paidUser: function () {
    return Meteor.user().admin || Meteor.user().paid;
  },
  menuList: function () {
    return Router.current().route.getName();
  }
});
Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});
Router.configure({
  layoutTemplate: "main"
});
Router.route("/", function () {
  this.render("home");
});
Router.route("/pricing", function () {
  this.render("pricing");
});
Router.route("/menus", function () {
  this.render("menus");
});
Router.route("/menus/:_id", function () {
  this.render("menus");
});
Router.route("/admin", function () {
  this.render("admin");
});
