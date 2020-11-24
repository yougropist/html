const mysql = require('mysql');
require('dotenv').config();

const connexion = mysql.createConnection({
  host : process.env.HOST,
  user : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE,
  insecureAuth : true
})

connexion.connect(function(err) {
  if (err) console.log(err);
  console.log("Connected!");
}); 

module.exports = connexion;