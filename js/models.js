Todo = Backbone.Model.extend({
	defaults:{
		'title': 'An empty todo',
		'done': false
	}
});

todo = new Todo();