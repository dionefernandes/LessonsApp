const express = require('express');
const lessonsRouter = require('./routes/lessonsRouter');

const app = express();

// Middleware to process the request body
app.use( express.json() );

// Root route
app.use('/', lessonsRouter);

// Handles errors
app.use( (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('A server error has occurred!');
});

// Initialize the server
app.listen(3000, () => {
  console.log('LessonsApp online!');
});