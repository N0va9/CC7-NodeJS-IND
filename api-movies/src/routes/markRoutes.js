const router = require('express').Router();
const verifyToken = require("../middleware/auth");
const authorizeNetizenRoles = require("../middleware/authorizeNetizenRoles");
const markController = require('../controllers/markController');

// Routes protégées
router.get('/', verifyToken, authorizeNetizenRoles("ADMIN"), markController.getAll);
router.get('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), markController.getOne);
router.post('/', verifyToken, authorizeNetizenRoles("ADMIN"), markController.create);
router.patch('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), markController.update);
router.delete('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), markController.delete);


module.exports = router;