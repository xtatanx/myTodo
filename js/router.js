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
    app.landingPage = new app.LandingView();
  },

  getTodos: function(id){
    console.log('user/id: ' + id );
  },

  signUp: function(method){
    console.log('sign in up');
    var loginRef = new Firebase('https://the-todo-app.firebaseio.com/users');
    var auth = new FirebaseSimpleLogin(loginRef, function(error, user) {
      if(error){
        console.log(error);
        app.router.navigate('', {trigger: true});
      }else{
        if(loginRef.child(user.id)){
          console.log('user exists ---> make login');
        }else{
          console.log('user doesnt exist creating it');
          loginRef.child(user.id).set(user);
        }
      }

    });

    auth.login('facebook', {
      scope: 'public_profile,email'
    });        
  },

  loginUser: function(){
    console.log('login user');
  }

});
