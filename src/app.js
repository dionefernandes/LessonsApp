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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('LessonsApp online!');
});