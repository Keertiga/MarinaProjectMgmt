var express = require('express');
var router = express.Router();
var url=require('url');
var querystring=require('querystring');
var mongoose =require('mongoose');

var benf_details=require('../models/benf_details.js');


router.get('/beneficiaryData', function(req, res) {
  console.log("here");
  benf_details.find({},function(err,data){
           console.log(data);
           res.json(data);
  });
});


//Fetches All beneficiary details 
/*router.get('/beneficiaryData', function(req, res) {
	benf_details.find({},function(data){
           res.json(data);
	});
});*/