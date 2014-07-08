var app = app || {};

app.init = function(){
  // models
  // this.task = new app.Task;
  // views
  // this.tasksView = new app.TasksView( {collection: app.tasks} );
  // this.addTask = new app.AddTask( {collection: app.tasks} );

  // collections
  // this.tasks = new app.Tasks();
  // router 
  this.router = new app.Router(); 
  Backbone.history.start({pushState: true});
}

$(function(){
  app.init();
});
