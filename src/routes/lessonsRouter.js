const express = require('express');
const LessonsController = require('../controllers/lessonsController');
const jwt = require('../utils/jwt');
const AuthenticationMiddleware = require('../middlewares/authenticateToken');

const router = express.Router();

router.use('/lessons', router);

router.post('/auth', LessonsController.authenticate.bind(LessonsController));

// router.use( (req, res, next) =>{
//   jwt.verify(req, res, next);
// });

router.get('/', AuthenticationMiddleware.authenticateToken.bind(AuthenticationMiddleware), LessonsController.lessonsAll.bind(LessonsController));
router.get('/:id', LessonsController.lessonById.bind(LessonsController));


router.post('/', LessonsController.createLesson.bind(LessonsController));

router.put('/:id', LessonsController.updateLesson.bind(LessonsController));

router.delete('/:id', LessonsController.deleteLesson.bind(LessonsController));

module.exports = router;