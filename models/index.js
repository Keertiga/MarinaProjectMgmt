
var db = require('../db')

exports.create = function(user, text, cb) {
  var comment = {
    inputProjectName: inputProjectName,
    date: new Date().toString()
  }

  db.save(comment, cb)
}
