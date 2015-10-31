var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ProfileSchema = new Schema({
  userid:String,
  lname:String,
  fname: String,
  gender: String,
  DOB: Date,
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