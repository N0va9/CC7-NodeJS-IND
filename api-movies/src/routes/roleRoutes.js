const router = require('express').Router();
const verifyToken = require("../middleware/auth");
const authorizeNetizenRoles = require("../middleware/authorizeNetizenRoles");
const roleController = require('../controllers/roleController');

// Routes protégées
router.get('/', verifyToken, authorizeNetizenRoles("ADMIN"), roleController.getAll);
router.get('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), roleController.getOne);
router.post('/', verifyToken, authorizeNetizenRoles("ADMIN"), roleController.create);
router.patch('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), roleController.update);
router.delete('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), roleController.delete);


module.exports = router;