var app = app || {};
app.Task = Backbone.Model.extend({
	defaults:{
		title: "An empyt task..",
		done: false,
		visible: true
	},

	validate: function(attrs){
		if(! $.trim(attrs.title)){
			return "The task has no title"
		}
	}
});

