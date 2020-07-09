const mysql = require('mysql');

const connexion = mysql.createConnection({
    host : 'ID273471_pfcsm.db.webhosting.be',
    user : 'ID273471_pfcsm',
    password : 'pfcsm2018',
    database : 'ID273471_pfcsm',
    insecureAuth : true

})

connexion.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
}); 

module.exports = connexion;