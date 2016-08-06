var express = require('express');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(function(req, res){
	console.log(req.body);
	res.status(200).end();
});

app.listen(9000);