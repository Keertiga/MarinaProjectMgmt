var nodemailer=require("nodemailer");
var fs=require('fs');
var path=require('path');
var config=require('../config');


module.exports=function(to,subject,content,attachment){

   //Initial Configuration
	var transport=nodemailer.createTransport("SMTP",{

		service:"Gmail",

		auth:{
			user:config.mail.auth.user,
			pass:config.mail.auth.pass
		}

	});

    var filepath=path.resolve('.')+'\\files\\'+attachment;

    //Read attachment from server
    fs.readFile(filepath,function(err,data){
    	if(err)
    		throw err;

        //Populating mail options
    	var options={
		from:config.mail.FromAddress,	
		to:to,
		subject:subject,
		html:content,
		attachments:[{'filename':attachment,'contents':data}]
	    }

       //Send Mail Function
       transport.sendMail(options,function(err,info){
	       	if(err)
	       		throw err;
       });

    });

   //close the connection
    transport.close();
}


	





	
