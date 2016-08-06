var express = require('express');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(function(req, res){
	console.log(req.body);
	
	var response = {
		response: {
			outputSpeech: {
				type: "PlainText",
				text: "A winner is you"
			}
		}
	};
	
	res.status(200).send(response);
});

app.listen(9000);