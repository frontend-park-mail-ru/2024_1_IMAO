'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use('*/public', express.static(path.resolve(__dirname, '..', 'public'), {
  maxAge: '60000', // uses milliseconds per docs
}));
app.use('*/images', express.static(path.resolve(__dirname, 'images'), {
  maxAge: '60000', // uses milliseconds per docs
}));

const port = process.env.PORT || 8008;

app.get(/^\/(?!.*\.(js|ttf)$).*$/, function(request, response) {
  response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  response.set('Cache-Control', 'public, max-age=60000');
});

app.get('*/sw.js', function(request, response) {
  response.sendFile(path.resolve(__dirname, '..', 'public', 'sw.js'));
  response.set('Cache-Control', 'public, max-age=60000');
});

app.get('*/fa3a05a92cf678856b1f.ttf', function(request, response) {
  response.sendFile(path.resolve(__dirname, '..', 'public', 'fa3a05a92cf678856b1f.ttf'));
  response.set('Cache-Control', 'public, max-age=60000');
});

app.listen(port, function() {
  console.log(`Server listening port ${port}`);
});
