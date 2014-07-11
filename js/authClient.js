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