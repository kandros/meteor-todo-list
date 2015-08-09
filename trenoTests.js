if (Meteor.isClient) {
  Template.body.helpers({
    tasks: [
      {text : "uno"},
      {text : "due"},
      {text : "tre"}
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
