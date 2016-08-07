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

var sendMessage = function sendMessage(to, msg, res){
	console.log(to, numbers, numbers[to]);
	twilio.sendMessage(
		{
			to: numbers[to.toLowerCase()],
			from: auth.fromPhone,
			body: msg
		},
		function(err){
			console.log("sent text", err);
			err ? res.status(500).send("I'm sorry, but something went wrong") : res.send({
				response: {
					outputSpeech: {
						type: "PlainText",
						text: "Message has been sent"
					}
				}
			});
		}
	);
}

app.use(function(req, res){
	console.log(req.body);
	
	switch(req.body.request.intent.name){
		case "SayHelloIntent":
			sendMessage(req.body.request.intent.slots.textTo.value, "Hi there " + req.body.request.intent.slots.textTo.value + "!", res);
			break;
		case "SendMessageIntent":
			sendMessage(req.body.request.intent.slots.textTo.value, req.body.request.intent.slots.msg.value, res);
			break;
		default:
			res.status(500).send("I don't recognize which intent you're trying to trigger");
	}
	
});

app.listen(9000);