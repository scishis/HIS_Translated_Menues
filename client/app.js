Meteor.startup(function () {
  Session.set("scanning", false);
  $(".container").load(function () {
    console.log(parseFloat($(".container").css("width")))
    Session.set("smallScreen", parseFloat($(".container").css("width")) < 750);
  });
  $(window).resize(function () {
    Session.set("smallScreen", parseFloat($(".container").css("width")) < 750);
  });
});
Template.header.helpers({
  active: function (tab) {
    return Router.current().route.getName() === tab ? "active" : "";
  },
  smallScreen: function () {
    return Session.get("smallScreen");
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
