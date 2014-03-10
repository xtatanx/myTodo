var TaskView = Backbone.View.extend({
	tagName: "li",

	template: _.template( $('#task').html() ),

	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},

	render: function(){
		var template = this.template( this.model.toJSON() );

		this.$el.html( template );

		return this;
	},

	events: {
		'click .icon-checkbox': 'toggleState',
		'click .task_title': 'editTask',
		'keypress .edit': 'updateOnEnter',
		'click  .close_btn': 'clear'
	},

	toggleState: function(e){
		var $checkbox = $(e.target);
		this.model.save('done', !this.model.get('done'));

	},

	editTask: function(e){
		this.task = $(e.target);
		this.editBox = this.task.next();
		this.editInput = this.editBox.find('.edit');

		$(".task_title").removeClass("display__none");
		$(".editBox").removeClass("edit_box__editing");
		this.task.addClass("display__none")
		this.editBox.addClass("edit_box__editing");
		this.editInput.attr('placeholder', this.task.text()).focus();
	},

	updateOnEnter: function(e){
		if(e.keyCode === 13){
			this.close();
		}
	},

	close: function(){
		var value = this.editInput.val();
		if(!value){
			this.task.removeClass("display__none")
			this.editBox.removeClass("edit_box__editing");
		}else{
			this.model.save({title: value});
			this.task.removeClass("display__none")
			this.editBox.removeClass("edit_box__editing");
		}
	},

	clear:function(){
		this.model.destroy();
	}
});

var TasksView = Backbone.View.extend({
	el: '#tasks',

	initialize: function(){
		this.render();
		this.collection.on('add', this.addOne, this);
		this.collection.on()
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

var AddTask = Backbone.View.extend({
	el: '#todos',

	initialize: function(){
		this.collection.fetch();
	},

	events:{
		'click #add': 'addTask',
		'click #filter_done': 'sort_done',
		'keypress #inputTask': 'updateOnEnter'
	},

	addTask: function(){

		var taskTitle = $('#inputTask'). val();
		$('#inputTask').val(""); //clear the input

		if($.trim(taskTitle) === ''){//check if the input has some text in it
			this.displayMessage("Todo's can not be empty");
		}else{
			var task = new Task( {title: taskTitle} ); // create the task model
			this.collection.create(task); //add the model to the collection			
		}
	},

	displayMessage: function(msg){
		$('#inputTask').focus().attr("placeholder", msg);
	},

	updateOnEnter: function(e){
		if(e.keyCode === 13){
			this.addTask();
		}
	},

	sort_done: function(){
		var done = this.collection.where({done: true});
		console.log(done);
	}

});


var tasksView = new TasksView( {collection: tasks} );
var addTask = new AddTask( {collection: tasks} ); 