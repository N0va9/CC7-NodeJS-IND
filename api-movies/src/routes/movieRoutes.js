const router = require('express').Router();
const verifyToken = require("../middleware/auth");
const movieController = require('../controllers/movieController');

// Routes protégées
router.get('/', verifyToken, movieController.getAll);
router.get('/:id', verifyToken, movieController.getOne);
router.post('/', verifyToken, movieController.create);
router.patch('/:id', verifyToken, movieController.update);
router.delete('/:id', verifyToken, movieController.delete);


module.exports = router;