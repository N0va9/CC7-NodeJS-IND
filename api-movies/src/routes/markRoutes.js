const router = require('express').Router();
const verifyToken = require("../middleware/auth");
const markController = require('../controllers/markController');

// Routes protégées
router.get('/', verifyToken, markController.getAll);
router.get('/:id', verifyToken, markController.getOne);
router.post('/', verifyToken, markController.create);
router.patch('/:id', verifyToken, markController.update);
router.delete('/:id', verifyToken, markController.delete);


module.exports = router;