const express = require('express');
const LessonsController = require('../controllers/lessonsController');
const jwt = require('../utils/jwt');

const router = express.Router();

router.get('/', LessonsController.lessonsAll);
router.get('/:id', LessonsController.lessonById);

router.use( (req, res, next) =>{
  jwt.verifyToken(req, res, next);
});

router.post('/', LessonsController.createLesson);

router.put('/:id', LessonsController.updateLesson);

router.delete('/:id', LessonsController.removeLesson);

module.exports = router;