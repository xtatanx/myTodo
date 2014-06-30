var Tasks = Backbone.Collection.extend({
	model: Task,
  firebase: new Backbone.Firebase("https://the-todo-app.firebaseio.com")

});


var tasks = new Tasks();
