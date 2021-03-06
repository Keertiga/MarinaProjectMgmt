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





//get chart data for projects based on request parameters
router.get('/getProjectData', function(req, res) {

	 //parse request data
    var reqBody=querystring.parse(url.parse(req.url).query);    
    var data=JSON.parse(reqBody.FormData);

    //contruct query to project location,sum of funds/benefitted people group by location
    var query=[];
    query.push({$match:{"ProjectName":data["Name"]}});

    if(data["Param"]=="funds")
        query.push({$group:{ _id:"$Location",y:{$sum:"$Funds"}}});
   	else
    	query.push({$group:{ _id:"$Location",y:{$sum:"$NumPeopleBenefited"}}});
    

     //hit db
     benfDetails.aggregate(query,function(err,data){
         console.log("project data"+JSON.stringify(data));
    	 res.json({chartData:data}); 
     });
    
});


//get chart data for locations based on request parameters
router.get('/getLocationData', function(req, res) {

	 //parse request data
    var reqBody=querystring.parse(url.parse(req.url).query);
    var data=JSON.parse(reqBody.FormData);
    console.log(data);

    //contruct query to project location,sum of funds/benefitted people group by location
    var query=[];
    query.push({$match:{"Location":data["Location"]}});

    if(data["Param"]=="funds")
        query.push({$group:{ _id:"$ProjectName",y:{$sum:"$Funds"}}});
   	else
    	query.push({$group:{ _id:"$ProjectName",y:{$sum:"$NumPeopleBenefited"}}});

    console.log(query);

     //hit db
     benfDetails.aggregate(query,function(err,data){
        console.log("location data"+JSON.stringify(data));
        res.json({chartData:data}); 
     });
    
});


module.exports = router;