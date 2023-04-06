const express = require('express');
const dotenv = require('dotenv');
const lessonsRouter = require('./routes/lessonsRouter');

dotenv.config();

const app = express();

app.use( express.json() );

app.use('/', lessonsRouter);

app.use( (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('A server error has occurred!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('LessonsApp online!');
});