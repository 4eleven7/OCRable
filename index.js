var express = require('express');
var bodyParser = require('body-parser');
var tesseract = require('tesseract.js')
var fs = require('fs');
var request = require('request');

var app = express();
app.use(bodyParser.json({ type: 'application/json' }));

var router = express.Router();
router.post('/', function(req, res)
{
	console.log("Working on an image!");
	
	var image = req.body.image;
	
	var path = 'temp.jpg';
	
	download(image, path, function()
	{
		tesseract.recognize(path)
				.then(function(result)
				{
					res.statusCode = 200;
					return res.json({ text : result.text });
				});
	});
});

app.use('/read', router);

module.exports = app;

var download = function(uri, filename, callback)
{
	request.head(uri, function(err, res, body)
	{
		console.log('content-type:', res.headers['content-type']);
		console.log('content-length:', res.headers['content-length']);
		
		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};
