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
    console.log(req.body," SERVEUR SELECT GROUPE")
    connexion.query(`SELECT * FROM groupe WHERE zIndex="0"` , (err, response) => {
        if(err) console.log(err)
        else {
            // console.log(response)
            res.json(response)
        }
    })
})

app.post('/sous-groupe', (req,res) => {
    console.log(req.body.idGroupe.id," SERVEUR SELECT SOUS GROUPE")
    connexion.query(`SELECT * FROM groupe WHERE id_categorie="${req.body.idGroupe.id}"`, (err, response) => {
        if(err) res.json("error")
        else {
            res.json(response)
        }
    }) 
})

app.post('/delGroupe', (req,res) => {
    console.log(req.body.id," SERVEUR DELETE GROUPE")
    connexion.query(`DELETE FROM groupe WHERE id="${req.body.id}"`, (err, response) => {
        if(err) res.json("error")
        else {
            connexion.query(`SELECT * FROM groupe WHERE zIndex="0"` , (err, response) => {
                if(err) console.log(err)
                else {
                    // console.log(response)
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

app.post('/pages/add', (req,res) => {
    console.log(66)
    connexion.query(`INSERT INTO pages (nom, nomNl) VALUES ('${req.body.fr}', '${req.body.nl}')`, (err, response) => {
        if(err) res.json("error")
        else {
            
                console.log(44, 'ERREUR ICI')
                connexion.query(`SELECT LAST_INSERT_ID() FROM pages WHERE id=LAST_INSERT_ID()`, (err, r) => {
                    if(err) console.log(err)
                    else {
                        console.log(r, 777)
                        for(let i=0;i<req.body.groupes.length;i++){
                            connexion.query(`INSERT INTO page_groupe (id_page, id_groupe) VALUES ('${r[0]['LAST_INSERT_ID()']}', '${req.body.groupes[i].id}')`, (err, response) => {
                                if(err) console.log(err)
                                else {
                                    if(i === req.body.groupes.length - 1) {
                                        connexion.query(`SELECT * FROM pages`, (err, result) => {
                                            if(err) res.json("error")
                                            else {
                                                res.json(result)
                                            }
                                        }) 
                                    }
                                }
                            })
                        }
                    }
                }) 
        }
    }) 
})

app.get('/pages', (req,res) => {
    connexion.query(`SELECT * FROM pages`, (err, response) => {
        if(err) console.log(err)
        else {
            res.json(response)
        }
    }) 
})

app.post('/post', (req,res) => {
    connexion.query(`SELECT * FROM post WHERE id_pages='${req.body.id}'`, (err, response) => {
        if(err) console.log(err)
        else {
            console.log(1)
            connexion.query(`SELECT * FROM page_groupe WHERE id_page='${req.body.id}'`, (err, r) => {
                if(err) console.log(err)
                else {
                    console.log(2,r.length)
                    const array = []
                    for(let i=0;i<r.length;i++){
                        
                    connexion.query(`SELECT * FROM groupe WHERE id ='${r[i].id_groupe}'`, (err, resp) => {
                        if(err) console.log(err)
                        else {
                            array.push(resp[0])
                            console.log(3,r[i].id_groupe)
                            if(i === r.length - 1) {
                                console.log(4)
                                console.log('a',{posts:response,groupes:array})
                            res.json({posts:response,groupes:array})
                            }
                        }
                    }) 
                }
                console.log('b',{posts:response,groupes:[]})
                if (r.length===0)res.json({posts:response,groupes:[]})
                }
            }) 
        }
    }) 
})

app.get('/groupes', (req,res) => {
    connexion.query(`SELECT * FROM groupe ORDER BY nom ASC`, (err, response) => {
        if(err) console.log(err)
        else {
            res.json(response)
        }
    }) 
})

app.post('/post/insert', (req,res) => {
    console.log(66)
    connexion.query(`INSERT INTO post (nom, nomNl) VALUES ('${req.body.fr}', '${req.body.nl}')`, (err, response) => {
        if(err) console.log(err)
        else {
            connexion.query(`SELECT * FROM pages`, (err, result) => {
                if(err) console.log(err)
                else {
                    res.json(result)
                }
            }) 
        }
    }) 
})

app.post('/post/add', (req,res) => {
    console.log(66)
    connexion.query(`INSERT INTO post (titre, descriptio,titreNL,descriptioNL,id_pages,url,image) VALUES ('${req.body.newPost.titre}', '${req.body.newPost.description}','${req.body.newPost.titreNl}','${req.body.newPost.descriptionNl}','${req.body.id}','${req.body.newPost.url}','${req.body.newPost.image}')`, (err, response) => {
        if(err) res.json("error")
        else {
            connexion.query(`SELECT * FROM post`, (err, result) => {
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

