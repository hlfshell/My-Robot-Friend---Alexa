var express = require('express');
var bodyparser = require('body-parser');
var app = express();

//Twilio requires keys, which I hid in auth.json, which won't be included in the git repos for obv reasons
var auth = require('./auth.json');
var twilio = require('twilio')(auth.accountSID, auth.authToken);

//JSON file contacts = JS object, keys are names matching to textTo, values are resulting #s
var numbers = require('./numbers.json');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(function(req, res){
	console.log(req.body);
	twilio.sendMessage(
		{
			to: numbers[req.body.intent.slots.textTo.value.toLowerCase()],
			from: auth.fromPhone,
			body: "Hi there " + req.body.request.intent.slots.textTo.value + "!"
		},
		function(err){
			err ? res.status(500).send("I'm sorry, but something went wrong") : res.send({
				response: {
					outputSpeech: {
						type: "PlainText",
						text: "Hello has been sent"
					}
				}
			});
		}
	);
});

app.listen(9000);