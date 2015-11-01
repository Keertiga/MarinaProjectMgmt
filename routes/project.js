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
        	 username:req.session.passport.user.name,
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

<<<<<<< HEAD
    //Handle POST to update project
=======
     
    //Handle POST to update project 
>>>>>>> keeraj/develop
	router.post('/update',function(req,res){

		var id={
			category:req.body.details.category,
			name:req.body.details.name

		}
		projectDetails.collection.update(id,req.body.details,function(err){
			 if(err)
	            res.json(err);
	        res.json("Project Updated");
		});

	});

<<<<<<< HEAD
	//Handle POST to delete project
=======
   
    //Handle POST to delete a project
>>>>>>> keeraj/develop
	router.post('/delete',function(req,res){
		console.log(req.body.details);
		projectDetails.collection.remove({'name':req.body.details.name},function(err){
			 if(err)
	            res.json(err);     

		});
		res.json("Project Deleted");

	});

<<<<<<< HEAD
	//GET Project data to be displayed
=======
	//GET project data to be displayed
>>>>>>> keeraj/develop
	router.get('/data',isLoggedIn,function(req, res) {
    
      var reqBody=querystring.parse(url.parse(req.url).query);
      console.log(reqBody);

	  projectDetails.find(reqBody,function(err,data){
	           res.json(data);
	  });
	});

	//GET edit/delete project details page
    router.get('/edit',isLoggedIn,function(req, res) {
               res.render('project/edit');
    });

	//Get the projects count
    router.get('/count',isLoggedIn,function(req, res) {
    	console.log("At count");
    	var reqBody=querystring.parse(url.parse(req.url).query);
    	projectDetails.find().count(function(err,count){
    		console.log("count:"+count);
    		res.json(count);
    	});
     });

    //GET Project details in view mode
    router.get('/view',isLoggedIn,function(req, res) {
                    res.render('project/view');
     });

    
    //GET Project Details in edit mode
    router.get('/editform',isLoggedIn,function(req, res) {
                    res.render('project/update');
      });

  
      //Get Add project Category/Location form
      router.get('/addCategoryLoc',isLoggedIn,function(req, res) {
             res.render('project/addCategoryLoc');
      });


      //Handle POST to add category
      router.post('/addCategoryLoc',function(req,res){
   	
	      	projectCategory.collection.insert({name:req.body.projectCategory},function(err){
		          if(err)
		              res.json(err);
		          res.json("Project Category Created");
		    });

});



module.exports=router;
