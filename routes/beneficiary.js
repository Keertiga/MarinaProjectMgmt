var express = require('express');
var router = express.Router();
var url=require('url');
var querystring=require('querystring');
var isLoggedIn=require('./index').isLoggedIn;

var benf_details=require('../models/benfDetails.js');

//GET create beneficiary page
router.get('/',isLoggedIn,function(req,res){
	res.render('beneficiary');
});

//GET edit beneficiary page
router.get('/edit',isLoggedIn,function(req,res){
	res.render('beneficiary/edit');
});

//GET beneficiary data to be displayed
router.get('/data',isLoggedIn,function(req, res) {
  benf_details.find({},function(err,data){
           res.json(data);
  });
});

module.exports=router;