var express = require('express');
var router = express.Router();
var url=require('url');
var querystring=require('querystring');
var isLoggedIn=require('./index').isLoggedIn;

var projectDetails=require('../models/projectDetails.js');
var benfDetails=require('../models/benfDetails.js');


//GET analyics page
router.get('/',isLoggedIn,function(req,res){
    res.render('analytics');
})

//GET location page of analytics
router.get('/general',function(req,res){
       res.render('analytics/general');
});

//GET project page of analytics
router.get('/project',function(req,res){
       res.render('analytics/project');
});

//GET location page of analytics
router.get('/location',function(req,res){
       res.render('analytics/location');
});



//Fetches Projects based on Project Category
router.get('/projects', function(req, res) {
    var reqBody=querystring.parse(url.parse(req.url).query);
    projectDetails.find(reqBody,{name:'true'},function(err,data){
            res.json(data);
    });
});



//Fetches Location based on Project Category 
router.get('/locations', function(req, res) {
	var reqBody=querystring.parse(url.parse(req.url).query);
    
    if(reqBody["category"]=="all")
           reqBody={};

    projectDetails.find(reqBody).distinct('location',function(err,data){
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
     benfDetails.aggregate(query,function(err,data){
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
     benfDetails.aggregate(query,function(err,data){
    	 res.json({chartData:data}); 
     });
    
});


module.exports = router;