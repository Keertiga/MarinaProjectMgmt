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

    var details=req.body.details;   
    projectDetails.find({name:details.ProjectName}).distinct('category',function(err,category){
            details["Category"]=category[0];
              benfDetails.collection.insert(details,function(err){
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
      var id = mongoose.Types.ObjectId(req.body.details.ID);

      benfDetails.collection.update({_id:id},req.body.details,function(err){
            if(err)
              throw err;
            res.json("success");
      });
  });



module.exports=router;