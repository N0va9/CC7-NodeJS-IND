const router = require('express').Router();
const verifyToken = require("../middleware/auth");
const roleController = require('../controllers/roleController');

// Routes protégées
router.get('/', verifyToken, roleController.getAll);
router.get('/:id', verifyToken, roleController.getOne);
router.post('/', verifyToken, roleController.create);
router.patch('/:id', verifyToken, roleController.update);
router.delete('/:id', verifyToken, roleController.delete);


module.exports = router;