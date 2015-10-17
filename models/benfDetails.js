var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var BenfDetailsSchema = new Schema({
  category: String,
  projectName:String,
  location: String,
  type: String,
  name: String,
  funds: Number,
  numPeopleBenefited:Number,
  transOwner: String,
  transDate: String,
  updated_at:String
 

},{collection:'benf_details'});


//creating a model using schema
var benfDetails = mongoose.model('benf_details', BenfDetailsSchema);

//exporting this model
module.exports = benfDetails;