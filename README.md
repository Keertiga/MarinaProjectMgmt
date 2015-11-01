# MarinaProjectMgmt

Please find the video of demo here https://docs.google.com/uc?id=0B-yJFx7iyKXHTnRpVmdydEU1ajA&export=download

Project Management application 

Project Management application is the web based application for managing application across locations.

Technical stack applied for the development are
             Node js with express framework,
             Bootstrap,jquery,highcharts js
             Mongo db.

Set up steps
      1.Clone the master branch of the project.
      2.Install node js,mongodb and do the setup.
      3.Create db and schemas for which details are given below.
      4.Go to cloned location,run "npm install -d" in command prompt and do additional npm install -g <middleware> if dependencies are not resolved.
      5.Run "npm start" in  command prompt.
      6.In browser,type http://localhost:3000
      
 Schema for mongodb
    1.Start monogo db server by typing mongod in command prompt and connect client to it by running mongo.
    2.Create db and schema by following commands
          use ProjectMgmt;
          db.createCollection('User');
          db.createCollection('project_details');   
          db.createCollection('benf_details');
          db.createCollection('activity');
          db.createCollection('project_category');
          db.createCollection('locations');
          db.createCollection('profile_details')
    3.Then do the mongo import of db dumps we will be sharing
         mongoimport -d 'ProjectMgmt' -c <collection name> --file <filename.json>
      
      We have attached sample .xls file "Book.xls" for import feature and db dumps in folder db dumps.
          
             
