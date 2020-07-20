const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000
const cors = require('cors')
const connexion = require('./conf.js');
let session = false

app.use(cors({
    origin: 'http://localhost:8000'
}))

app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}))


app.post('/intro', (req,res) => {
    console.log(req.body," SERVEUR SELECT GROUPE")
    connexion.query(`SELECT * FROM groupe WHERE zIndex="0"` , (err, response) => {
        if(err) console.log(err)
        else {
            // console.log(response)
            res.json(response)
        }
    })
})

app.get('/allGroupe', (req,res) => {
    console.log(req.body," SERVEUR SELECT GROUPE")
    connexion.query(`SELECT * FROM groupe` , (err, response) => {
        if(err) console.log(err)
        else {
            res.json(response)
        }
    })
})

app.post('/path', (req,res) => {
    console.log(req.body," SERVEUR SELECT GROUPE")
    connexion.query(`SELECT * FROM groupe WHERE id = ${req.body.id}` , (err, response) => {
        if(err) console.log(err)
        else {
            res.json(response)
        }
    })
})

app.post('/sous-groupe', (req,res) => {
    console.log(req.body.idGroupe.groupe," SERVEUR SELECT SOUS GROUPE")
    const array = []
    connexion.query(`SELECT * FROM groupe WHERE id_categorie="${req.body.idGroupe.groupe}"`, (err, response) => {
        if(err) res.json("error")
        else {
            // console.log(req.body.idGroupe.groupe)
            if(response.length === 0){
                connexion.query(`SELECT * FROM idFiche WHERE idFiche="${req.body.idGroupe.groupe}"`, (err, response1) => {
                    if(err) res.json("error")
                    else { 
                        // console.log("ici", response1)
                        for(let i = 0; i < response1.length ; i++ ){
                            connexion.query(`SELECT * FROM fiches WHERE id="${response1[i].id}"`, (err, response2) => {
                                if(err) res.json("error")
                                else {    
                                    // console.log(response2)   
                                    array.push(response2[0])
                                    if(i === response1.length-1) res.json({fiches: array})  
                                }
                            })
                        }                           
                    }
                })
            } else {
                // console.log("la")
                res.json(response) 
            }
            
        }
    }) 
})

app.post('/delGroupe', (req,res) => {
    console.log(req.body.id," SERVEUR DELETE GROUPE")
    connexion.query(`DELETE FROM groupe WHERE id="${req.body.id}"`, (err, response) => {
        if(err) res.json("error")
        else {
            connexion.query(`SELECT * FROM groupe` , (err, response) => {
                if(err) console.log(err)
                else {
                    res.json(response)
                }
            })
        }
    }) 
})


app.put('/updateGroupe', (req,res) => {
    console.log(req.body.data.id," SERVEUR UPDATE GROUPE")
    connexion.query(`UPDATE groupe SET nom="${req.body.data.nom}", nomNl="${req.body.data.nomNl}" WHERE id=${req.body.data.id}`, (err, response) => {
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

app.post('/connexion', (req,res) => {
    console.log('CONNECT ADMIN', req.body.user, req.body.mdp)
    connexion.query(`SELECT * FROM panel`, (err, response) => {
        if(err) res.json("error")
        else {
            if(response[0].user == req.body.user && response[0].pass == req.body.mdp) {
                res.json(response)
            } else {
                res.json(false)
            }
        }
    }) 
})

app.post('/moveGroupe', (req,res) => {
    console.log('MOVE GROUPE', req.body.idOn, req.body.idOut)
    connexion.query(`UPDATE groupe SET id_categorie = ${req.body.idOut} WHERE id = ${req.body.idOn}`, (err, response) => {
        if(err) res.json("error")
        else {
            connexion.query(`SELECT * FROM groupe` , (err, response) => {
                if(err) console.log(err)
                else {
                    res.json(response)
                }
            })
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

