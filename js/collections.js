var Tasks = Backbone.Collection.extend({
	model: Task
});


var tasks = new Tasks([
	{
		title: 'my task'
	},
	{
		title: 'my task 1'
	},
	{
		title: 'my task 2'
	},
	{
		title: 'my task 3'
	}
]);
