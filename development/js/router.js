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


