Todos = Backbone.Collection.extend({
	model: Todo,
	localStorage: new Backbone.LocalStorage("todos-myapp")
});

todos = new Todos();