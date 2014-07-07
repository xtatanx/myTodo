var app = app || {};

app.Router = Backbone.Router.extend({
  routes:{
    "": "landingPage",
    "user/:id": "getTodos"
  },

  landingPage: function(){
    console.log("index");
  },

  getTodos: function(id){
    console.log(id);
  }
});
