var Task = Backbone.Model.extend({
	defaults:{
		title: "An empyt task..",
		done: false
	}
});

var task = new Task;