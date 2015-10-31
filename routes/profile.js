'use strict'

var express = require('express');
var router = express.Router();
var url=require('url');
var querystring=require('querystring');
var isLoggedIn=require('./index').isLoggedIn;

var profileDetails=require('../models/profileDetails.js');

	//Handle POST to create profile page
	router.get('/',isLoggedIn,function(req,res){
		console.log(req.session.passport);
		res.render('profile/userprofile',{username:req.session.passport.user});
	});



	router.post('/update',function(req,res){
		console.log(req.body.details);
		profileDetails.collection.update({'name':req.body.details.name},req.body.details,function(err){
			 if(err)
	            res.json(err);
	        res.json("profile Updated");

		});

	});


	router.post('/delete',function(req,res){
		console.log(req.body.details);
		profileDetails.collection.remove({'name':req.body.details.name},function(err){
			 if(err)
	            res.json(err);
	        

		});
		res.json("profile Deleted");

	});

	//GET beneficiary data to be displayed
	router.get('/data',isLoggedIn,function(req, res) {
    
     console.log(" profile here");
      var reqBody=querystring.parse(url.parse(req.url).query);

      console.log("reqBody"+reqBody);
	  profileDetails.find(reqBody,function(err,data){
	  	      console.log(data);
	           res.json(data);
	  });
	});

	//Get profile details to view
    router.get('/edit',isLoggedIn,function(req, res) {
                    res.render('profile/edit');
      });

	
    	//Get profile details to view
    router.get('/view',isLoggedIn,function(req, res) {
                    res.render('profile/view');
      });

    //Handle POST to create profile
	 router.post('/create',function(req,res){
	 	 console.log("create"+req.body.details);
	      profileDetails.collection.insert(req.body.details,function(err){
	          if(err)
	              res.json(err);
	          res.json("profile Created");
	      });
	  });




module.exports=router;
