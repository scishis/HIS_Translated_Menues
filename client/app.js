/* global Router accountsUIBootstrap3 bootbox $ */
import {
  Menus
}
from "../common.js";
let selectedRestaurant;
let selectedFood;
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
      return !Router.current().params.query._id;
    },
    menus() {
      return Menus.find();
    },
    restaurantName() {
      return Menus.findOne({
        _id: Router.current().params.query._id
      }).restaurant.english;
    },
    menu() {
      return Menus.findOne({
        _id: Router.current().params.query._id
      }).menu;
    }
});
Template.admin_en.helpers({
  adminUser() {
      return Meteor.user().admin;
    },
    menuList() {
      return !Router.current().params.query._id;
    },
    menus() {
      return Menus.find();
    },
    restaurantName() {
      return Menus.findOne({
        _id: Router.current().params.query._id
      }).restaurant.english;
    },
    menu() {
      return Menus.findOne({
        _id: Router.current().params.query._id
      }).menu;
    },
    qrcode() {
      return Meteor.absoluteUrl(`menus/${Router.current().params.query._id}`);
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
      return !Router.current().params.query._id;
    },
    menus() {
      return Menus.find();
    },
    restaurantName() {
      return Menus.findOne({
        _id: Router.current().params.query._id
      }).restaurant.chinese;
    },
    menu() {
      return Menus.findOne({
        _id: Router.current().params.query._id
      }).menu;
    }
});
Template.admin_ch.helpers({
  adminUser() {
      return Meteor.user().admin;
    },
    menuList() {
      return !Router.current().params.query._id;
    },
    menus() {
      return Menus.find();
    },
    restaurantName() {
      return Menus.findOne({
        _id: Router.current().params.query._id
      }).restaurant.chinese;
    },
    menu() {
      return Menus.findOne({
        _id: Router.current().params.query._id
      }).menu;
    },
    qrcode() {
      return Meteor.absoluteUrl(`menus/${Router.current().params.query._id}`);
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
      return !Router.current().params.query._id;
    },
    menus() {
      return Menus.find();
    },
    restaurantName() {
      return Menus.findOne({
        _id: Router.current().params.query._id
      }).restaurant.korean;
    },
    menu() {
      return Menus.findOne({
        _id: Router.current().params.query._id
      }).menu;
    }
});
Template.admin_ko.helpers({
  adminUser() {
      return Meteor.user().admin;
    },
    menuList() {
      return !Router.current().params.query._id;
    },
    menus() {
      return Menus.find();
    },
    restaurantName() {
      return Menus.findOne({
        _id: Router.current().params.query._id
      }).restaurant.korean;
    },
    menu() {
      return Menus.findOne({
        _id: Router.current().params.query._id
      }).menu;
    },
    qrcode() {
      return Meteor.absoluteUrl(`menus/${Router.current().params.query._id}`);
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
Template.restaurants_en.events({
  "click .goToRestaurant" (e) {
    e.preventDefault();
    Router.go(`/restaurants?_id=${this._id}`);
  }
});
Template.admin_en.events({
  "click .goToRestaurant" (e) {
    e.preventDefault();
    Router.go(`/admin?_id=${this._id}`);
  },
  "click #addRestaurant" () {
    $("#addRestaurantModal").modal("show");
    $("#addEnglishName").val("");
    $("#addChineseName").val("");
    $("#addKoreanName").val("");
  },
  "click .editRestaurant" () {
    selectedRestaurant = this._id;
    $("#editRestaurantModal").modal("show");
    $("#editEnglishName").val(Menus.findOne({
      _id: selectedRestaurant
    }).restaurant.english);
    $("#editChineseName").val(Menus.findOne({
      _id: selectedRestaurant
    }).restaurant.chinese);
    $("#editKoreanName").val(Menus.findOne({
      _id: selectedRestaurant
    }).restaurant.korean);
  },
  "click .deleteRestaurant" () {
    selectedRestaurant = this._id;
    $("#deleteRestaurantModal").modal("show");
    $("#deleteRestaurantName").html(Menus.findOne({
      _id: selectedRestaurant
    }).restaurant.english);
    $("#deleteRestaurantInput").val("");
    $("#deleteRestaurantConfirm").prop("disabled", true);
  },
  "click #addRestaurantConfirm" (e) {
    if ($("#addEnglishName").val() !== "" && $("#addChineseName").val() !== "" && $("#addKoreanName").val() !== "") {
      let wait = bootbox.alert({
        title: "Adding Restaurant",
        message: "Please wait while a new restaurant is being added."
      });
      Meteor.call("addRestaurant", $("#addEnglishName").val(), $("#addChineseName").val(), $("#addKoreanName").val(), () => wait.modal("hide") && $("#addRestaurantModal").modal("hide"));
    }
    else {
      bootbox.alert({
        title: "Error",
        message: "One or more of the fields are blank."
      });
    }
  },
  "click #editRestaurantConfirm" () {
    if ($("#editEnglishName").val() !== "" && $("#editChineseName").val() !== "" && $("#editKoreanName").val() !== "") {
      let wait = bootbox.alert({
        title: "Editing Restaurant",
        message: "Please wait while the restaurant is being edited."
      });
      Meteor.call("editRestaurant", selectedRestaurant, $("#editEnglishName").val(), $("#editChineseName").val(), $("#editKoreanName").val(), () => wait.modal("hide") && $("#editRestaurantModal").modal("hide"));
    }
    else {
      bootbox.alert({
        title: "Error",
        message: "One or more of the fields are blank."
      });
    }
  },
  "keyup #deleteRestaurantInput" () {
    $("#deleteRestaurantConfirm").prop("disabled", $("#deleteRestaurantInput").val() !== "Delete Restaurant");
  },
  "click #deleteRestaurantConfirm" () {
    if ($("#deleteRestaurantInput").val() === "Delete Restaurant") {
      let wait = bootbox.alert({
        title: "Deleting Restaurant",
        message: "Please wait while the restaurant is being deleted."
      });
      Meteor.call("deleteRestaurant", selectedRestaurant, () => wait.modal("hide") && $("#deleteRestaurantModal").modal("hide"));
    }
  },
  "click #addFood" () {
    $("#addFoodModal").modal("show");
    $("#addEnglishName").val("");
    $("#addChineseName").val("");
    $("#addKoreanName").val("");
    $("#addPrice").val("");
  },
  "click .editFood" () {
    selectedFood = this._id;
    $("#editFoodModal").modal("show");
    $("#editEnglishName").val(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).name.english);
    $("#editChineseName").val(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).name.chinese);
    $("#editKoreanName").val(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).name.korean);
    $("#editPrice").val(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).price);
  },
  "click .deleteFood" () {
    selectedFood = this._id;
    $("#deleteFoodModal").modal("show");
    $("#deleteFoodName").html(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).name.english);
    $("#deleteFoodInput").val("");
    $("#deleteFoodConfirm").prop("disabled", true);
  },
  "click #addFoodConfirm" (e) {
    if ($("#addEnglishName").val() !== "" && $("#addChineseName").val() !== "" && $("#addKoreanName").val() !== "" && $("#addPrice").val() !== "") {
      if (parseFloat($("#addPrice").val()) >= 0 && Number.isFinite(parseFloat($("#addPrice").val()))) {
        let wait = bootbox.alert({
          title: "Adding Food",
          message: "Please wait while a new food is being added."
        });
        Meteor.call("addFood", Router.current().params.query._id, $("#addEnglishName").val(), $("#addChineseName").val(), $("#addKoreanName").val(), parseFloat($("#addPrice").val()), () => wait.modal("hide") && $("#addFoodModal").modal("hide"));
      }
      else {
        bootbox.alert({
          title: "Error",
          message: "The price must be a number greater than or equal to zero."
        });
      }
    }
    else {
      bootbox.alert({
        title: "Error",
        message: "One or more of the fields are blank."
      });
    }
  },
  "click #editFoodConfirm" () {
    if ($("#editEnglishName").val() !== "" && $("#editChineseName").val() !== "" && $("#editKoreanName").val() !== "" && $("#editPrice").val() !== "") {
      if (parseFloat($("#editPrice").val()) >= 0 && Number.isFinite(parseFloat($("#editPrice").val()))) {
        let wait = bootbox.alert({
          title: "Editing Food",
          message: "Please wait while the food is being edited."
        });
        Meteor.call("editFood", Router.current().params.query._id, selectedFood, $("#editEnglishName").val(), $("#editChineseName").val(), $("#editKoreanName").val(), parseFloat($("#editPrice").val()), () => wait.modal("hide") && $("#editFoodModal").modal("hide"));
      }
      else {
        bootbox.alert({
          title: "Error",
          message: "The price must be a number greater than or equal to zero."
        });
      }
    }
    else {
      bootbox.alert({
        title: "Error",
        message: "One or more of the fields are blank."
      });
    }
  },
  "keyup #deleteFoodInput" () {
    $("#deleteFoodConfirm").prop("disabled", $("#deleteFoodInput").val() !== "Delete Food");
  },
  "click #deleteFoodConfirm" () {
    if ($("#deleteFoodInput").val() === "Delete Food") {
      let wait = bootbox.alert({
        title: "Deleting Food",
        message: "Please wait while the food is being deleted."
      });
      Meteor.call("deleteFood", Router.current().params.query._id, selectedFood, () => wait.modal("hide") && $("#deleteFoodModal").modal("hide"));
    }
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
  "click .goToRestaurant" (e) {
    e.preventDefault();
    Router.go(`/restaurants?_id=${this._id}`);
  }
});
Template.admin_ch.events({
  "click .goToRestaurant" (e) {
    e.preventDefault();
    Router.go(`/admin?_id=${this._id}`);
  },
  "click #addRestaurant" () {
    $("#addRestaurantModal").modal("show");
    $("#addChineseName").val("");
    $("#addEnglishName").val("");
    $("#addKoreanName").val("");
  },
  "click .editRestaurant" () {
    selectedRestaurant = this._id;
    $("#editRestaurantModal").modal("show");
    $("#editChineseName").val(Menus.findOne({
      _id: selectedRestaurant
    }).restaurant.chinese);
    $("#editEnglishName").val(Menus.findOne({
      _id: selectedRestaurant
    }).restaurant.english);
    $("#editKoreanName").val(Menus.findOne({
      _id: selectedRestaurant
    }).restaurant.korean);
  },
  "click .deleteRestaurant" () {
    selectedRestaurant = this._id;
    $("#deleteRestaurantModal").modal("show");
    $("#deleteRestaurantName").html(Menus.findOne({
      _id: selectedRestaurant
    }).restaurant.chinese);
    $("#deleteRestaurantInput").val("");
    $("#deleteRestaurantConfirm").prop("disabled", true);
  },
  "click #addRestaurantConfirm" (e) {
    if ($("#addEnglishName").val() !== "" && $("#addChineseName").val() !== "" && $("#addKoreanName").val() !== "") {
      let wait = bootbox.alert({
        title: "添加餐馆",
        message: "请稍候，正在添加新的餐馆。"
      });
      Meteor.call("addRestaurant", $("#addEnglishName").val(), $("#addChineseName").val(), $("#addKoreanName").val(), () => wait.modal("hide") && $("#addRestaurantModal").modal("hide"));
    }
    else {
      bootbox.alert({
        title: "错误",
        message: "一个或多个名称是空白。"
      });
    }
  },
  "click #editRestaurantConfirm" () {
    if ($("#editEnglishName").val() !== "" && $("#editChineseName").val() !== "" && $("#editKoreanName").val() !== "") {
      let wait = bootbox.alert({
        title: "编辑餐馆",
        message: "请稍候，正在编辑餐馆。"
      });
      Meteor.call("editRestaurant", selectedRestaurant, $("#editEnglishName").val(), $("#editChineseName").val(), $("#editKoreanName").val(), () => wait.modal("hide") && $("#editRestaurantModal").modal("hide"));
    }
    else {
      bootbox.alert({
        title: "错误",
        message: "一个或多个名称是空白。"
      });
    }
  },
  "keyup #deleteRestaurantInput" () {
    $("#deleteRestaurantConfirm").prop("disabled", $("#deleteRestaurantInput").val() !== "删除餐馆");
  },
  "click #deleteRestaurantConfirm" () {
    if ($("#deleteRestaurantInput").val() === "删除餐馆") {
      let wait = bootbox.alert({
        title: "删除餐馆",
        message: "请稍候，正在删除餐馆。"
      });
      Meteor.call("deleteRestaurant", selectedRestaurant, () => wait.modal("hide") && $("#deleteRestaurantModal").modal("hide"));
    }
  },
  "click #addFood" () {
    $("#addFoodModal").modal("show");
    $("#addChineseName").val("");
    $("#addEnglishName").val("");
    $("#addKoreanName").val("");
    $("#addPrice").val("");
  },
  "click .editFood" () {
    selectedFood = this._id;
    $("#editFoodModal").modal("show");
    $("#editChineseName").val(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).name.chinese);
    $("#editEnglishName").val(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).name.english);
    $("#editKoreanName").val(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).name.korean);
    $("#editPrice").val(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).price);
  },
  "click .deleteFood" () {
    selectedFood = this._id;
    $("#deleteFoodModal").modal("show");
    $("#deleteFoodName").html(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).name.chinese);
    $("#deleteFoodInput").val("");
    $("#deleteFoodConfirm").prop("disabled", true);
  },
  "click #addFoodConfirm" (e) {
    if ($("#addEnglishName").val() !== "" && $("#addChineseName").val() !== "" && $("#addKoreanName").val() !== "" && $("#addPrice").val() !== "") {
      if (parseFloat($("#addPrice").val()) >= 0 && Number.isFinite(parseFloat($("#addPrice").val()))) {
        let wait = bootbox.alert({
          title: "添加食品",
          message: "请稍候，正在添加新的食品。"
        });
        Meteor.call("addFood", Router.current().params.query._id, $("#addEnglishName").val(), $("#addChineseName").val(), $("#addKoreanName").val(), parseFloat($("#addPrice").val()), () => wait.modal("hide") && $("#addFoodModal").modal("hide"));
      }
      else {
        bootbox.alert({
          title: "错误",
          message: "价格必须是一个大于或等于零的数。"
        });
      }
    }
    else {
      bootbox.alert({
        title: "错误",
        message: "一个或多个名称是空白。"
      });
    }
  },
  "click #editFoodConfirm" () {
    if ($("#editEnglishName").val() !== "" && $("#editChineseName").val() !== "" && $("#editKoreanName").val() !== "" && $("#editPrice").val() !== "") {
      if (parseFloat($("#editPrice").val()) >= 0 && Number.isFinite(parseFloat($("#editPrice").val()))) {
        let wait = bootbox.alert({
          title: "编辑食品",
          message: "请稍候，正在编辑食品。"
        });
        Meteor.call("editFood", Router.current().params.query._id, selectedFood, $("#editEnglishName").val(), $("#editChineseName").val(), $("#editKoreanName").val(), parseFloat($("#editPrice").val()), () => wait.modal("hide") && $("#editFoodModal").modal("hide"));
      }
      else {
        bootbox.alert({
          title: "错误",
          message: "价格必须是一个大于或等于零的数。"
        });
      }
    }
    else {
      bootbox.alert({
        title: "错误",
        message: "一个或多个名称是空白。"
      });
    }
  },
  "keyup #deleteFoodInput" () {
    $("#deleteFoodConfirm").prop("disabled", $("#deleteFoodInput").val() !== "删除食品");
  },
  "click #deleteFoodConfirm" () {
    if ($("#deleteFoodInput").val() === "删除食品") {
      let wait = bootbox.alert({
        title: "删除食品",
        message: "请稍候，正在删除食品。"
      });
      Meteor.call("deleteFood", Router.current().params.query._id, selectedFood, () => wait.modal("hide") && $("#deleteFoodModal").modal("hide"));
    }
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
  "click .goToRestaurant" (e) {
    e.preventDefault();
    Router.go(`/restaurants?_id=${this._id}`);
  }
});
Template.admin_ko.events({
  "click .goToRestaurant" (e) {
    e.preventDefault();
    Router.go(`/admin?_id=${this._id}`);
  },
  "click #addRestaurant" () {
    $("#addRestaurantModal").modal("show");
    $("#addKoreanName").val("");
    $("#addEnglishName").val("");
    $("#addChineseName").val("");
  },
  "click .editRestaurant" () {
    selectedRestaurant = this._id;
    $("#editRestaurantModal").modal("show");
    $("#editKoreanName").val(Menus.findOne({
      _id: selectedRestaurant
    }).restaurant.korean);
    $("#editEnglishName").val(Menus.findOne({
      _id: selectedRestaurant
    }).restaurant.english);
    $("#editChineseName").val(Menus.findOne({
      _id: selectedRestaurant
    }).restaurant.chinese);
  },
  "click .deleteRestaurant" () {
    selectedRestaurant = this._id;
    $("#deleteRestaurantModal").modal("show");
    $("#deleteRestaurantName").html(Menus.findOne({
      _id: selectedRestaurant
    }).restaurant.korean);
    $("#deleteRestaurantInput").val("");
    $("#deleteRestaurantConfirm").prop("disabled", true);
  },
  "click #addRestaurantConfirm" (e) {
    if ($("#addEnglishName").val() !== "" && $("#addChineseName").val() !== "" && $("#addKoreanName").val() !== "") {
      let wait = bootbox.alert({
        title: "음식점 추가",
        message: "새로운 레스토랑이 추가되는 동안 기다려주십시오."
      });
      Meteor.call("addRestaurant", $("#addEnglishName").val(), $("#addChineseName").val(), $("#addKoreanName").val(), () => wait.modal("hide") && $("#addRestaurantModal").modal("hide"));
    }
    else {
      bootbox.alert({
        title: "오류",
        message: "하나 이상의 필드는 비어 있습니다."
      });
    }
  },
  "click #editRestaurantConfirm" () {
    if ($("#editEnglishName").val() !== "" && $("#editChineseName").val() !== "" && $("#editKoreanName").val() !== "") {
      let wait = bootbox.alert({
        title: "편집 음식점",
        message: "레스토랑 편집하는 동안 기다려주십시오."
      });
      Meteor.call("editRestaurant", selectedRestaurant, $("#editEnglishName").val(), $("#editChineseName").val(), $("#editKoreanName").val(), () => wait.modal("hide") && $("#editRestaurantModal").modal("hide"));
    }
    else {
      bootbox.alert({
        title: "오류",
        message: "하나 이상의 필드는 비어 있습니다."
      });
    }
  },
  "keyup #deleteRestaurantInput" () {
    $("#deleteRestaurantConfirm").prop("disabled", $("#deleteRestaurantInput").val() !== "음식점 삭제");
  },
  "click #deleteRestaurantConfirm" () {
    if ($("#deleteRestaurantInput").val() === "음식점 삭제") {
      let wait = bootbox.alert({
        title: "삭제 음식점",
        message: "음식점이 삭제되는 동안 잠시 기다려주십시오."
      });
      Meteor.call("deleteRestaurant", selectedRestaurant, () => wait.modal("hide") && $("#deleteRestaurantModal").modal("hide"));
    }
  },
  "click #addFood" () {
    $("#addFoodModal").modal("show");
    $("#addKoreanName").val("");
    $("#addEnglishName").val("");
    $("#addChineseName").val("");
    $("#addPrice").val("");
  },
  "click .editFood" () {
    selectedFood = this._id;
    $("#editFoodModal").modal("show");
    $("#editKoreanName").val(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).name.korean);
    $("#editEnglishName").val(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).name.english);
    $("#editChineseName").val(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).name.chinese);
    $("#editPrice").val(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).price);
  },
  "click .deleteFood" () {
    selectedFood = this._id;
    $("#deleteFoodModal").modal("show");
    $("#deleteFoodName").html(Menus.findOne({
      _id: Router.current().params.query._id
    }).menu.find((a) => a._id === selectedFood).name.korean);
    $("#deleteFoodInput").val("");
    $("#deleteFoodConfirm").prop("disabled", true);
  },
  "click #addFoodConfirm" (e) {
    if ($("#addEnglishName").val() !== "" && $("#addChineseName").val() !== "" && $("#addKoreanName").val() !== "" && $("#addPrice").val() !== "") {
      if (parseFloat($("#addPrice").val()) >= 0 && Number.isFinite(parseFloat($("#addPrice").val()))) {
        let wait = bootbox.alert({
          title: "음식을 추가",
          message: "새로운 음식을을 추가하는 동안 기다려주십시오."
        });
        Meteor.call("addFood", Router.current().params.query._id, $("#addEnglishName").val(), $("#addChineseName").val(), $("#addKoreanName").val(), parseFloat($("#addPrice").val()), () => wait.modal("hide") && $("#addFoodModal").modal("hide"));
      }
      else {
        bootbox.alert({
          title: "오류",
          message: "가격은 숫자 0보다 크거나 동일해야한다."
        });
      }
    }
    else {
      bootbox.alert({
        title: "오류",
        message: "One or more of the fields are blank."
      });
    }
  },
  "click #editFoodConfirm" () {
    if ($("#editEnglishName").val() !== "" && $("#editChineseName").val() !== "" && $("#editKoreanName").val() !== "" && $("#editPrice").val() !== "") {
      if (parseFloat($("#editPrice").val()) >= 0 && Number.isFinite(parseFloat($("#editPrice").val()))) {
        let wait = bootbox.alert({
          title: "Editing Food",
          message: "Please wait while the food is being edited."
        });
        Meteor.call("editFood", Router.current().params.query._id, selectedFood, $("#editEnglishName").val(), $("#editChineseName").val(), $("#editKoreanName").val(), parseFloat($("#editPrice").val()), () => wait.modal("hide") && $("#editFoodModal").modal("hide"));
      }
      else {
        bootbox.alert({
          title: "오류",
          message: "가격은 숫자 0보다 크거나 동일해야한다."
        });
      }
    }
    else {
      bootbox.alert({
        title: "오류",
        message: "하나 이상의 필드는 비어 있습니다."
      });
    }
  },
  "keyup #deleteFoodInput" () {
    $("#deleteFoodConfirm").prop("disabled", $("#deleteFoodInput").val() !== "음식을 삭제");
  },
  "click #deleteFoodConfirm" () {
    if ($("#deleteFoodInput").val() === "음식을 삭제") {
      let wait = bootbox.alert({
        title: "삭제 음식을",
        message: "음식이 삭제되는 동안 잠시 기다려주십시오."
      });
      Meteor.call("deleteFood", Router.current().params.query._id, selectedFood, () => wait.modal("hide") && $("#deleteFoodModal").modal("hide"));
    }
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
Router.route("/restaurants?_id=:_id", function() {
  this.render(`restaurants_${Session.get("language").slice(0, 2)}`);
});
Router.route("/admin", function() {
  this.render(`admin_${Session.get("language").slice(0, 2)}`);
});
Router.route("/admin?_id=:_id", function() {
  this.render(`/admin?name=${Session.get("language").slice(0, 2)}`);
});
