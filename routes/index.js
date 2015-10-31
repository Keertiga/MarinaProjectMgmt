'use strict';

var express = require('express');
var router = express.Router();


var url=require('url');
var querystring=require('querystring');
var projectCategory=require('../models/static.js').projectCategory;
var locations=require('../models/static.js').locations;
var projectDetails=require('../models/projectDetails.js');
var activity=require('../models/activity.js');


//function to check if user is logged in
var isLoggedIn=function(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/');
}


//function to handle sign in/sign up features
var index=function(passport){

    // GET login page
    router.get('/', function(req, res) {
        res.render('index', { title: 'Project Management' });
    });

    //Handle About before and after login
    router.get('/about',function(req, res) {
        res.render('about');
    });

    //Handle Contact before and after login
      router.get('/contact',function(req, res) {
        res.render('contact');
    });

    //Handle FAQ before and after login
      router.get('/faq',function(req, res) {
        res.render('faq');
    });


    // Handle POST signin
    router.post('/signin',passport.authenticate('signin',{
        successRedirect:'/home',
        failureRedirect:'/',
        failureFlash:true
    }));
    
    //GET register page
    router.get('/register', function(req, res) {
        res.render('register');
    });


    //Handle POST register
    router.post('/register',passport.authenticate('register',{
        successRedirect:'/home',
        failureRedirect:'/',
        failureFlash:true
    }));


    //GET home page
    router.get('/home',isLoggedIn,function(req, res) {
        res.render('home',{username:req.session.passport.user});
    });




    //Handle logout functionality
    router.get('/signout',function(req,res){
        req.logout();
        res.redirect('/');
    });

    
    //Fetches All Project Categories
    router.get('/projectCategory', function(req, res) {
        projectCategory.find({},function(err,data){
               res.json(data);
        });
    });

    
    //Fetches Projects based on Project Category
    router.get('/projects', function(req, res) {
        var reqBody=querystring.parse(url.parse(req.url).query);

        console.log(reqBody);

        if(reqBody["category"]=="all")
               reqBody={};

        projectDetails.find(reqBody).distinct('name',function(err,data){
            if(err)
                {console.log(err);}
                res.json(data);
        });
    });


    //Fetches All locations
    router.get('/AllLocations', function(req, res) {
        locations.find({},function(err,data){
               res.json(data);
        });
    });



    //Fetches Location based on Project Category and Projects
    router.get('/locations', function(req, res) {
        var reqBody=querystring.parse(url.parse(req.url).query);

        if(reqBody["category"]=="all" || reqBody["name"]=="all")
               reqBody={};

        projectDetails.find(reqBody).distinct('locations',function(err,data){
              console.log(data);
              res.json(data);
        });
    });

    //fetches activity log for the user
    router.get('/activities',isLoggedIn,function(req,res){

          var name=req.session.passport.user;

          //Retrieve data based on the logged in user
          activity.find({username:name}).sort({_id:'desc'}).limit(5).exec(function(err,data){
              if(err)
                res.json("err");
              res.json(data);

          });
    });

    return router;
}  


//exporting the functions
module.exports={    
    isLoggedIn:isLoggedIn,
    index:index
}


