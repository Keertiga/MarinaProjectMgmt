var express = require('express');
var router = express.Router();
var url=require('url');
var querystring=require('querystring');
var isLoggedIn=require('./index').isLoggedIn;

var mongoose  =require('mongoose');
var projectDetails=require('../models/projectDetails.js')
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

  //Handle POST for adding beneficiary details
  router.post('/create',function(req,res){
        
        //Find category based on the project
        projectDetails.find({name:req.body.project}).distinct('category',function(err,category){

                //Contstruct data to be inserted
                var data={
                        Category:category[0],
                        ProjectName:req.body.project,
                        Location:req.body.location,
                        Type:req.body.type,
                        Name:req.body.name,
                        Funds:parseFloat(req.body.funds),
                        NumPeopleBenefited:parseFloat(req.body.people),
                        TransOwner:req.body.owner,
                        TransDate:req.body.date
                }
                
                //Insert into data store
                benfDetails.collection.insert(data,function(err){  
                     if(err)
                        throw err;
                     res.json("succedd");
                 });
          });
   });

  //GET beneficiary data to be displayed
  router.get('/data',isLoggedIn,function(req, res) {
      benfDetails.find({}).exec({_id:'asc'},function(err,data){
           res.json(data);
      });
  });

  //DELETE beneficiary details
  router.post('/remove',function(req,res){
     console.log(req.body.ID);
      benfDetails.find({_id:req.body.ID}).remove().exec();
              res.json("success");
  });

  //GET update modal window for edit beneficiary details
   router.get('/update',isLoggedIn,function(req, res) {
       res.render('beneficiary/update');
  });

  //Handle POST for beneficairy update
  router.post('/update',function(req,res){


       //Contstruct data to be inserted
        var data={
              Category:req.body.category,
              ProjectName:req.body.project,
              Location:req.body.location,
              Type:req.body.type,
              Name:req.body.name,
              Funds:parseFloat(req.body.funds),
              NumPeopleBenefited:parseFloat(req.body.people),
              TransOwner:req.body.owner,
              TransDate:req.body.date
          }
      var id = mongoose.Types.ObjectId(req.body.id);

      benfDetails.collection.update({_id:id},data,function(err){
            if(err)
              throw err;
            res.json("success");
      });
  });


 //GET beneficiary details after filtering options
 router.get('/filter',function(req,res){
      
      var reqBody=querystring.parse(url.parse(req.url).query);  
      var filters=JSON.parse(reqBody.filters);

      //Constructing query if filters are selected
      var query={};

      if(filters["Funds"]!="0") 
         query.Funds={ $gt:parseFloat( filters["Funds"])};

      if(filters["Category"]!="")
        query.Category=filters["Category"];

      if(filters["Project"]!="")
        query.ProjectName=filters["Project"];

      if(filters["Location"]!="")
        query.Location=filters["Location"];

     
      //Getting the data based on the filter
      benfDetails.find(query,function(err,data){
         console.log(data); 
         res.json(data);
      });

 });


module.exports=router;