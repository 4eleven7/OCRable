var express = require('express');
var bodyParser = require('body-parser');
var tesseract = require('tesseract.js')

var app = express();
app.use(bodyParser.json({ type: 'application/json' }));

var router = express.Router();
router.post('/', function(req, res)
{
	console.log("Working on an image!");
	
	var image = req.body.image;
	
	tesseract.recognize(image)
			 .then(function(result){
			 	res.statusCode = 200;
		        return res.json({ text : result.text });
			 })
});

app.use('/read', router);

module.exports = app;
