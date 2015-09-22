var mongoose =require('mongoose');
var userDetails=require('../models/user_details.js');

mongoose.connect('mongodb://localhost/ProjectMgmt');

module.exports={
	register:function(content,callback){
        var data={
             name:content.name,
             email_id:content.email_id,
             password:content.password
        };
        userDetails.collection.insert(data,function(err){
        	callback(err);
        });
	},

	signin:function(content,callback){
        console.log(content.email_id);
		userDetails.find({email_id:content.email_id},function(err,data){
             if(data.password==content.password)
             	 callback(err,data.name);
             else 
                  callback(err,null);
		});
	}
}
