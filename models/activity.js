var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var BenfDetailsSchema = new Schema({
  username:String,
  date:Date,
  type:String,
  activityname:String
  
},{collection:'activity'});


//creating a model using schema
var activity = mongoose.model('activity', BenfDetailsSchema);

//exporting this model
module.exports = activity;