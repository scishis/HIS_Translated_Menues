/* global Random */
import {
  Menus
}
from "../common.js";
Meteor.startup(() => {
  //testing purposes
  Meteor.users.update({
    username: "dom"
  }, {
    $set: {
      admin: true
    }
  });
  if (Menus.find().count() === 0) {
    Menus.insert({
      restaurant: {
        chinese: "小餐馆",
        english: "Little Restaurant",
        korean: "작은 레스토랑"
      },
      menu: [{
        _id: Random.id(),
        name: {
          chinese: "比萨",
          english: "Pizza",
          korean: "피차"
        },
        price: 20
      }, {
        _id: Random.id(),
        name: {
          chinese: "面包",
          english: "Bread",
          korean: "빵"
        },
        price: 10
      }]
    });
    Menus.insert({
      restaurant: {
        chinese: "好日子餐厅",
        english: "Good Day Restaurant",
        korean: "좋은 날 레스토랑"
      },
      menu: [{
        _id: Random.id(),
        name: {
          chinese: "柠檬水",
          english: "Lemonade",
          korean: "레몬 에이드"
        },
        price: 5
      }, {
        _id: Random.id(),
        name: {
          chinese: "比萨",
          english: "Pizza",
          korean: "피차"
        },
        price: 25
      }]
    });
  }
  //allow admin users to insert, update, and remove menus
  Menus.allow({
    insert(userId) {
        return Meteor.users.findOne({
          _id: userId
        }).admin;
      },
      update(userId) {
        return Meteor.users.findOne({
          _id: userId
        }).admin;
      },
      remove(userId) {
        return Meteor.users.findOne({
          _id: userId
        }).admin;
      }
  });
  Meteor.users.deny({
    insert() {
        return true;
      },
      update() {
        return true;
      },
      remove() {
        return true;
      }
  });
  //allow admin users to set users to paid or not paid
  Meteor.methods({
    "setUserToPaid" (userId) {
      check(userId, String);
      if (Meteor.users.findOne({
          _id: this.userId
        }).admin) {
        Meteor.users.update({
          _id: userId
        }, {
          $set: {
            paid: true
          }
        });
      }
    },
    "setUserToNotPaid" (userId) {
      check(userId, String);
      if (Meteor.users.findOne({
          _id: this.userId
        }).admin) {
        Meteor.users.update({
          _id: userId
        }, {
          $set: {
            paid: false
          }
        });
      }
    },
    "setUserToAdmin" (userId) {
      check(userId, String);
      if (Meteor.users.findOne({
          _id: this.userId
        }).admin) {
        Meteor.users.update({
          _id: userId
        }, {
          $set: {
            admin: true
          }
        });
      }
    },
    "setLanguage" (language) {
      check(language, Match.OneOf("english", "chinese", "korean"));
      if (this.userId) {
        Meteor.users.update({
          _id: this.userId
        }, {
          $set: {
            language
          }
        });
      }
    },
    "addRestaurant" (english, chinese, korean) {
      check([english, chinese, korean], [String]);
      if (Meteor.users.findOne({
          _id: this.userId
        }).admin) {
        Menus.insert({
          restaurant: {
            english,
            chinese,
            korean
          },
          menu: []
        });
      }
    },
    "editRestaurant" (_id, english, chinese, korean) {
      check([_id, english, chinese, korean], [String]);
      if (Meteor.users.findOne({
          _id: this.userId
        }).admin && Menus.findOne({
          _id
        })) {
        Menus.update({
          _id
        }, {
          $set: {
            restaurant: {
              english,
              chinese,
              korean
            }
          }
        });
      }
    },
    "deleteRestaurant" (_id) {
      check(_id, String);
      if (Meteor.users.findOne({
          _id: this.userId
        }).admin) {
        Menus.remove({
          _id
        });
      }
    },
    "addFood" (_id, english, chinese, korean, price) {
      check([_id, english, chinese, korean], [String]);
      check(price, Number);
      check(price, Match.Where((a) => a >= 0 && Number.isFinite(a)));
      if (Meteor.users.findOne({
          _id: this.userId
        }).admin && Menus.findOne({
          _id
        })) {
        Menus.update({
          _id
        }, {
          $push: {
            menu: {
              _id: Random.id(),
              name: {
                english,
                chinese,
                korean
              },
              price
            }
          }
        });
      }
    },
    "editFood" (_id, food, english, chinese, korean, price) {
      check([_id, food, english, chinese, korean], [String]);
      check(price, Number);
      check(price, Match.Where((a) => a >= 0));
      if (Meteor.users.findOne({
          _id: this.userId
        }).admin && Menus.findOne({
          _id
        })) {
        Menus.update({
          _id
        }, {
          $set: {
            [`menu.${Menus.findOne({
          _id
        }).menu.findIndex((a) => a._id === food)}`]: {
              _id: food,
              name: {
                english,
                chinese,
                korean
              },
              price
            }
          }
        });
      }
    },
    "deleteFood" (_id, food) {
      check([_id, food], [String]);
      if (Meteor.users.findOne({
          _id: this.userId
        }).admin && Menus.findOne({
          _id
        })) {
        Menus.update({
          _id
        }, {
          $pull: {
            menu: {
              _id: food
            }
          }
        });
      }
    }
  });
  Meteor.publish("menus", function() {
    //publish menus to users who have set the paid field to true or admin users
    if (this.userId) {
      if (Meteor.users.findOne({
          _id: this.userId
        }).paid || Meteor.users.findOne({
          _id: this.userId
        }).admin) {
        return Menus.find();
      }
    }
    else {
      return [];
    }
  });
  Meteor.publish("users", function() {
    //publish all users to admin and the current user to non-admin
    if (this.userId) {
      if (Meteor.users.findOne({
          _id: this.userId
        }).admin) {
        return Meteor.users.find({}, {
          fields: {
            username: 1,
            paid: 1,
            admin: 1,
            language: 1
          }
        });
      }
      else {
        return Meteor.users.find({
          _id: this.userId
        }, {
          fields: {
            username: 1,
            emails: 1,
            paid: 1,
            admin: 1,
            language: 1
          }
        });
      }
    }
    else {
      return [];
    }
  });
});
