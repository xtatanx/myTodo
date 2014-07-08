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

app.Firebase = (function(){

  var loginRef = new Firebase('https://the-todo-app.firebaseio.com');
  var userExist = null;    
  var auth = new FirebaseSimpleLogin(loginRef, function(error, user) {
    if(error){
      console.log(error);
      app.router.navigate('', {trigger: true});
    }else{
      loginRef.once('value', function(dataSnapshot){
        userExist = dataSnapshot.hasChild(user.id);
        if(userExist){
          console.log('user exist redirecting home');
          app.router.navigate('', {trigger: true});
        }else{
          console.log('creating user');
          loginRef.child(user.id).set({
            name: user.displayName,
            picture: user.thirdPartyUserData.picture.data.url
          });
        }          
      });        
    }
  });

  function authorize(){
    auth.login('facebook', {
      scope: 'public_profile,email'
    });
  }

  return {
    authorize: authorize
  };

}());

