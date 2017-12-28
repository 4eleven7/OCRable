#!/usr/bin/env node

var app = require('./index');

app.set('port', process.env.PORT || 3001);

var server = app.listen(app.get('port'), function()
{
  var host = server.address().address;
  var port = server.address().port;

  console.log('OCRable app listening at http://%s:%s', host, port);
});
