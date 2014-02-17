var TaskView = Backbone.View.extend({
	tagName: "li",

	template: _.template( $('#task').html() ),

	initialize: function(){
		this.model.on("change", this.render, this);
	},

	render: function(){
		var template = this.template( this.model.toJSON() );

		this.$el.html( template );

		return this;
	},

	events: {
		'click .checkbox': 'toggleState'
	},

	toggleState: function(e){
		var $checkbox = $(e.target);

		if($checkbox.hasClass("icon-checkbox-unchecked")){
			$checkbox.removeClass("icon-checkbox-unchecked");
			$checkbox.addClass("icon-checkbox-checked");
		}else{
			$checkbox.addClass("icon-checkbox-unchecked");
			$checkbox.removeClass("icon-checkbox-checked");
		}

	}
});

var TasksView = Backbone.View.extend({
	el: '#tasks',

	initialize: function(){
		this.render();
	},

	render: function(){
		this.collection.each(this.addOne, this);

		return this;

	},

	addOne: function(task){
		var taskView = new TaskView({ model: task });
		this.$el.append( taskView.render().el );
	}
});


var tasksView = new TasksView({ collection: tasks });