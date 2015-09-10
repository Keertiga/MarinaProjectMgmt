var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var UserSchema = new Schema({
  name: String,
  email_id: String,
  password: String,
},{collection:'user_details'});


//creating a model using schema
var userDetails = mongoose.model('user_details', UserSchema);

//exporting this model
module.exports = userDetails;