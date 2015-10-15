var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var BenfDetailsSchema = new Schema({
  projectName:String,
  group: String,
  location: String,
  category: String,
  name: String,
  funds: Number,
  numPeopleBenefited:Number,
  transDate: String,
  transOwner: String,
  gender: String,
  age:Number
},{collection:'benf_details'});


//creating a model using schema
var benfDetails = mongoose.model('benf_details', BenfDetailsSchema);

//exporting this model
module.exports = benfDetails;