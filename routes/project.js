'use strict'

var express = require('express');
var router = express.Router();
var url=require('url');
var querystring=require('querystring');
var isLoggedIn=require('./index').isLoggedIn;

var projectDetails=require('../models/projectDetails.js');

	//Handle POST to create project page
	router.get('/',isLoggedIn,function(req,res){
		res.render('project');
	});


	//GET beneficiary data to be displayed
	router.get('/data',isLoggedIn,function(req, res) {
	  benf_details.find({},function(err,data){
	           res.json(data);
	  });
	});

    //Handle POST to create project
	 router.post('/create',function(req,res){
	 	 console.log("create"+req.body.details);
	      projectDetails.collection.insert(req.body.details,function(err){
	          if(err)
	              res.json(err);
	          res.json("Project Created");
	      });
	  });




module.exports=router;