var mysql = require('mysql');
const util = require('util');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:'enliven',
});
connection.query = util.promisify(connection.query).bind(connection);

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;