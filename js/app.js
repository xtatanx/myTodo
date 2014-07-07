var app = app || {};

app.init = function(){
  this.task = new app.Task;
  this.tasks = new app.Tasks();
  this.tasksView = new app.TasksView( {collection: app.tasks} );
  this.addTask = new app.AddTask( {collection: app.tasks} ); 
  this.router = new app.Router(); 
  Backbone.history.start({pushState: true});
}

$(function(){
  app.init();
});
