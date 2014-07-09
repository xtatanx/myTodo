var app = app || {};

app.Router = Backbone.Router.extend({
  routes:{
    '': 'landingPage',
    'user/:id': 'getTodos',
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
  },

  getTodos: function(id){
    console.log('user/id: ' + id );
  },

  signUp: function(method){
    console.log('sign in up');        
  },

  loginUser: function(){
    console.log('login user');
  }

});


