const express = require('express');
const cors = require('cors');
const LessonsController = require('../controllers/lessonsController');
const jwt = require('../utils/jwt');
const AuthenticationMiddleware = require('../middlewares/authenticateToken');

const router = express.Router();

router.use('/lessons', router);
router.use(cors());

router.post('/auth', LessonsController.authenticate.bind(LessonsController));
router.post('/tokenValidate', LessonsController.tokenValidate.bind(LessonsController));

router.get('/expiredTokens', AuthenticationMiddleware.authenticateToken.bind(AuthenticationMiddleware), LessonsController.expiredTokens.bind(LessonsController));
router.get('/', AuthenticationMiddleware.authenticateToken.bind(AuthenticationMiddleware), LessonsController.lessonsAll.bind(LessonsController));
router.get('/:id', AuthenticationMiddleware.authenticateToken.bind(AuthenticationMiddleware), LessonsController.lessonById.bind(LessonsController));

router.post('/', AuthenticationMiddleware.authenticateToken.bind(AuthenticationMiddleware), LessonsController.createLesson.bind(LessonsController));

router.put('/:id', AuthenticationMiddleware.authenticateToken.bind(AuthenticationMiddleware), LessonsController.updateLesson.bind(LessonsController));

router.delete('/:id', AuthenticationMiddleware.authenticateToken.bind(AuthenticationMiddleware), LessonsController.deleteLesson.bind(LessonsController));


module.exports = router;