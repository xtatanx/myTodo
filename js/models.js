Todo = Backbone.Model.extend({
	defaults:{
		'title': 'An empty todo',
		'done': false
	},
	localStorage: new Backbone.LocalStorage("todos-myapp")
});

todo = new Todo();