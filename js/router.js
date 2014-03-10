var Routes = Backbone.Router.extend({

	routes:{
		'': 'home',
		'done': 'sort_done',
		'not-done': 'sort_not_done'
	},

	home: function(){
		console.log('all the todos');
	},

	sort_done: function(){
		console.log('done todos');
	},

	sort_not_done: function(){
		console.log('not done todos');
	}

});

var routes = new Routes();
