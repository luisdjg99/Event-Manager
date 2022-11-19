const bodyParser = require('body-parser');
var express = require('express');
var routes = require('./routes/routes.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var port = 3000;

app.listen(port, () => console.log(`Running on ${port}`));