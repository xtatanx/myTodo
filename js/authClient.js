var app = window.app || {};

(function (app) {
    'use strict';
    app.authClient = (function (app) {
        // private variables
        var url = 'https://the-todo-app.firebaseio.com/users',
            loginRef = new Firebase(url),
            userExist = null,
            auth,
            userName,
            userPic,
            userId;

        function createUser(user) {
            loginRef.child(user.id).set({
                name: userName,
                picture: userPic
            });
        }

        function login(provider) {
            auth.login(provider, {
                scope: 'public_profile,email'
            });
        }

        function logout() {
            auth.logout();
            userPic = null;
            userId = null;
            userExist = null;
            userName = null;
            app.user.set({
                authenticated: false,
                name: null,
                pic: null
            });
            app.router.navigate('', {trigger: true});
        }

        function getUserId() {
            return userId;
        }

        auth = new FirebaseSimpleLogin(loginRef, function (error, user) {
            if (error) {
                // If authentication fail's redirect to homepage
                app.router.navigate('', {trigger: true});
            } else if (user) { // if user succesfully autenthicate
                userName = user.displayName;
                userPic = user.thirdPartyUserData.picture.data.url;
                userId = user.id;
                console.log(user.id);
                // at this point create the collection
                app.Tasks = Backbone.Firebase.Collection.extend({
                    model: app.Task,
                    firebase: 'https://the-todo-app.firebaseio.com/users/' + user.id + '/todos'
                });

                app.tasks = new app.Tasks();
                app.addTask = new app.AddTask({collection: app.tasks});
                app.tasksView = new app.TasksView({collection: app.tasks});

                loginRef.once('value', function (dataSnapshot) {
                    userExist = dataSnapshot.hasChild(user.id);
                    if (userExist) {
                        // if user already exist navigate to its current list of Todos
                        console.log('user exist retrieveng todos');
                        app.user.set({
                            authenticated: true,
                            name: userName,
                            pic: userPic
                        });
                        app.router.navigate('/users/' + user.id, {trigger: true});
                    } else {
                        // if user doesnt exist create a new user on db
                        console.log('creating user');
                        createUser(user);
                    }
                });
            }

        });

        return {
            login: login,
            logout: logout,
            userId: getUserId
        };

    }(app));

}(app));