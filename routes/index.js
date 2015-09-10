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

router.get('/beneficiary', function(req, res, next) {
  res.render('beneficiary');
});

router.get('/viewbeneficiary', function(req, res, next) {
  res.render('viewbeneficiary');
});

module.exports = router;
