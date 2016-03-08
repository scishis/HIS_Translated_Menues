Meteor.startup(function () {
  Session.set("scanning", false);
});
Template.header.helpers({
  active: function (tab) {
    return Router.current().route.getName() === tab ? "active" : "";
  }
});
Template.home.helpers({
  scanning: function () {
    return Session.get("scanning");
  }
});
Template.home.events({
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
qrScanner.on("scan", function (error, message) {
  if (message) {
    $("#message").html(message);
    $("#toggleScanning").click();
    qrScanner.stopCapture();
  }
});
