var express = require('express');
var User = require('../models/user');
var authManager = ('../config/authManager');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'To-doit' });
});

router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});


router.get('/sign-up', function(req, res) {
    res.render('sign-up', { title: 'sign-up' });
});

router.post('/sign-up', function(req, res){
    authManager.signUp(req);
});

module.exports = router;