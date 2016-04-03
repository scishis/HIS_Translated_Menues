/* global Router Menus accountsUIBootstrap3 */
Meteor.startup(() => {
  if (Meteor.user() && Meteor.user().language) {
    Session.set("language", Meteor.user().language);
    accountsUIBootstrap3.setLanguage(Meteor.user().language !== "chinese" ? Meteor.user().language.slice(0, 2) : "zh-CN");
  }
  else if (Session.get("language")) {
    accountsUIBootstrap3.setLanguage(Session.get("language"));
  }
  else {
    Session.set("language", "english");
    accountsUIBootstrap3.setLanguage("en");
  }
});
Meteor.users.find().observeChanges({
  added() {
      if (Meteor.user() && Meteor.user().language) {
        Session.set("language", Meteor.user().language);
        accountsUIBootstrap3.setLanguage(Meteor.user().language !== "chinese" ? Meteor.user().language.slice(0, 2) : "zh-CN");
      }
    },
    changed() {
      if (Meteor.user() && Meteor.user().language) {
        Session.set("language", Meteor.user().language);
        accountsUIBootstrap3.setLanguage(Meteor.user().language !== "chinese" ? Meteor.user().language.slice(0, 2) : "zh-CN");
      }
    }
});
Accounts.onLogin(() => {
  if (Meteor.user().language) {
    Session.set("language", Meteor.user().language);
    accountsUIBootstrap3.setLanguage(Meteor.user().language !== "chinese" ? Meteor.user().language.slice(0, 2) : "zh-CN");
  }
});
Tracker.autorun(() => {
  Meteor.subscribe("menus");
  Meteor.subscribe("users");
});
Template.main.helpers({
  language(language) {
    return Session.equals("language", language);
  }
});
Template.header_en.helpers({
  active(tab) {
      return Router.current().route.getName() === tab ? "active" : "";
    },
    adminUser() {
      return Meteor.user().admin;
    }
});
Template.restaurants_en.helpers({
  paidUser() {
      return Meteor.user().admin || Meteor.user().paid;
    },
    menuList() {
      return !Router.current().params.query.name;
    },
    menus() {
      return Menus.find();
    },
    restaurantName() {
      return Menus.findOne({
        "restaurant.english": Router.current().params.query.name.replace(/_/g, " ")
      }).restaurant.english;
    },
    menu() {
      return Menus.findOne({
        "restaurant.english": Router.current().params.query.name.replace(/_/g, " ")
      }).menu;
    }
});
Template.admin_en.helpers({
  adminUser() {
      return Meteor.user().admin;
    },
    menuList() {
      return !Router.current().params.query.name;
    },
    menus() {
      return Menus.find();
    },
    restaurantName() {
      return Menus.findOne({
        "restaurant.english": Router.current().params.query.name.replace(/_/g, " ")
      }).restaurant.english;
    },
    menu() {
      return Menus.findOne({
        "restaurant.english": Router.current().params.query.name.replace(/_/g, " ")
      }).menu;
    },
    qrcode() {
      return Meteor.absoluteUrl(`menus/${Router.current().params.query.name}`);
    }
});
Template.header_ch.helpers({
  active(tab) {
      return Router.current().route.getName() === tab ? "active" : "";
    },
    adminUser() {
      return Meteor.user().admin;
    }
});
Template.restaurants_ch.helpers({
  paidUser() {
      return Meteor.user().admin || Meteor.user().paid;
    },
    menuList() {
      return !Router.current().params.query.name;
    },
    menus() {
      return Menus.find();
    },
    restaurantName() {
      return Menus.findOne({
        "restaurant.english": Router.current().params.query.name.replace(/_/g, " ")
      }).restaurant.chinese;
    },
    menu() {
      return Menus.findOne({
        "restaurant.english": Router.current().params.query.name.replace(/_/g, " ")
      }).menu;
    }
});
Template.admin_ch.helpers({
  adminUser() {
      return Meteor.user().admin;
    },
    menuList() {
      return !Router.current().params.query.name;
    },
    menus() {
      return Menus.find();
    },
    restaurantName() {
      return Menus.findOne({
        "restaurant.english": Router.current().params.query.name.replace(/_/g, " ")
      }).restaurant.chinese;
    },
    menu() {
      return Menus.findOne({
        "restaurant.english": Router.current().params.query.name.replace(/_/g, " ")
      }).menu;
    },
    qrcode() {
      return Meteor.absoluteUrl(`menus/${Router.current().params.query.name}`);
    }
});
Template.header_ko.helpers({
  active(tab) {
      return Router.current().route.getName() === tab ? "active" : "";
    },
    adminUser() {
      return Meteor.user().admin;
    }
});
Template.restaurants_ko.helpers({
  paidUser() {
      return Meteor.user().admin || Meteor.user().paid;
    },
    menuList() {
      return !Router.current().params.query.name;
    },
    menus() {
      return Menus.find();
    },
    restaurantName() {
      return Menus.findOne({
        "restaurant.english": Router.current().params.query.name.replace(/_/g, " ")
      }).restaurant.korean;
    },
    menu() {
      return Menus.findOne({
        "restaurant.english": Router.current().params.query.name.replace(/_/g, " ")
      }).menu;
    }
});
Template.admin_ko.helpers({
  adminUser() {
      return Meteor.user().admin;
    },
    menuList() {
      return !Router.current().params.query.name;
    },
    menus() {
      return Menus.find();
    },
    restaurantName() {
      return Menus.findOne({
        "restaurant.english": Router.current().params.query.name.replace(/_/g, " ")
      }).restaurant.korean;
    },
    menu() {
      return Menus.findOne({
        "restaurant.english": Router.current().params.query.name.replace(/_/g, " ")
      }).menu;
    },
    qrcode() {
      return Meteor.absoluteUrl(`menus/${Router.current().params.query.name}`);
    }
});
Template.header_en.events({
  "click .setLanguage" (event) {
    if (Meteor.user()) {
      Meteor.call("setLanguage", event.target.id.toLowerCase().slice(3, event.target.id.length));
    }
    Session.set("language", event.target.id.toLowerCase().slice(3, event.target.id.length));
    accountsUIBootstrap3.setLanguage(event.target.id.toLowerCase().slice(3, event.target.id.length) !== "chinese" ? event.target.id.toLowerCase().slice(3, 5) : "zh-CN");
  },
  "click #login-buttons-logout" () {
    Router.go("/");
  }
});
Template.admin_en.events({
  "click .restaurant" () {
    Router.go(`/admin?name=${this.restaurant.english.replace(/ /g, "_")}`);
  }
});
Template.restaurants_en.events({
  "click .restaurant" () {
    Router.go(`/restaurants?name=${this.restaurant.english.replace(/ /g, "_")}`);
  }
});
Template.header_ch.events({
  "click .setLanguage" (event) {
    if (Meteor.user()) {
      Meteor.call("setLanguage", event.target.id.toLowerCase().slice(3, event.target.id.length));
    }
    Session.set("language", event.target.id.toLowerCase().slice(3, event.target.id.length));
    accountsUIBootstrap3.setLanguage(event.target.id.toLowerCase().slice(3, event.target.id.length) !== "chinese" ? event.target.id.toLowerCase().slice(3, 5) : "zh-CN");
  },
  "click #login-buttons-logout" () {
    Router.go("/");
  }
});
Template.restaurants_ch.events({
  "click .restaurant" () {
    Router.go(`/restaurants?name=${this.restaurant.english.replace(/ /g, "_")}`);
  }
});
Template.admin_ch.events({
  "click .restaurant" () {
    Router.go(`/admin?name=${this.restaurant.english.replace(/ /g, "_")}`);
  }
});
Template.header_ko.events({
  "click .setLanguage" (event) {
    if (Meteor.user()) {
      Meteor.call("setLanguage", event.target.id.toLowerCase().slice(3, event.target.id.length));
    }
    Session.set("language", event.target.id.toLowerCase().slice(3, event.target.id.length));
    accountsUIBootstrap3.setLanguage(event.target.id.toLowerCase().slice(3, event.target.id.length) !== "chinese" ? event.target.id.toLowerCase().slice(3, 5) : "zh-CN");
  },
  "click #login-buttons-logout" () {
    Router.go("/");
  }
});
Template.restaurants_ko.events({
  "click .restaurant" () {
    Router.go(`/restaurants?name=${this.restaurant.english.replace(/ /g, "_")}`);
  }
});
Template.admin_ko.events({
  "click .restaurant" () {
    Router.go(`/admin?name=${this.restaurant.english.replace(/ /g, "_")}`);
  }
});
Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});
Router.configure({
  layoutTemplate: "main"
});
Router.route("/", function() {
  this.render(`home_${Session.get("language").slice(0, 2)}`);
});
Router.route("/pricing", function() {
  this.render(`pricing_${Session.get("language").slice(0, 2)}`);
});
Router.route("/restaurants", function() {
  this.render(`restaurants_${Session.get("language").slice(0, 2)}`);
});
Router.route("/restaurants?name=:english", function() {
  this.render(`restaurants_${Session.get("language").slice(0, 2)}`);
});
Router.route("/admin", function() {
  this.render(`admin_${Session.get("language").slice(0, 2)}`);
});
Router.route("/admin?name=:english", function() {
  this.render(`admin_${Session.get("language").slice(0, 2)}`);
});
