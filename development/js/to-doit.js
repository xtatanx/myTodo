var app = app || {};

(function(window){

  app.authClient = (function(){
    // private variables
    var url = 'https://the-todo-app.firebaseio.com/users';
    var loginRef = new Firebase(url);
    var userExist = null;    
    var auth;
    var userName;
    var userPic;
    var userId;

    function createUser(user){
      loginRef.child(user.id).set({
        name: userName,
        picture: userPic
      });
    }

    function login(provider){
      auth.login(provider , {
        scope: 'public_profile,email'
      });      
    }

    function getUserId(){
      return userId;
    }

    auth = new FirebaseSimpleLogin(loginRef, function(error, user) {
      if(error){
        // If authentication fail's redirect to homepage
        app.router.navigate('', {trigger: true});
      }else if(user){ // if user succesfully autenthicate
        userName = user.displayName;
        userPic = user.thirdPartyUserData.picture.data.url;
        userId = user.id;
        console.log(user.id);
        // at this point create the collection
        app.Tasks = Backbone.Firebase.Collection.extend({
          model: app.Task,
          firebase: 'https://the-todo-app.firebaseio.com/users/'+user.id+'/todos'
        });
        app.tasks = new app.Tasks();
        app.addTask = new app.AddTask({collection: app.tasks});
        app.tasksView = new app.TasksView({collection: app.tasks});        

        loginRef.once('value', function(dataSnapshot){
          userExist = dataSnapshot.hasChild(user.id);
          if(userExist){
            // if user already exist navigate to its current list of Todos
            console.log('user exist retrieveng todos');
            app.user.set({
              authenticated: true,
              name: userName,
              pic: userPic
            });
            app.router.navigate('/users/' + user.id, {trigger: true});
          }else{
            // if user doesnt exist create a new user on db
            console.log('creating user');
            createUser(user);
          }          
        });                
      }

    });    

    return{
      login: login,
      userId: getUserId
    }

  }());

}(window));
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


var app = app || {};

app.Tasks = Backbone.Firebase.Collection.extend({
	model: app.Task,
  firebase: 'https://the-todo-app.firebaseio.com/users/'+app.authClient.userId()+'/todos'
});


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



 
var app = app || {};

app.Router = Backbone.Router.extend({
  routes:{
    '': 'landingPage',
    'users/:id': 'getTodos',
    'users': 'getTodos',
    'sign-up': 'signUp',
    'login': 'loginUser'
  },

  landingPage: function(){
    console.log('landing page');
    if(!app.user){
      app.user = new app.User();
    }

    if(!app.landingPage){
      app.landingPage = new app.LandingView();
    }

    if(!app.mainSection){
      app.mainSection = new app.MainView({el: 'main'});      
    }else{
      app.mainSection.render();
    }

    if(app.addTask && app.tasksView){
      app.addTask.destroy();
      app.tasksView.destroy();
      // destroy all single todo views
      _.each(app.tasksView._views, function(subview){
        subview.destroy();
      });
    }
  },

  getTodos: function(id){
    console.log('get todos for: ' + id);
    if(!app.user){
      app.user = new app.User();
    }

    if(!app.landingPage){
      app.landingPage = new app.LandingView();
    }

    app.mainSection.destroy();

    if(!app.addTask && !app.tasksView){
      console.log('creating views');
      console.log(app.authClient.userId());     
    }else{
      console.log('just render');
      app.addTask.render();
      app.tasksView.render();
    }

  },

  signUp: function(method){
    console.log('sign in up');        
  },

  loginUser: function(){
    console.log('login user');
  }

});



var app = app || {};

app.init = function(){
  // models
  // this.task = new app.Task;
  // views
  // this.tasksView = new app.TasksView( {collection: app.tasks} );
  // this.addTask = new app.AddTask( {collection: app.tasks} );

  // collections
  // this.tasks = new app.Tasks();
  // router 
  this.router = new app.Router(); 
  Backbone.history.start({pushState: true});
}

$(function(){
  app.init();
});
