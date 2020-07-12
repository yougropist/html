const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000
const cors = require('cors')
const connexion = require('./conf.js');

app.use(cors({
    origin: 'http://localhost:8000'
}))

app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}))


app.post('/intro', (req,res) => {
    // console.log("DATA serveur node recu du front:  ", req.body)
    connexion.query(`SELECT * FROM groupe WHERE zIndex="0"` , (err, response) => {
        if(err) console.log(err)
        else {
            // console.log(response)
            res.json(response)
        }
    })
})

app.post('/sous-groupe', (req,res) => {
    console.log(req.body.idGroupe.groupe,199)
    connexion.query(`SELECT * FROM groupe WHERE id_categorie="${req.body.idGroupe.groupe}"`, (err, response) => {
        if(err) res.json("error")
        else {
            res.json(response)
        }
    }) 
})

app.get('/champs', (req,res) => {
    connexion.query(`SELECT * FROM colonne`, (err, response) => {
        if(err) res.json("error")
        else {
            res.json(response)
        }
    }) 
})

app.put('/champs/update', (req,res) => {
    console.log(66)
    connexion.query(`UPDATE colonne SET nom ='${req.body.nom}', nomNl = '${req.body.nomNl}' WHERE id = '${req.body.id}'`, (err, response) => {
        if(err) res.json("error")
        else {
            res.json(response)
        }
    }) 
})

app.post('/champs/add', (req,res) => {
    console.log(66)
    connexion.query(`INSERT INTO colonne (nom, nomNl) VALUES ('${req.body.fr}', '${req.body.nl}')`, (err, response) => {
        if(err) res.json("error")
        else {
            connexion.query(`SELECT * FROM colonne`, (err, result) => {
                if(err) res.json("error")
                else {
                    res.json(result)
                }
            }) 
        }
    }) 
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

