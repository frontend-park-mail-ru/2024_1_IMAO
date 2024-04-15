'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'sw.js'), {
  maxAge: '31557600', // uses milliseconds per docs
}));
app.use('*/public', express.static(path.resolve(__dirname, '..', 'public'), {
  maxAge: '31557600', // uses milliseconds per docs
}));
app.use('*/images', express.static(path.resolve(__dirname, 'images'), {
  maxAge: '31557600', // uses milliseconds per docs
}));

const port = process.env.PORT || 8008;

app.get(/^\/(?!.*\.js$).*$/, function(request, response) {
  response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  response.set('Cache-Control', 'public, max-age=31557600');
});

app.get('/sw.js', function(request, response) {
  response.sendFile(path.resolve(__dirname, '..', 'public', 'sw.js'));
  response.set('Cache-Control', 'public, max-age=31557600');
});


app.get('/test/:num/', function(req, res) {
  res.send(req.params.num);
});

app.listen(port, function() {
  console.log(`Server listening port ${port}`);
});
