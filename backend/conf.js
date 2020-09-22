const mysql = require('mysql');
require('dotenv').config();

const connexion = mysql.createConnection({
  host : env.HOST,
  user : env.USER,
  password : env.PASSWORD,
  database : env.DATABASE,
  insecureAuth : true
})

connexion.connect(function(err) {
  if (err) console.log(err);
  console.log("Connected!");
}); 

module.exports = connexion;