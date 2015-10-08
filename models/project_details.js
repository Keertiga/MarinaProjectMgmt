var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ProjectSchema = new Schema({
  category: String,
  name: String,
  location:String,
  description: String,
  lead: String,
  contact_email: String,
  contact_number: String,
  org_type: String,
  start_date: Date,
  end_date: Date,
  locations: Array,
  total_funds: Number,
  currency: String
},{collection:'project_details'});


//creating a model using schema
var projectDetails = mongoose.model('project_details', ProjectSchema);

//exporting this model
module.exports = projectDetails;