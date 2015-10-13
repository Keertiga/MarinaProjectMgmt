'use strict';

var express = require('express');
var router = express.Router();


var userDetails=require('../models/user_details.js');
var controllers=require('../controllers');

var benf_details=require('../models/benf_details.js');


router.get('/beneficiaryData', function(req, res) {
  console.log("here");
  benf_details.find({},function(err,data){
           console.log(data);
           res.json(data);
  });
});
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Project Management' });
});


router.post('/signin',function(req,res){
       res.redirect('/home');
});

router.get('/project',function(req,res){
       res.render('project');
});

router.get('/location',function(req,res){
       res.render('location');
});

router.get('/generateChart',function(req,res){
    controllers.getChartData(req.body,function(err,data){
           console.log(data)
    });
});

router.post('/register',function(req,res){
     controllers.register(req.body,function(err){
          if(err)
              res.redirect('/');
          else
              res.redirect('/home');
     });
});

//To edit or Remove bebenificary
router.post('/updateBenificiary', function(req, res, next) {
      console.log(req.body);

});


router.get('/home', function(req, res, next) {

  res.render('home');
});

router.get('/register', function(req, res) {
  res.render('register');
});


router.get('/editbeneficiary', function(req, res) {
  res.render('editbeneficiary');
});

router.get('/create', function(req, res) {
  res.render('createProject');
});
	







router.get('/beneficiary', function(req, res) {
  res.render('beneficiary');
});

router.get('/viewbeneficiary', function(req, res) {
  res.render('viewbeneficiary');
});

router.get('/analytics', function(req, res) {
  res.render('analytics');
});




module.exports = router;
