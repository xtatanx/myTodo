var app = app || {};

app.init = function(){
  this.task = new app.Task;
  this.tasks = new app.Tasks();
  this.tasksView = new app.TasksView( {collection: app.tasks} );
  this.addTask = new app.AddTask( {collection: app.tasks} );  
  
}

$(function(){
  app.init();  
});
