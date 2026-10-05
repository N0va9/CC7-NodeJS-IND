const router = require('express').Router();
const verifyToken = require("../middleware/auth");
const authorizeNetizenRoles = require("../middleware/authorizeNetizenRoles");
const artistController = require('../controllers/artistController');

// Routes protégées
router.get('/', verifyToken, authorizeNetizenRoles("ADMIN"), artistController.getAll);
router.get('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), artistController.getOne);
router.post('/', verifyToken, authorizeNetizenRoles("ADMIN"), artistController.create);
router.patch('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), artistController.update);
router.delete('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), artistController.delete);


module.exports = router;