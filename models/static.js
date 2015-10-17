var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for category
var CategorySchema = new Schema({
  name: String
},{collection:'project_category'});

// create a schema for locations
var locationSchema = new Schema({
  location: String
},{collection:'locations'});

//create schema for beneficiary type
var benfTypeSchema = new Schema({
  type: String
},{collection:'benf_type'});

//creating a models using  above schema
var projectCategory = mongoose.model('project_category', CategorySchema);
var locations = mongoose.model('locations', locationSchema);
var beneficiaryType = mongoose.model('benf_type', benfTypeSchema);

//exporting this model
module.exports = {
	projectCategory:projectCategory,
	locations:locations,
	beneficiaryType:beneficiaryType
}