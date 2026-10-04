const router = require('express').Router();
const verifyToken = require("../middleware/auth");
const artistController = require('../controllers/artistController');

// Routes protégées
router.get('/', verifyToken, artistController.getAll);
router.get('/:id', verifyToken, artistController.getOne);
router.post('/', verifyToken, artistController.create);
router.patch('/:id', verifyToken, artistController.update);
router.delete('/:id', verifyToken, artistController.delete);


module.exports = router;