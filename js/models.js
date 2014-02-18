var Task = Backbone.Model.extend({
	defaults:{
		title: "An empyt task..",
		done: false
	},

	validate: function(attrs){
		if(! $.trim(attrs.title)){
			return "The task has no title"
		}
	}
});

var task = new Task;