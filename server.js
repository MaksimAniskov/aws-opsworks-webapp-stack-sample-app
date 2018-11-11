const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const http = require('http');

app.get('/', (req, res) => {
  http.get('http://169.254.169.254/latest/meta-data/instance-id', resp => {
    let data = '';

    resp.on('data', chunk => {
      data += chunk;
    });

    resp.on('end', () => {
      res.send(`Hello World! My EC2 instance id is ${data}`);
    })
  })
  .on('error', err => {
    console.error(err.message);
    res.send(`Hello World! But I don't know my EC2 instance id because of ${err.message}`);
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});