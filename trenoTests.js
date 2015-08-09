
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {createdAt: -1} });
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      event.preventDefault();

      // text is the name of the input
      var inputText = event.target.text.value;

      Tasks.insert({
        text: inputText,
        createdAt: new Date()
      });

      event.target.text.value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
