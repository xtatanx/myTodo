// load the local strategy
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// load the user model
var User = require('../models/user');

var authManager = {
    signUp: function(req){
        console.log(req.body);
    }
}

module.exports = authManager;

