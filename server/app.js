var admins = [];
Meteor.users.allow({
  update: function (userId) {
    return admins.indexOf(Meteor.users.findOne({_id: userId}).username) !== -1;
  }
});
Menus.allow({
  insert: function (userId) {
    return admins.indexOf(Meteor.users.findOne({_id: userId}).username) !== -1;
  },
  update: function (userId) {
    return admins.indexOf(Meteor.users.findOne({_id: userId}).username) !== -1;
  },
  remove: function () {
    return admins.indexOf(Meteor.users.findOne({_id: userId}).username) !== -1;
  }
});
Meteor.publish("menus", function () {
  if (Meteor.users.findOne({_id: this.userId}).paid) {
    return Menus.find();
  }
});
