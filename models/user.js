var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
},{collection:'User'});


//creating a model using schema
var user = mongoose.model('User', UserSchema);

//exporting this model
module.exports = user;