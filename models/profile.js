var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ProfileSchema = new Schema({
  lname:String,
  fname: String,
  gender: String,
  DOB: String,
  mobile: String,
  email:String,
  role: String,
  city: String,
  state: String,
  country:String,
  updated_at:Date
},{collection:'profile_details'});


//creating a model using schema
var profileDetails = mongoose.model('profile_details', ProfileSchema);

//exporting this model
module.exports = profileDetails;