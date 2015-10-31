var localStrategy=require('passport-local').Strategy;
var bCrypt=require('bcrypt-nodejs');
var User=require('../models/user.js');
var profile=require('../models/profile.js');



//Generates hash.Used for password encryption
var genHash=function(password){
    return bCrypt.hashSync(password,bCrypt.genSaltSync(10),null);
}

//Check password is valid for user
var isValidPassword=function(user,password){
    return bCrypt.compareSync(password,user.password);
}

module.exports=function(passport){

  passport.serializeUser(function(user,done){
      //set user name and email in session
      var data={
        name:user.name,
        email:user.email
      }
      done(null,data);
  });


  passport.deserializeUser(function(name,done){
       User.find(name,function(err,user){
            done(err,user);
         });
  });


  //For register 
  passport.use('register',new localStrategy({ 
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
  },
  function(req,email,password,done){

        //Check if user already exists with input email id   
        User.findOne({"email":email},function(err,user){
             if(err)
                return done(err);
             if(user){
                return done(null,false,req.flash('msg','has already be taken'));
             }
             else{
                 var userData={ 
                    name:req.body.username,
                    email:req.body.email,
                    password:genHash(req.body.password)
                  }; 

                  //Register the user 
                  User.collection.insert(userData,function(err){
                      if(err)
                         throw err;
                      done(null,userData);
                    });

                  //Create profile for user
                  var profileData={
                    fname:req.body.username,
                    email:req.body.email,
                  }

                  profile.collection.insert(profileData,function(err){
                      if(err)
                         throw err;
                  });

                }

             });
     })
); 

  //For login 
  passport.use('signin',new localStrategy({ 
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
  },
  function(req,email,password,done){

        //Check if user already exists with input email id   
        User.findOne({"email":email},function(err,user){
             if(err)
                return done(err);
             
             if(!user){
                return done(null,false,req.flash('msg','User does not exist'));
             }

             if(!isValidPassword(user,password)){
                return done(null,false,req.flash('msg','Invalid Password'));
             }

             //if user log in is successfull
             return done(null,user);

             });
     })
); 






















}