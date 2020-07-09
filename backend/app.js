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
    connexion.query('SELECT * FROM groupetable', (err, response) => {
        if(err) res.json("error")
        else {
            res.json(response)
        }
    })
})

app.get('/sous-groupe', (req,res) => {
    connexion.query('SELECT * FROM soustable', (err, response) => {
        if(err) res.json("error")
        else {
            console.log(5)
            res.json(response)
        }
    }) 
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

