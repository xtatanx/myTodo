var app = app || {};

app.Tasks = Backbone.Firebase.Collection.extend({
	model: app.Task,
  firebase: "https://the-todo-app.firebaseio.com/todos"

});

