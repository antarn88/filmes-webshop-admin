/* eslint-disable no-console */
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('Vizsgaremek backend server');
});

app.listen(port, () => {
  console.log(`Backend server listening at: http://localhost:${port}`);
});
