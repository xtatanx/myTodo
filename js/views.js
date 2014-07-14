var app = app || {};


// view for general layout
app.LandingView = Backbone.View.extend({
  el: 'body',

  template: _.template( $('#index').html() ),

  initialize: function(){
    this.render();
    this.createHeader();
    this.createMainLayout();
  },

  render: function(){
    var template = this.template();
    this.$el.html( template );
    return this;
  },

  createHeader: function(){
    app.connectView = new app.ConnectView({model: app.user});
  },

  createMainLayout: function(){
    app.mainSection = new app.MainView();
  },

  events: {
    'click .signUpBody': 'triggerSignUp'
  },

  triggerSignUp: function(e){
    app.connectView.signUp(e);
  }

});

// view for the header of the site
app.ConnectView = Backbone.View.extend({
  el: 'header',

  template: _.template( $('#connect').html() ),

  initialize: function(){
    this.render();
    this.on('signUp', this.signUp);
    this.model.on('change', this.render, this);
  },

  render: function(){
    var template = this.template(this.model.toJSON());
    this.$el.html(template);
    console.log('rendering');

    return this;
  },

  events: {
    'click .signUp': 'signUp',
    'click #login': 'login'
  },

  signUp: function(e){
    e.preventDefault();
    app.authClient.login('facebook');
  },

  login: function(){
    app.authClient.login('facebook');
  }

});

// main view of the landing page
app.MainView = Backbone.View.extend({
  tagName: 'section',
  className: 'main-content',

  template: _.template( $('#main-section').html() ),

  initialize: function(){
    this.render();
  },

  render: function(){
    var template = this.template();
    this.$el.html(template).appendTo('#main-wrapper');
  },

  destroy: function(){
    this.remove();
    this.unbind();
  }

});
// view for the todo section
app.AddTask = Backbone.View.extend({
  tagName: 'section',
  className: 'main-content',
  template: _.template( $('#user-todos').html() ),

  events:{
    'click #add': 'addTask',
    'click .filter_btn': 'filterAndActive',
    'keypress #inputTask': 'updateOnEnter'
  },

  initialize: function(){
    this.render();
  },

  render: function(){
     var template = this.template();
     this.$el.html(template).appendTo('#main-wrapper');
     this.delegateEvents();
     return this;
  },

  addTask: function(){

    var taskTitle = $('#inputTask'). val();
    $('#inputTask').val(""); //clear the input

    if($.trim(taskTitle) === ''){//check if the input has some text in it
      this.displayMessage("Todo's can not be empty");
    }else{
      var task = new app.Task( {title: taskTitle} ); // create the task model
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

  filterAndActive: function(e){
    this.filterByActive(e);
    this.toggleFilter(e);
  },

  filterByActive: function(e){
    var button = $(e.currentTarget);
    var buttons = button.parent().find(".filter_btn");
    buttons.removeClass("active");
    button.addClass("active");
  },

  toggleFilter: function(e){
    var filter = $(e.currentTarget).data('filter');

    switch(filter){
      case 'done':
        this.collection.each(function(model){
          if(!model.get('done')){
            model.set('visible', false);
          }else{
            model.set('visible', true);
          }   
        }, this);
        break;

      case('not-done'):
        this.collection.each(function(model){
          if(model.get('done')){
            model.set('visible', false);
          }else{
            model.set('visible', true);
          } 
        }, this);
        break;

      default:
        this.collection.each(function(model){
          model.set('visible', true);
        }, this); 
    }
  },

  destroy: function(){
    this.remove();
    this.unbind();
  }  

});

// view for the tasks
app.TasksView = Backbone.View.extend({
  el: '#tasks',

  initialize: function(){
    this._views = [];
    this.render();
    this.collection.on('add', this.addOne, this);
  },

  render: function(){
    this.collection.each(this.addOne, this);

    return this;

  },

  addOne: function(task){
    var taskView = new app.TaskView({ model: task });
    this._views.push(taskView);
    $('#tasks').append( taskView.render(). el );

    return this;
  },

  destroy: function(){
    this.remove();
    this.unbind();
  }  
  
});

// view for a single task
app.TaskView = Backbone.View.extend({
	tagName: "li",

	template: _.template( $('#task').html() ),

	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('remove', this.remove, this);
	},

	render: function(){
		var template = this.template( this.model.toJSON() );

		this.$el.html( template );

		return this;
	},

	events: {
		'click .checkbox': 'toggleState',
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
		app.tasks.remove(this.model);
	},

  destroy: function(){
    this.remove();
    this.unbind();
  }

});



 