const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;
const cors = require('cors');
const connexion = require('./conf.js');
require('dotenv').config();
const nodemailer = require('nodemailer');


app.use(cors({
    origin: '*'
}))

app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}))

app.post('/contact', (req,res) => {
    console.log(req.body, "SEND MSG")
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'webmaster.bruxelles@gmail.com',
          pass: 'eztqkxkntxbvinbk'
        }
      });      
      var mailOptions = {
        from: 'webmaster.bruxelles@gmail.com',
        to: 'webmaster.bruxelles@gmail.com',
        subject: req.body.subject,
        text: 'Nom: '+req.body.lastName+' Prenom: '+req.body.firstName+'  \n\nEmail:\n\n'+req.body.email+' \n\nMessage: \n\n '+req.body.message,
      };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.json(false)
        } else {
            res.json(true)
            console.log('Email sent: ' + info.response);
        }
      });      
}) 


app.post('/searchFiches', (req,res) => {
    // console.log(req.body," SERVEUR SEARCH FICHES")    
    connexion.query(`SELECT * FROM fiches WHERE CONCAT(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29) LIKE '%` + req.body.value + `%'`, (err, response1) => {
        if(err) console.log(err)
        else { 
            // console.log(response1) 
            res.json(response1)                    
        }
    })
})

setInterval(function () {
    connexion.query('SELECT 1');
}, 5000);

app.post('/intro', (req,res) => {
    // console.log(req.body," SERVEUR SELECT GROUPE")    
    connexion.query(`SELECT * FROM groupe WHERE zIndex="0"` , (err, response) => {
        if(err) console.log(err)
        else {
            // console.log(response)
            res.json(response)
        }
    })
})

app.get('/addVisit', (req,res) => {
    console.log(" ADD VISITEUR")   
    min =  Math.ceil(1000000000000000000000);
    max = Math.floor(9000000000000000000000);
    const sess = Math.floor(Math.random() * (max - min)) + min;
    // console.log(sess)
    connexion.query(`INSERT INTO sess (idSession) VALUES (${sess}) `)    
})

app.post('/getProfil', (req,res) => {
    // console.log(req.body," SERVEUR SELECT PROFIL")   
    const today = new Date();
    const arrayMonth = [];
    const arrayDay = [];
    var month = 0;
    var day = 0;
    const data = []
     connexion.query(`SELECT * FROM sess` , (err, response) => {
        if(err) console.log(err)
        else {
            // console.log("date actuel: ",today)
            // console.log("date DB: ",response[11710].createdAt)
            // console.log("Mois: ",today.getMonth())
            // console.log("Mois DB", response[11710].createdAt.getMonth())
            // MOIS 0-11
            // console.log("week: ",today.)
            // console.log("week DB", response[11710].createdAt.getDate())
            // JOUR 0-6
            // console.log("Day: ",today.getDate())
            // console.log("Day DB", response[11710].createdAt.getDate())
            // HEURE 0-23
            for(let i = 0; i < response.length ; i++){
                if(today.getMonth() == response[i].createdAt.getMonth()) {
                    arrayMonth.push(response[i].createdAt)
                }                                
            }

            month = arrayMonth[0].getMonth()
            // console.log("DB MOIS: ", month," NBR :" ,arrayMonth.length) 
            // console.log('TAB MOIS: ', arrayMonth) 

            for(let i = 0; i < arrayMonth.length ; i++){
                // console.log(arrayMonth[i].getDate())
                if(today.getDate() == arrayMonth[i].getDate()) {
                    arrayDay.push(arrayMonth[i])
                }                                
            }

            day = arrayDay[0].getDate()
            // console.log("DB JOUR: ", day," NBR :" ,arrayDay.length) 
            
            connexion.query(`SELECT * FROM panel` , (err, r) => {
                if(err) console.log(err)
                else {
                    data.push(arrayDay.length, arrayMonth.length , r[0])
                    // console.log(data)
                    res.json(data)
                }
            })
        }
    }) 
    
})

