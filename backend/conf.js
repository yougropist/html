const mysql = require('mysql');
require('dotenv').config();

const connexion = mysql.createConnection({
  host : "ID273471_pfcsm.db.webhosting.be",
  user : "ID273471_pfcsm",
  password : "ff18e410",
  database : "ID273471_pfcsm",
  insecureAuth : true
})

connexion.connect(function(err) {
  if (err) console.log(err);
  console.log("Connected!");
}); 

module.exports = connexion;