Meteor.startup(function () {
  Session.set("scanning", false);
});
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
  scanning: function () {
    return Session.get("scanning");
  }
});
Template.menus.events({
  "click #toggleScanning": function () {
    return Session.set("scanning", !Session.get("scanning"));
  }
});
Accounts.ui.config({
  passwordSignupFields: "EMAIL_ONLY"
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
Router.route("/admin", function () {
  this.render("admin");
});
qrScanner.on("scan", function (error, message) {
  if (Session.get("scanning")) {
    if ($("#message").html() === "Scanning..") {
      $("#message").html("Scanning. .");
    } else if ($("#message").html() === "Scanning. .") {
      $("#message").html("Scanning ..");
    } else if ($("#message").html() === "Scanning ..") {
      $("#message").html("Scanning..");
    } else {
      $("#message").html("Scanning..");
    }
    if (message) {
      $("#message").html("");
      $("#toggleScanning").click();
    }
  }
});
