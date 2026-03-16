const { networkInterfaces } = require('os');
var message = 'CSC-317 node/express app \n'
         + 'This uses nodeJS, express, and express.static\n'
         + 'to \"serve\" the files in the ./public/ dir!\n';

var express = require('express');
var app = express();
var port = 3001;

var path = require('path');
var StaticDirectory = path.join(__dirname, 'public');
app.use(express.static(StaticDirectory));

app.listen(port, () => {
    console.log(`Listening on http://127.0.0.1:${port}/`);
});

console.log(message);