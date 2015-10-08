var express = require('express');
var router = express.Router();
var url=require('url');
var querystring=require('querystring');
var mongoose =require('mongoose');

var project_category=require('../models/project_category.js');
var project_details=require('../models/project_details.js');
var benf_details=require('../models/benf_details.js');



//Fetches All Project Categories
router.get('/projectCategory', function(req, res) {
	project_category.find({},function(err,data){
           res.json(data);
	});
});


//Fetches Projects based on Project Category
router.get('/projects', function(req, res) {
	var reqBody=querystring.parse(url.parse(req.url).query);
    project_details.find(reqBody,{name:'true'},function(err,data){
    	  res.json(data);
    });
});

//Fetches Location based on Project Category 
router.get('/locations', function(req, res) {
	var reqBody=querystring.parse(url.parse(req.url).query);
    
    if(reqBody["category"]=="all")
           reqBody={};

    project_details.find(reqBody).distinct('location',function(err,data){
    	  res.json(data);
    });
});


//get chart data for projects based on request parameters
router.get('/getProjectData', function(req, res) {

	 //parse request data
    var reqBody=querystring.parse(url.parse(req.url).query);
    var data=JSON.parse(reqBody.FormData);

    //contruct query to project location,sum of funds/benefitted people group by location
    var query=[];
    query.push({$match:{"projectName":data["Name"]}});

    if(data["Param"]=="funds")
        query.push({$group:{ _id:"$location",y:{$sum:"$funds"}}});
   	else
    	query.push({$group:{ _id:"$location",y:{$sum:"$numPeopleBenefited"}}});
    

     //hit db
     benf_details.aggregate(query,function(err,data){
    	 res.json({chartData:data}); 
     });
    
});


//get chart data for locations based on request parameters
router.get('/getLocationData', function(req, res) {

	 //parse request data
    var reqBody=querystring.parse(url.parse(req.url).query);
    var data=JSON.parse(reqBody.FormData);

    //contruct query to project location,sum of funds/benefitted people group by location
    var query=[];
    query.push({$match:{"location":data["location"]}});

    if(data["Param"]=="funds")
        query.push({$group:{ _id:"$projectName",y:{$sum:"$funds"}}});
   	else
    	query.push({$group:{ _id:"$projectName",y:{$sum:"$numPeopleBenefited"}}});
    

     //hit db
     benf_details.aggregate(query,function(err,data){
    	 res.json({chartData:data}); 
     });
    
});


module.exports = router;