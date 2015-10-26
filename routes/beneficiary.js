var express = require('express');
var router = express.Router();
var url=require('url');
var querystring=require('querystring');
var isLoggedIn=require('./index').isLoggedIn;

var benfDetails=require('../models/benfDetails.js');
var beneficiaryType=require('../models/static.js').beneficiaryType;


  //GET create beneficiary page
  router.get('/',isLoggedIn,function(req,res){
  	res.render('beneficiary');
  });

  //GET edit beneficiary page
  router.get('/edit',isLoggedIn,function(req,res){
  	res.render('beneficiary/edit');
  });

  //GET beneficiary type
  router.get('/type', function(req, res) {
      beneficiaryType.find({},function(err,data){
               res.json(data);
        });
  });

  //Handle POST for project creation
  router.post('/create',function(req,res){
      benfDetails.collection.insert(req.body.details,function(err){
          if(err)
              res.json(err);
          res.json("beneficiary Created");
      });
  });

  //GET beneficiary data to be displayed
  router.get('/data',isLoggedIn,function(req, res) {
      benfDetails.find({},function(err,data){
               res.json(data);
      });
  });

  //DELETE beneficiary details
  router.post('/remove',function(req,res){
      benfDetails.find({_id:req.body.ID}).remove().exec();
              res.json("success");
  });



module.exports=router;