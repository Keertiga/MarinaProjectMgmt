'use strict';

var express = require('express');
var router = express.Router();

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
        failureRedirect:'/register',
        failureFlash:true
    }));

    //GET home page
    router.get('/home',isLoggedIn,function(req, res) {
        res.render('home');
    });

    //GET Create Project Page
    router.get('/createProject',isLoggedIn,function(req, res) {
        res.render('createProject');
    });

    //Handle logout functionality
    router.get('/signout',function(req,res){
        console.log("here");
        req.logout();
        res.redirect('/');
    });


    return router;
}  

//exporting the functions
module.exports={    
    isLoggedIn:isLoggedIn,
    index:index
}

