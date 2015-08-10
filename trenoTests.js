
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function () {
      if (Session.get("hideCompleted")) {
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      }
      return Tasks.find({}, {sort: {createdAt: -1} });
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      event.preventDefault();

      // text is the name of the input
      var inputText = event.target.text.value;

      Meteor.call("addTask", inputText);

      event.target.text.value = "";
    },
    "change .hide-completed input": function (event) {
        Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.task.events({
    "click .toggle-checked": function (){
      Meteor.call("setChecked", this._id, ! this.checked);
    },
    "click .delete": function () {
      Meteor.call("deleteTask", this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods({
  addTask: function (text) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owned: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId) {
    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    Tasks.update( taskId, {$set: {checked: setChecked}});
  }
});



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
