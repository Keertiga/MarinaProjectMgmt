var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var BenfDetailsSchema = new Schema({
  Category: String,
  ProjectName:String,
  Location: String,
  Type: String,
  Name: String,
  Funds: Number,
  NumPeopleBenefited:Number,
  TransOwner: String,
  TransDate: String,
  Updated_at:String
 

},{collection:'benf_details'});


//creating a model using schema
var benfDetails = mongoose.model('benf_details', BenfDetailsSchema);

//exporting this model
module.exports = benfDetails;