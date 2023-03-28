const express = require('express');
const lessonsRouter = require('./routes/lessonsRouter');

const app = express();

app.use( express.json() );

app.use('/', lessonsRouter);

app.use( (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('A server error has occurred!');
});

app.listen(3000, () => {
  console.log('LessonsApp online!');
});