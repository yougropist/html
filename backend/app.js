const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 80;
const cors = require('cors')
const connexion = require('./conf.js');
require('dotenv').config();
const sendgrid = require('@sendgrid/mail');

app.use(cors({
    origin: 'http://localhost'
}))

app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}))

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/contact', (req,res) => {
    try {
        sendgrid.send({
            to: process.env.EMAIL,
            from: req.body.email,
            subject: req.body.subject,
            html: `<p>${req.body.message}</p><p>${req.body.firstName} ${req.body.lastName}</p>`,
        }, () => res.json('success'));
    }
    catch (error) {
        console.log("mailMember error:", error)
        res.json('error')
    }
})

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

app.post('/selectFiche', (req,res) => {
    console.log(req.body," SERVEUR SELECT DETAIL FICHE")
    connexion.query(`SELECT * FROM fiches WHERE id=${req.body.id}` , (err, response) => {
        if(err) console.log(err)
        else {
            res.json(response[0])
        }
    })    
})

app.get('/selectIcon', (req,res) => {
    console.log("SELECT ICON")
    connexion.query(`SELECT * FROM icon`, (err, response) => {
        if(err) res.json("error")
        else {
            console.log(response)
            res.json(response)
        }
    }) 
})

app.post('/addGroupe', (req,res) => {
    console.log(req.body,'SERVER INSERT GROUPE')
    connexion.query(`INSERT INTO groupe (nom , nomNl, icon, id_categorie) VALUES ('${req.body.nom}', '${req.body.nomNl}', '${req.body.icon}', '0')`, (err, response) => {
        if(err) res.json("error")
        else {
            connexion.query(`SELECT * FROM groupe` , (err, response1) => {
                if(err) console.log(err)
                else {
                    res.json(response1)
                }
            })
        }
    }) 
})

