
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

      Tasks.insert({
        text: inputText,
        createdAt: new Date(),
        owned: Meteor.userId(),
        username: Meteor.user().username
      });

      event.target.text.value = "";
    },
    "change .hide-completed input": function (event) {
        Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.task.events({
    "click .toggle-checked": function (){
      Tasks.update( this._id, { $set: {checked: ! this.checked} } );
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
