var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ProjectSchema = new Schema({
  category: String,
  name: String,
  desc: String,
  lead: String,
  email:String,
  start_date: Date,
  end_date: Date,
  locations: Array,
  funds: Number,
  currency: String,
  updated_at:Date
},{collection:'project_details'});


//creating a model using schema
var projectDetails = mongoose.model('project_details', ProjectSchema);

//exporting this model
module.exports = projectDetails;