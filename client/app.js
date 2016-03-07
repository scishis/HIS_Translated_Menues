Template.header.helpers({
  active: function (tab) {
    return Router.current().route.getName() === tab ? "active" : "";
  }
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
