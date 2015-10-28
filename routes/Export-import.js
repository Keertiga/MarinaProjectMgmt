node_xj = require("xls-to-json");

node_xj({
	input:"../Beneficiary.xls",
	output:"Beneficiary-out.json",
	sheet:"Sheet1",
  }, function(err, result) {
    if(err) {
      console.error(err);
    } else {
      console.log(result);
    }
});

