const express = require('express');

const app = new express();

app.get('/', function(req, res) {
  res.sendFile('index.html', { root: './public' });
});

app.get('/sw.js', function(req, res) {
  res.sendFile('sw.js', { root: './public' });
});

app.get('/images/twilio.png', function(req, res) {
  setTimeout(function() {
    res.sendFile('twilio.png', { root: './public/images' });
  }, 10000);
});

app.listen(3000, function() {
  console.log('Application started');
});
