node_xj = require("xls-to-json");
MongoClient = require("mongodb").MongoClient,format=require('util'.format);

// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

node_xj({
	input:"./Beneficiary.xls",
	output:"Beneficiary-out.json",
	sheet:"Sheet1",
  }, function(err, result) {
    if(err) {
      console.error(err);
    } else {
      console.log(result);
    }
});

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) 
{
    if(err) throw err;

        var fs = require('fs');
        var mydocuments = fs.readFile('Beneficiary-out.json', 'utf8', function (err, data) {
     var collection = db.collection('Benf_details');
    	collection.insert(JSON.parse(data), function(err, docs) 
        { // Should succeed
    	   collection.count(function(err, count) {
           console.log(format("count = %s", count));
           console.log("[" + data + "]" );
           db.close();
        });
});
