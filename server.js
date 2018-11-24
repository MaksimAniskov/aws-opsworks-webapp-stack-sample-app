const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const http = require('http');

const SLOWPOKE_TIME_INTERVAL_MSEC = 500;

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
  slowpoke(SLOWPOKE_TIME_INTERVAL_MSEC, res);
});

app.get('/slowpoke/:interval_msec', (req, res) => {
  slowpoke(parseInt(req.params['interval_msec']), res);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

function slowpoke(interval_msec, res) {
  const t1  = (new Date()).getTime();
  while ((new Date()).getTime() - t1 < interval_msec) {
  }
  res.send(`Just has been burning CPU for ${interval_msec}msec`);
}