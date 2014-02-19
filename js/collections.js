var Tasks = Backbone.Collection.extend({
	model: Task,

	localStorage: new Backbone.LocalStorage("todos-collection")
});


var tasks = new Tasks();
