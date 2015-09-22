var express = require('express');
var router = express.Router();

var mongoose =require('mongoose');
var project_category=require('../models/project_category.js');

router.get('/projectCategory', function(req, res) {
	project_category.find({},function(err,data){
           res.json(data);
	});
  
});

module.exports = router;