var express = require('express');
var bodyparser = require('body-parser');
var app = express();

//Twilio requires keys, which I hid in auth.json, which won't be included in the git repos for obv reasons
var auth = require('credentials.json');
var twilio = require('twilio')(auth.accountSID, auth.authToken);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(function(req, res){
	console.log(req.body);
	res.status(200).end();
});

app.listen(9000);