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


//creating a models using  above schema
var projectCategory = mongoose.model('project_category', CategorySchema);
var locations = mongoose.model('locations', locationSchema);

//exporting this model
module.exports = {
	projectCategory:projectCategory,
	locations:locations
}