/* global Router Menus */
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
    return !Router.current().params.query.name;
  },
  menus: function () {
    return Menus.find();
  },
  menu: function () {
    return Menus.findOne({"restaurant.english": Router.current().params.query.name.replace(/_/g, " ")}).menu;
  }
});
Template.admin.helpers({
  adminUser: function () {
    return Meteor.user().admin;
  },
  menuList: function () {
    return !Router.current().params.query.name;
  },
  menus: function () {
    return Menus.find();
  },
  menu: function () {
    return Menus.findOne({"restaurant.english": Router.current().params.query.name.replace(/_/g, " ")}).menu;
  },
  qrcode: function () {
    //remove .replace when deploying
    return (Meteor.absoluteUrl("menus/" + Router.current().params.query.name)).replace("https://", "");
  }
});
Template.menus.events({
  "click .restaurant": function () {
    Router.go("/menus?name=" + this.restaurant.english.replace(/ /g, "_"));
  }
});
Template.admin.events({
  "click .restaurant": function () {
    Router.go("/admin?name=" + this.restaurant.english.replace(/ /g, "_"));
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
Router.route("/menus?name=:english", function () {
  this.render("menus");
});
Router.route("/admin", function () {
  this.render("admin");
});
Router.route("/admin?name=:english", function () {
  this.render("admin");
});