app.put('/updateProfil', (req,res) => {
    // console.log(req.body," SERVEUR UPDATE PROFIL")
    connexion.query(`UPDATE panel SET user="${req.body.user}", pass="${req.body.pass}" WHERE id=1`, (err, response) => {
        if(err) res.json("error")
        else {
            connexion.query(`SELECT * FROM panel` , (err, response) => {
                if(err) console.log(err)
                else {
                    // console.log(response[0])
                    res.json(response[0])
                }
            })
        }
    }) 
})

app.post('/selectFiche', (req,res) => {
    // console.log(req.body," SERVEUR SELECT DETAIL FICHE")
    connexion.query(`SELECT * FROM fiches WHERE id=${req.body.id}` , (err, response) => {
        if(err) console.log(err)
        else {       
            console.log(response[0])     
            res.json(response[0])                
        }
    })    
})

app.get('/selectIcon', (req,res) => {
    // console.log("SELECT ICON")
    connexion.query(`SELECT * FROM icon`, (err, response) => {
        if(err) res.json("error")
        else {
            // console.log(response)
            res.json(response)
        }
    }) 
})

app.post('/addGroupe', (req,res) => {
    // console.log(req.body,'SERVER INSERT GROUPE')
    connexion.query(`INSERT INTO groupe (nom , nomNl, icon, id_categorie, descriptionGroupeFr, descriptionGroupeNl) VALUES ('${req.body.nom}', '${req.body.nomNl}', '${req.body.icon}', '0' , '${req.body.descFr}' , '${req.body.descNl}')`, (err, response) => {
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
    // console.log(req.body,'SERVER INSERT SOUS GROUPE')
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
    // console.log(req.body," SERVEUR SELECT GROUPE")
    connexion.query(`SELECT * FROM groupe` , (err, response) => {
        if(err) console.log(err)
        else {
            res.json(response)
        }
    })
})

app.get('/selectDescGroupe', (req,res) => {
    // console.log(req.body," SERVEUR SELECT GROUPE")
    connexion.query(`SELECT * FROM groupe WHERE id='${req.body.id}'` , (err, response) => {
        if(err) console.log(err)
        else {
            res.json(response)
        }
    })
})

app.post('/selectDescGroupe', (req,res) => {
    // console.log(req.body," SERVEUR SELECT GROUPE")
    if(req.body.id !== 0 ){
        connexion.query(`SELECT * FROM groupe WHERE id='${req.body.id}'` , (err, response) => {
            if(err) console.log(err)
            else {
                // console.log(response)
                res.json(response)
            }
        })
    } else {
        console.log('accueil')
    }
})

app.post('/updateDescGroupe', (req,res) => {
    console.log(req.body," SERVEUR UPDATE DESC GROUPE")
    connexion.query(`UPDATE groupe SET descriptionGroupeFr="${req.body.descFr}", descriptionGroupeNl="${req.body.descNl}"  WHERE id=${req.body.id} ` , (err, respons) => {
        if(err) console.log(err)
        else {
            connexion.query(`SELECT * FROM groupe WHERE id='${req.body.id}'` , (err, response) => {
                if(err) console.log(err)
                else{
                    // console.log(response)
                    res.json(response)
                }
            })
        }
    })
})

app.post('/verifyChild', (req,res) => {
    // console.log(req.body," SERVEUR VERIFY CHILD")
    connexion.query(`SELECT * FROM idFiche WHERE idGroupe= '${req.body.id}'` , (err, response) => {
        if(err) console.log(err)
        else {
            if(response.length !== 0){
                // console.log(response ,999)
                const resp = []                
                const info = "fiche"
                for(let i = 0; i < response.length; i++ ){
                    // console.log(i, response.length-1, "boucle for")
                    connexion.query(`SELECT * FROM fiches WHERE id=${response[i].idFiche}` , (err, response1) => {
                        if(err) console.log(err)
                        else {                            
                            if(response1[0] !== null && response1[0] !== undefined ) {
                                // console.log("ahechoune", response1[0])
                                resp.push(response1[0])
                            }                            
                            if(i >= response.length-1 ) {
                                const obj = {info, resp}                                
                                res.json(obj)
                            }
                        }
                    })
                }
            } else {
                // console.log("verify groupe")
                connexion.query(`SELECT * FROM groupe WHERE id_categorie = '${req.body.id}'`, (err, resp) => {
                    if(err) res.json("error")
                    else {
                        if(resp.length === 0){
                            const info = "none"
                            const obj = {info, resp}
                            res.json(obj)  
                        } else {
                            const info = "groupe"
                            const obj = {info, resp}
                            res.json(obj)  
                        }
                    }                    
                })
            }
        }
    })
})

app.post('/path', (req,res) => {
    // console.log(req.body," SERVEUR SELECT GROUPE")
    connexion.query(`SELECT * FROM groupe WHERE id = ${req.body.id}` , (err, response) => {
        if(err) console.log(err)
        else {
            res.json(response)
        }
    })
})

app.post('/selectSousGroupe', (req,res) => {
    // console.log(req.body.id," SERVEUR SELECT SOUS GROUPE")
    const array = []
     
})

app.post('/sous-groupe', (req,res) => {
    // console.log(req.body.idGroupe.groupe," SERVEUR SELECT SOUS GROUPE")
    const array = []
    connexion.query(`SELECT * FROM groupe WHERE id_categorie="${req.body.idGroupe.groupe}"`, (err, response) => {
        if(err) res.json("error")
        else {
            // console.log(req.body.idGroupe.groupe, 8888888)
            if(response.length === 0){
                connexion.query(`SELECT * FROM idFiche WHERE idGroupe="${req.body.idGroupe.groupe}"`, (err, response1) => {
                    if(err) res.json("error")
                    else { 
                        // console.log("ici", response1, 444)
                        for(let i = 0; i < response1.length ; i++ ){
                            connexion.query(`SELECT * FROM fiches WHERE id="${response1[i].idFiche}"`, (err, response2) => {
                                if(err) res.json("error")
                                else {    
                                    // console.log(response2)   
                                    if(response2[0] !== undefined && response2[0] !== null) {
                                        array.push(response2[0])
                                    }
                                    
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

app.post('/delFiche', (req,res) => {
    console.log(req.body, " SERVEUR DELETE FICHE")
    connexion.query(`DELETE FROM fiches WHERE id="${req.body.id}"`, (err, response0) => {
        if(err) res.json("error")
        else {
            connexion.query(`DELETE FROM idFiche WHERE idFiche="${req.body.id}" AND idGroupe= "${req.body.idGroupe}"`, (err, response1) => {
                if(err) res.json("error")
                else {
                    connexion.query(`SELECT * FROM idFiche WHERE idGroupe= "${req.body.idGroupe}"` , (err, response2) => {
                        if(err) console.log(err)
                        else {                   
                            // console.log("la", response2) 
                            const arrayFiche = []                               
                            for(let i = 0; i < response2.length ; i++){
                                // console.log(response2[i].id, "ici")
                                connexion.query(`SELECT * FROM fiches WHERE id = '${response2[i].idFiche}' `, (err, response7) => {
                                    if(err) res.json("error")
                                    else {
                                        if(response7[0] !== undefined && response7[0] !== null) {
                                            arrayFiche.push(response7[0])
                                        }
                                        
                                        if( i >= response2.length-1 ) {
                                            // console.log(arrayFiche, "GOOL")
                                            res.json(arrayFiche)
                                        }
                                    }
                                })
                            }  
                        }
                    })
                }
            })
        }
    }) 
})

app.post('/delGroupe', (req,res) => {
    // console.log(req.body.id," SERVEUR DELETE GROUPE")
    connexion.query(`DELETE FROM groupe WHERE id="${req.body.id}"`, (err, response0) => {
        if(err) res.json("error")
        else {
            connexion.query(`SELECT * FROM groupe ` , (err, response2) => {
                if(err) console.log(err)
                else {
                    res.json(response2)
                }
            })
        }
    }) 
})

app.post('/moveFiche', (req,res) => {
    console.log(req.body," SERVEUR UPDATE FICHE/GROUPE")
    connexion.query(`SELECT * FROM groupe WHERE id_categorie=${req.body.idGroupe}`, (err, respo) => {
        if(err) res.json("error")
        else {
            // console.log(respo)
            if(respo.length === 0 ){
                connexion.query(`SELECT * FROM groupe WHERE id_categorie=${req.body.idGroupe}` , (err, response) => {
                    if(err) console.log(err)
                    else {
                        if(response.length > 0){
                            res.json(false)
                        } else {
                            connexion.query(`UPDATE idFiche SET idGroupe="${req.body.idGroupe}" WHERE idFiche=${req.body.idFiche} `, (err, response1) => {
                                if(err) res.json("error")
                                else {
                                    connexion.query(`SELECT 1`, (err, response2) => {
                                        if(err) res.json("error")
                                        else {
                                            res.json(response2)
                                        }
                                    })
                                }
                            }) 
                        }
                    }
                })
            } else {
                res.json(false)
            }
        }
    })
    
    
})


app.put('/refreshFiches', (req,res) => {
    // console.log(req.body," SERVEUR UPDATE FICHE")
    connexion.query(`UPDATE fiches SET ${req.body.champs}="${req.body.value}" WHERE id=${req.body.id} `, (err, response) => {
        if(err) res.json("error")
        else {
            connexion.query(`SELECT * FROM idFiche WHERE idGroupe = ${req.body.idGroupe} `, (err, response6) => {
                if(err) res.json("error")
                else {
                    // console.log( "JUS DE FRUIT " ,response6)
                    const arrayFiche = []
                    for(let i = 0; i < response6.length ; i++){
                        console.log(response6[i].id, "ici")
                        connexion.query(`SELECT * FROM fiches WHERE id = '${response6[i].idFiche}' `, (err, response7) => {
                            if(err) res.json("error")
                            else {
                                if(response7[0] !== undefined && response7[0] !== null) {
                                    arrayFiche.push(response7[0])
                                }                              
                                // console.log("--------------- -",i ,response7,  "--------------- -")
                                if( i >= response6.length-1 ) {
                                    // console.log(response, i, "GOOL")
                                // console.log(arrayFiche, 7589)
                                res.json(arrayFiche)
                                }
                            }
                        })
                    }                                                               
                }
            }) 
        }
    }) 
})



app.put('/updateFiche', (req,res) => {
    // console.log(req.body," SERVEUR UPDATE FICHE")
    connexion.query(`UPDATE fiches SET ${req.body.champs}="${req.body.value}" WHERE id=${req.body.id}`, (err, response) => {
        if(err) res.json("error")
        else {
            res.json(response)
        }
    }) 
})


app.put('/updateGroupe', (req,res) => {
    // console.log(req.body.data," SERVEUR UPDATE GROUPE")
    if(req.body.data.icon !== "") {
        connexion.query(`UPDATE groupe SET nom="${req.body.data.nom}", nomNl="${req.body.data.nomNl}", icon="${req.body.data.icon}" WHERE id=${req.body.data.id}`, (err, response) => {
            if(err) res.json("error")
            else {
                // console.log('ok')
                connexion.query(`SELECT * FROM groupe` , (err, resp) => {
                    if(err) console.log(err)
                    else {
                        // console.log(response)
                        res.json(resp)
                    }
                })
            }
        })
    } else {
        connexion.query(`UPDATE groupe SET nom="${req.body.data.nom}", nomNl="${req.body.data.nomNl}" WHERE id=${req.body.data.id}`, (err, response) => {
            if(err) res.json("error")
            else {
                // console.log('not')
                connexion.query(`SELECT * FROM groupe` , (err, resp) => {
                    if(err) console.log(err)
                    else {
                        // console.log(response)
                        res.json(resp)
                    }
                })
            }
        })
    }
     
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
    // console.log('CONNECT ADMIN', req.body.user, req.body.mdp)
    connexion.query(`SELECT * FROM panel`, (err, response) => {
        if(err) res.json("error")
        else {
            if(response[0].user == req.body.user && response[0].pass == req.body.mdp) {
                res.json(true)
            } else {
                res.json(false)
            }
        }
    }) 
})

app.post('/moveGroupe', (req,res) => {
    // console.log('MOVE GROUPE', req.body)    
    connexion.query(`SELECT * FROM idFiche WHERE idGroupe = ${req.body.parent}` , (err, respo) => {
        if(err) console.log(err)
        else {
            // console.log(respo.lenght)
            if(respo.length === 0){
                connexion.query(`UPDATE groupe SET id_categorie = ${req.body.parent}, zIndex = ${req.body.parent}  WHERE id = ${req.body.enfant}`, (err, response1) => {
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
            } else {
                res.json(false)
            }
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
            // console.log(req.body.fr)
            connexion.query(`SELECT MAX(id) AS max_id FROM colonne`, (err, result) => {
                if(err) res.json("error")
                else {
                    // console.log(result[0].max_id)
                    var a = "a"+result[0].max_id
                    // console.log(a);
                     
                    // "ALTER TABLE customers ADD email VARCHAR(50) NOT NULL"
                    connexion.query(`ALTER TABLE fiches ADD ${a} VARCHAR(255) NOT NULL`, (err, response) => {
                        if(err) res.json("error")
                        else {
                            connexion.query(`SELECT * FROM colonne`, (err, result1) => {
                                if(err) res.json("error")
                                else {
                                    console.log(result1, 555)
                                    res.json(result1)
                                }
                            }) 
                        }
                    }) 
                }
            }) 
        }
    }) 
})


app.post('/addFiche', (req,res) => {
    // console.log("ADD FICHE" ,req.body)
    connexion.query(`SELECT MAX(id) AS max_id FROM idFiche`, (err, response1) => {    
    if(err) res.json("error") 
        else {     
            const maxId = response1[0].max_id+1
            connexion.query(`INSERT INTO idFiche (idGroupe, idFiche) VALUES ('${req.body.idGroupe}', '${maxId}')`)
            connexion.query(`INSERT INTO fiches (id,${req.body.champs[0]}) VALUES ('${maxId}','${req.body.value[0]}')`)
            for(let i = 1; i < req.body.champs.length ; i++){                                     
                connexion.query(`UPDATE fiches SET ${req.body.champs[i]} ='${req.body.value[i]}' WHERE id = '${maxId}'`)
                if( i >= req.body.champs.length-1 ) {
                    connexion.query(`SELECT * FROM idFiche WHERE idGroupe = '${req.body.idGroupe}' `, (err, response6) => {
                        if(err) res.json("error")
                        else {
                            const arrayFiche = []                            
                            for(let i = 0; i < response6.length ; i++){
                                // console.log("select fiche :",response6[i].idFiche)                                
                                connexion.query(`SELECT * FROM fiches WHERE id = '${response6[i].idFiche}' `, (err, response7) => {
                                    if(err) res.json("error")
                                    else {
                                        if(response7[0] !== undefined && response7[0] !== null) {
                                            arrayFiche.push(response7[0])
                                        }                                         
                                        if( i >= response6.length-1 ) {
                                            res.json(arrayFiche)
                                        }
                                    }
                                })
                            }                                                                
                        }
                    })
                }                                   
            }         
        }
    })
})


// app.post('/addFiche', (req,res) => {
//     // console.log("ADD FICHE" ,req.body)
//     connexion.query(`SELECT MAX(id) AS max_id FROM idFiche`, (err, response1) => {    
//     if(err) res.json("error") 
//         else {     
//             const maxId = response1[0].max_id+1
//             connexion.query(`INSERT INTO idFiche (idGroupe, idFiche) VALUES ('${req.body.idGroupe}', '${maxId}')`)
//             connexion.query(`INSERT INTO fiches (id,${req.body.champs[0]}) VALUES ('${maxId}','${req.body.value[0]}')`)
//             for(let i = 1; i < req.body.champs.length ; i++){                                     
//                 connexion.query(`UPDATE fiches SET ${req.body.champs[i]} ='${req.body.value[i]}' WHERE id = '${maxId}'`)
//                 if( i >= req.body.champs.length-1 ) {
//                     connexion.query(`SELECT * FROM idFiche WHERE idGroupe = '${req.body.idGroupe}' `, (err, response6) => {
//                         if(err) res.json("error")
//                         else {
//                             const arrayFiche = []                            
//                             for(let i = 0; i < response6.length ; i++){
//                                 // console.log("select fiche :",response6[i].idFiche)                                
//                                 connexion.query(`SELECT * FROM fiches WHERE id = '${response6[i].idFiche}' `, (err, response7) => {
//                                     if(err) res.json("error")
//                                     else {
//                                         if(response7[0] !== undefined && response7[0] !== null) {
//                                             arrayFiche.push(response7[0])
//                                         }                                    
//                                         if( i >= response6.length-1 ) {
//                                             res.json(arrayFiche)
//                                         }
//                                     }
//                                 })
//                             }                                                                
//                         }
//                     })
//                 }                                   
//             }         
//         }
//     })
// })

app.post('/pages/add', (req,res) => {
    console.log(66)
    connexion.query(`INSERT INTO pages (nom, nomNl) VALUES ('${req.body.fr}', '${req.body.nl}')`, (err, response) => {
        if(err) res.json("error")
        else {            
            connexion.query(`SELECT * FROM pages`, (err, result) => {
                if(err) res.json("error")
                else {
                    console.log(result)
                    res.json(result)
                }
            }) 
        }
    }) 
})


// app.post('/pages/add', (req,res) => {
//     console.log(66)
//     connexion.query(`INSERT INTO pages (nom, nomNl) VALUES ('${req.body.fr}', '${req.body.nl}')`, (err, response) => {
//         if(err) res.json("error")
//         else {            
//                 console.log(44, 'ERREUR ICI')
//                 connexion.query(`SELECT LAST_INSERT_ID() FROM pages WHERE id=LAST_INSERT_ID()`, (err, r) => {
//                     if(err) console.log(err)
//                     else {
//                         console.log(r, 777)
//                         for(let i=0;i<req.body.groupes.length;i++){
//                             connexion.query(`INSERT INTO page_groupe (id_page, id_groupe) VALUES ('${r[0]['LAST_INSERT_ID()']}', '${req.body.groupes[i].id}')`, (err, response) => {
//                                 if(err) console.log(err)
//                                 else {
//                                     if(i === req.body.groupes.length - 1) {
//                                         connexion.query(`SELECT * FROM pages`, (err, result) => {
//                                             if(err) res.json("error")
//                                             else {
//                                                 console.log(result)
//                                                 res.json(result)
//                                             }
//                                         }) 
//                                     }
//                                 }
//                             })
//                         }
//                     }
//                 }) 
//         }
//     }) 
// })

app.get('/pages', (req,res) => {
    connexion.query(`SELECT * FROM pages`, (err, response) => {
        if(err) console.log(err)
        else {
            // console.log(response)
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
                            if(resp[0] !== undefined && resp[0] !== null) {
                                array.push(resp[0])
                            }
                            
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

// app.post('/groupe/update', (req,res) => {
//     // console.log(66)
//     connexion.query(`INSERT INTO page_groupe (id_page, id_groupe) VALUES ('${req.body.id}', '${req.body.groupe}')`, (err, response) => {
//         if(err) console.log(err)
//         else {
//             connexion.query(`SELECT * FROM groupe WHERE id='${resp[i].id_groupe}'`, (err, result) => {
//                 if(err) console.log(err)
//                 else {
//                     res.json(array)
//                 }
//             })
//         }
//     }) 
// })

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
                                if(result[0] !== undefined && result[0] !== null) {
                                    array.push(result[0])
                                }
                                
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
    // console.log('yes', req.body.id)
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
                        if(result[0] !== undefined && result[0] !== null) {
                            array.push(result[0])
                        }
                        
                        if(i===resp.length-1) res.json(array)
                        }
                }) 
            }
            if(resp.length === 0) res.json([])
        }
    }) 
})


app.post('/copieFiche', (req, res) => {
    // console.log('COPIE FICHE', req.body)
    connexion.query(`INSERT INTO fiches (a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30) 
    SELECT a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30 FROM fiches WHERE id='${req.body.idFiche}'`)
    connexion.query(`SELECT MAX(id) AS max_id FROM fiches`, (err, response1) => {
        if(err) console.log(err)
        else{
            connexion.query(`INSERT INTO idFiche (idGroupe, idFiche) VALUES ('${req.body.idGroupe}', '${response1[0].max_id}')`, (err, resp) => {
                if(err) console.log(err)
                else {            
                    res.json(true)
                }
            }) 
        }
    })
    
})

app.delete('/groupe/delete', (req,res) => {
    // console.log(66)
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
                                if(result[0] !== undefined && result[0] !== null) {
                                    array.push(result[0])
                                }
                                
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

app.delete('/page/delete', (req, res) => {
    console.log(req.body, "DELETE PAGE")
    connexion.query(`DELETE FROM pages WHERE id='${req.body.id}'`, (err, response) => {
        if(err) console.log(err)
        else {
            connexion.query(`SELECT * FROM pages`, (err, result) => {
                if(err) console.log(err)
                else {
                    console.log(result)
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


// app.put('/input/update', (req,res) => {
//     const array=['titre','titreNL','url', 'image','descriptio','descriptioNL']
//     connexion.query(`UPDATE post SET ${array[req.body.i]}="${req.body.content}" WHERE id=${req.body.post}`, (err, response) => {
//         if(err) console.log(err)
//         else {            
//             connexion.query(`SELECT * FROM post`, (err, result) => {
//                 if(err) console.log(err)
//                 else {
                    
//                     res.json(result)
//                 }
//             }) 
//         }
//     }) 
// })

app.put('/input/update', (req,res) => {
    console.log(req.body, 'INPUT UPDATE')
    connexion.query(`UPDATE post SET titre="${req.body.titre}", titreNL="${req.body.titreNl}", url="${req.body.url}", descriptio="${req.body.descFr}", descriptioNL="${req.body.descNl}" WHERE id=${req.body.id}`, (err, response) => {
        if(err) console.log(err)
        else {            
            connexion.query(`SELECT * FROM post WHERE id=${req.body.id}`, (err, result) => {
                if(err) console.log(err)
                else {                    
                    res.json(result)
                }
            }) 
        }
    })     
})

app.get('/fiches', (req,res) => {
    connexion.query(`SELECT id, 1 FROM fiches`, (err, response) => {
        if(err) console.log(err)
        else {
            res.json(response)
        }
    }) 
})

app.post('/idGroupe', (req,res) => {
    connexion.query(`SELECT idGroupe FROM idFiche WHERE idFiche=${req.body.id}`, (err, response) => {
        if(err) console.log(err)
        else {
            res.json(response)
        }
    }) 
})

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`)
// })

app.listen(port, 'localhost', function() {
    console.log(`Listening on port ${port}`)
}).on('error', function(err){
    console.log('on error handler');
    console.log(err);
});