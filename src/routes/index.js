const express = require('express');
const lessonsRouter = require('./lessonsRouter');

const router = express.Router();

router.use('/lessons', lessonsRouter);

module.exports = router;