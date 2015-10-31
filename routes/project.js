'use strict'

var express = require('express');
var router = express.Router();
var url=require('url');
var querystring=require('querystring');
var isLoggedIn=require('./index').isLoggedIn;

var projectDetails=require('../models/projectDetails.js');
var projectCategory=require('../models/static.js').projectCategory;
var activity=require('../models/activity.js');


	//Handle POST to create project page
	router.get('/',isLoggedIn,function(req,res){
		res.render('project');
	});


	 //Handle POST to create project
	 router.post('/create',function(req,res){

	    projectDetails.collection.insert(req.body.details,function(err){
	          if(err)
	              res.json(err);
	          res.json("success");    
	      });

        //Data formation for activity log
        var log={
        	 username:req.session.passport.user,
        	 date:req.body.details.updated_at,
        	 type:'Project Creation',
        	 activityname:req.body.details.name
        }
        
        //Insert into activity data store
        activity.collection.insert(log,function(err){
        	  if(err)
        	  	res.json(err);
        });

	  });

    
	router.post('/update',function(req,res){
		console.log(req.body.details);
		projectDetails.collection.update({'name':req.body.details.name},req.body.details,function(err){
			 if(err)
	            res.json(err);
	        res.json("Project Updated");

		});

	});


	router.post('/delete',function(req,res){
		console.log(req.body.details);
		projectDetails.collection.remove({'name':req.body.details.name},function(err){
			 if(err)
	            res.json(err);
	        

		});
		res.json("Project Deleted");

	});

	//GET beneficiary data to be displayed
	router.get('/data',isLoggedIn,function(req, res) {
    
     console.log("here");
      var reqBody=querystring.parse(url.parse(req.url).query);

      console.log("reqBody"+reqBody);
	  projectDetails.find(reqBody,function(err,data){
	  	      console.log(data);
	           res.json(data);
	  });
	});

	//Get Project details to view
    router.get('/edit',isLoggedIn,function(req, res) {
                    res.render('project/edit');
      });

	//Get the record count
    router.get('/count',isLoggedIn,function(req, res) {
    	console.log("At count");
    	var reqBody=querystring.parse(url.parse(req.url).query);
    	projectDetails.find().count(function(err,count){
    		console.log("count:"+count);
    		res.json(count);
    	});
     });

    //Get Project details to view
    router.get('/view',isLoggedIn,function(req, res) {
                    res.render('project/view');
      });

    router.get('/editform',isLoggedIn,function(req, res) {
                    res.render('project/editform');
      });

	 router.post('/create',function(req,res){
	 	 console.log("create"+req.body.details);
	      projectDetails.collection.insert(req.body.details,function(err){
	          if(err)
	              res.json(err);
	          res.json("Project Created");
	      });
	  });
  
      //Get Add project Category/Location form
      router.get('/addCategoryLoc',isLoggedIn,function(req, res) {
             res.render('project/addCategoryLoc');
      });

      // Project Category/Location to view
      router.post('/addCategoryLoc',function(req,res){
   
   			
      	projectCategory.collection.insert({name:req.body.projectCategory},function(err){
	          if(err)
	              res.json(err);
	          res.json("Project Category Created");
	    });




      });



module.exports=router;
