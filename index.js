const express = require('express');

const Database = require('easy-json-database')

const bodyParser = require("body-parser");

const db = new Database("./db.json", {
    snapshots: {
        enabled: true,
        interval: 24 * 60 * 60 * 1000,
        folder: './backups/'
    }
});


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

app.get('/listen', (req, res) => {
  res.send(db.get("executed"))
});

app.post('/executeapi',function(req, res){
  db.set("executed", req.body.executedstring)
  res.end("executed")
});

app.listen(3000, () => {
  console.log('server started');
});

app.get('/connect', (req, res) => {
  res.sendFile(__dirname + "/connect.lua")
});