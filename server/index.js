'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(
    '*/public',
    express.static(path.resolve(__dirname, '..', 'public'), {
      maxAge: '60000', // uses milliseconds per docs
      lastModified: true,
    }),
);
app.use(
    '*/images',
    express.static(path.resolve(__dirname, 'images'), {
      maxAge: '60000', // uses milliseconds per docs
      lastModified: true,
    }),
);

app.use(
    '/uploads',
    express.static(path.resolve(__dirname, '..', '..', '..', 'Backend', '2024_1_IMAO', 'uploads'), {
      maxAge: '60000', // uses milliseconds per docs
      lastModified: true,
    }),
);

const port = process.env.PORT || 80;

app.get(/^\/(?!.*\.(js|ttf)$).*$/, function(request, response) {
  response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  response.set('Cache-Control', 'public, max-age=60000');
});

app.get('*/sw.js', function(request, response) {
  response.sendFile(path.resolve(__dirname, '..', 'public', 'sw.js'));
  response.set('Cache-Control', 'public, max-age=60000');
});

app.get(/.*\.ttf$/, function(request, response) {
  response.sendFile(path.resolve(__dirname, '..', 'public', 'da1919d9724581171c80.ttf'));
  response.set('Cache-Control', 'public, max-age=60000');
});

app.get('/test/:num/', function(req, res) {
  res.send(req.params.num);
});

app.listen(port, function() {
  console.log(`Server listening port ${port}`);
});
