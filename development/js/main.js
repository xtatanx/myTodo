// $(function(){

//   var chatRef = new Firebase('https://the-todo-app.firebaseio.com');
//   var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {

//     if(error){
//       console.log(error);
//     }else{
//       console.log(user);
//     }

//   });

//   $(".register").click(function(e){
//     e.preventDefault();
//     var method = $(this).data("method");
//     auth.login(method, {
//       scope: "public_profile,email"
//     });
//   });

// });