app.post('/addSousGroupe', (req,res) => {
    console.log(req.body,'SERVER INSERT SOUS GROUPE')
    connexion.query(`INSERT INTO groupe (nom , nomNl , icon, id_categorie , zIndex) VALUES ('${req.body.nom}', '${req.body.nomNl}', '${req.body.icon}', '${req.body.id}', '1')`, (err, response) => {
        if(err) res.json("error")
        else {
            connexion.query(`SELECT * FROM groupe` , (err, response1) => {
                if(err) console.log(err)
                else {
                    res.json(response1)
                }
            })
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

app.post('/verifyChild', (req,res) => {
    console.log(req.body," SERVEUR VERIFY CHILD")
    connexion.query(`SELECT * FROM idFiche WHERE idFiche=${req.body.id}` , (err, response) => {
        if(err) console.log(err)
        else {
            if(response.length !== 0){
                console.log(999,1)
                const array = []
                for(let i = 0; i < response.length; i++ ){
                    connexion.query(`SELECT * FROM fiches WHERE id=${response[i].id}` , (err, response1) => {
                        if(err) console.log(err)
                        else {                            
                            array.push(response1[0])
                            if(i == response.length-1 ) {
                                // console.log(array, 2)
                                res.json(array)
                            } 
                        }
                    })
                }
            } else {
                res.json(response)
            }
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
    console.log(req.body.idGroupe," SERVEUR SELECT SOUS GROUPE")
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

app.put('/refreshFiches', (req,res) => {
    console.log(req.body," SERVEUR UPDATE FICHE")
    connexion.query(`UPDATE fiches SET ${req.body.champs}="${req.body.value}" WHERE id="${req.body.id}"`, (err, response) => {
        console.log(response,1)
        if(err) res.json("error")
        else {
            connexion.query(`SELECT * FROM fiches WHERE id="${req.body.id}"` , (err, response1) => {
                if(err) console.log(err)
                else {
                    // console.log(response1[0], 2)
                    res.json(response1[0])
                }
            }) 
            // console.log(response, 3)
            res.json(response)
        }
    }) 
})

app.put('/updateFiche', (req,res) => {
    console.log(req.body," SERVEUR UPDATE FICHE")
    connexion.query(`UPDATE fiches SET ${req.body.champs}="${req.body.value}" WHERE id=${req.body.id}`, (err, response) => {
        if(err) res.json("error")
        else {
            res.json(response)
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
    // console.log(66)
    connexion.query(`UPDATE colonne SET nom ='${req.body.nom}', nomNl = '${req.body.nomNl}' WHERE id = '${req.body.id}'`, (err, response) => {
        if(err) res.json("error")
        else {
            res.json(response)
        }
    }) 
})

app.post('/champs/add', (req,res) => {
    // console.log(66)
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
    // console.log(66)
    connexion.query(`INSERT INTO pages (nom, nomNl) VALUES ('${req.body.fr}', '${req.body.nl}')`, (err, response) => {
        if(err) res.json("error")
        else {
            
                console.log(44, 'ERREUR ICI')
                connexion.query(`SELECT LAST_INSERT_ID() FROM pages WHERE id=LAST_INSERT_ID()`, (err, r) => {
                    if(err) console.log(err)
                    else {
                        // console.log(r, 777)
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
            console.log(response)
            res.json(response)
        }
    }) 
})

app.post('/post', (req,res) => {
    connexion.query(`SELECT * FROM post WHERE id_pages='${req.body.id}'`, (err, response) => {
        if(err) console.log(err)
        else {
            connexion.query(`SELECT * FROM page_groupe WHERE id_page='${req.body.id}'`, (err, r) => {
                if(err) console.log(err)
                else {
                    const array = []
                    for(let i=0;i<r.length;i++){
                        
                    connexion.query(`SELECT * FROM groupe WHERE id ='${r[i].id_groupe}'`, (err, resp) => {
                        if(err) console.log(err)
                        else {
                            array.push(resp[0])
                            if(i === r.length - 1) {
                            res.json({posts:response,groupes:array})
                            }
                        }
                    }) 
                }
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

app.get('/post/get', (req,res) => {
    connexion.query(`SELECT * FROM post`, (err, response) => {
        if(err) console.log(err)
        else {
            res.json(response)
        }
    }) 
})

app.post('/post/insert', (req,res) => {
    // console.log(66)
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
    // console.log(66)
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

app.post('/groupe/update', (req,res) => {
    // console.log(66)
    connexion.query(`INSERT INTO page_groupe (id_page, id_groupe) VALUES ('${req.body.id}', '${req.body.groupe}')`, (err, response) => {
        if(err) console.log(err)
        else {
            connexion.query(`SELECT * FROM page_groupe WHERE id_page='${req.body.id}'`, (err, resp) => {
                if(err) console.log(err)
                else {
                    // console.log(resp, 7)
                    const array = []
                    for(let i = 0; i < resp.length; i++){
                        connexion.query(`SELECT * FROM groupe WHERE id='${resp[i].id_groupe}'`, (err, result) => {
                            if(err) console.log(err)
                            else {
                                // console.log(result, 8)
                                array.push(result[0])
                                if(i===resp.length-1) res.json(array)
                                }
                        }) 
                    }
                }
            }) 
        }
    }) 
})

app.post('/groupe/page', (req, res) => {
    console.log('yes', req.body.id)
    connexion.query(`SELECT * FROM page_groupe WHERE id_page='${req.body.id}'`, (err, resp) => {
        if(err) console.log(err)
        else {
            // console.log(resp, 7)
            const array = []
            for(let i = 0; i < resp.length; i++){
                connexion.query(`SELECT * FROM groupe WHERE id='${resp[i].id_groupe}'`, (err, result) => {
                    if(err) console.log(err)
                    else {
                        // console.log(result, 8)
                        array.push(result[0])
                        if(i===resp.length-1) res.json(array)
                        }
                }) 
            }
            if(resp.length === 0) res.json([])
        }
    }) 
})

app.delete('/groupe/delete', (req,res) => {
    console.log(66)
    connexion.query(`DELETE FROM page_groupe WHERE id_page='${req.body.id}' AND id_groupe='${req.body.groupe}'`, (err, response) => {
        if(err) console.log(err)
        else {
            connexion.query(`SELECT * FROM page_groupe WHERE id_page='${req.body.id}'`, (err, resp) => {
                if(err) console.log(err)
                else {
                    // console.log(resp, 7)
                    const array = []
                    for(let i = 0; i < resp.length; i++){
                        connexion.query(`SELECT * FROM groupe WHERE id='${resp[i].id_groupe}'`, (err, result) => {
                            if(err) console.log(err)
                            else {
                                // console.log(result, 8)
                                array.push(result[0])
                                if(i===resp.length-1) res.json(array)
                                }    
                        }) 
                    }
                    if(resp.length === 0) res.json([])
                }
            }) 
        }
    }) 
})

app.delete('/post/delete', (req, res) => {
    connexion.query(`DELETE FROM post WHERE id='${req.body.idPost}'`, (err, response) => {
        if(err) console.log(err)
        else {
            connexion.query(`SELECT * FROM post`, (err, result) => {
                if(err) console.log(err)
                else {
                    res.json(result)
                }
            }) 
        }
    })
})

app.put('/image/update', (req,res) => {
    connexion.query(`UPDATE post SET image="${req.body.image}" WHERE id=${req.body.post}`, (err, response) => {
        if(err) console.log(err)
        else {
            connexion.query(`SELECT * FROM post`, (err, result) => {
                if(err) console.log(err)
                else {
                    res.json(result)
                }
            }) 
        }
    }) 
})

app.put('/input/update', (req,res) => {
    const array=['titre','titreNL','url', 'image','descriptio','descriptioNL']
    connexion.query(`UPDATE post SET ${array[req.body.i]}="${req.body.content}" WHERE id=${req.body.post}`, (err, response) => {
        if(err) console.log(err)
        else {
            
            connexion.query(`SELECT * FROM post`, (err, result) => {
                if(err) console.log(err)
                else {
                    
                    res.json(result)
                }
            }) 
        }
    }) 
})

app.get('/fiches', (req,res) => {
    connexion.query(`SELECT id, Nom FROM fiches`, (err, response) => {
        if(err) console.log(err)
        else {
            res.json(response)
        }
    }) 
})

app.post('/idGroupe', (req,res) => {
    connexion.query(`SELECT idFiche FROM idFiche WHERE id=${req.body.id}`, (err, response) => {
        if(err) console.log(err)
        else {
            res.json(response)
        }
    }) 
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

