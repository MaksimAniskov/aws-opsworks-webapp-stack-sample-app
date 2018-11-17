const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const http = require('http');

const SLOWPOKE_TIME_INTERVAL_MSEC = 5000;

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

app.get('/slowpoke', (req, res) => {
  const t1  = (new Date()).getTime();
  while ((new Date()).getTime() - t1 < SLOWPOKE_TIME_INTERVAL_MSEC) {
  }
  res.send(`Just has been burning CPU for ${SLOWPOKE_TIME_INTERVAL_MSEC}msec`);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});