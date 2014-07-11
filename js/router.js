var app = app || {};

app.Router = Backbone.Router.extend({
  routes:{
    '': 'landingPage',
    'users/:id': 'getTodos',
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
    app.mainSection.destroy();
    if(!app.addTask && !app.tasksView){
      console.log('creating views');
      // at this point create the collection
      app.Tasks = Backbone.Firebase.Collection.extend({
        model: app.Task,
        firebase: 'https://the-todo-app.firebaseio.com/users/'+app.authClient.userId()+'/todos'
      });      
      app.tasks = new app.Tasks();
      app.addTask = new app.AddTask({collection: app.tasks});
      app.tasksView = new app.TasksView({collection: app.tasks});
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


