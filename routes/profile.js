'use strict'

var express = require('express');
var router = express.Router();
var url=require('url');
var querystring=require('querystring');
var isLoggedIn=require('./index').isLoggedIn;

var profile=require('../models/profile.js');

	//GET to display user profile
	router.get('/',isLoggedIn,function(req,res){
		var user=req.session.passport.user;
		res.render('profile',{user:user});
	});

   
    //GET profile data to be displayed
	router.get('/data',isLoggedIn,function(req, res) {
	    
	      var email=req.session.passport.user.email;
	      
		  profile.find({email:email},function(err,data){
		  	    if(err)
		  	    	res.json(err);
		  	    else
		            res.json(data);
		  });
	});


   //Handle POST to update profile data
	router.post('/update',function(req,res){

        var email=req.session.passport.user.email;

		profile.collection.update({email:email},req.body.details,function(err){
			 if(err)
	            res.json(err);
	         else
	            res.json("profile Updated");
		});

	});


	//GET to display edit mode of profile
    router.get('/edit',function(req, res) {
            res.render('profile/edit');
     });

	
    //GET to display view mode of profile
    router.get('/view',isLoggedIn,function(req, res) {

    	    var user=req.session.passport.user;
            res.render('profile/view',{user:user});
      });


module.exports=router;
