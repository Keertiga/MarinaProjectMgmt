var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project Management' });
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});




module.exports = router;
