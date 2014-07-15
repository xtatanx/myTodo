var app = window.app || {};

app.Tasks = Backbone.Firebase.Collection.extend({
    model: app.Task,
    firebase: 'https://the-todo-app.firebaseio.com/users/' + app.authClient.userId() + '/todos'
});

