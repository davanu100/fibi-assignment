const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type','Authorization');
    next();
});

app.use(routes);


mongoose
.connect('mongodb+srv://thakur_anurag:fibi-assignment@cluster0-64ovz.mongodb.net/<dbname>')
.then(result => {
    app.listen(8080);
    console.log("-->Connected!!");
})
.catch(err => {
    console.log(err);
})