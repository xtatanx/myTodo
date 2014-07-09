var app = app || {};

app.User = Backbone.Model.extend({
  defaults:{
    authenticated: false,
    name: "",
    pic: ""
  }
});

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

