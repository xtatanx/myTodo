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

    auth = new FirebaseSimpleLogin(loginRef, function(error, user) {
      if(error){
        // If authentication fail's redirect to homepage
        app.router.navigate('', {trigger: true});
      }else if(user){ // if user succesfully autenthicate
        userName = user.displayName;
        userPic = user.thirdPartyUserData.picture.data.url;

        loginRef.once('value', function(dataSnapshot){
          userExist = dataSnapshot.hasChild(user.id);
          if(userExist){
            // if user already exist on db redirect to home
            console.log('user exist redirecting home');
            app.user.set({
              authenticated: true,
              name: userName,
              pic: userPic
            });
            // app.router.navigate('/users/' + user.id, {trigger: true}); uncomment too keep advancing
          }else{
            // if user doesnt exist create a new user on db
            console.log('creating user');
            createUser(user);
          }          
        });        
      }

    });    

    return{
      login: login
    }

  }());

}(window));