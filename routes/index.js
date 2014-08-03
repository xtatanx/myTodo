var express = require('express');
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

module.exports = router;