const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());

const StaticDirectory = path.join(__dirname, 'public');
app.use(express.static(StaticDirectory));

const userRoutes = require('./routes/users');
app.use('/', userRoutes);

const contactRoutes = require('./routes/contact');
app.use('/', contactRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server error');
});

app.listen(port, () => {
  console.log(`Listening on http://127.0.0.1:${port}/`);
});