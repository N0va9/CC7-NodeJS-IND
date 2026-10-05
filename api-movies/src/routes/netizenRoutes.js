const router = require('express').Router();
const verifyToken = require("../middleware/auth");
const authorizeNetizenRoles = require("../middleware/authorizeNetizenRoles");
const netizenController = require('../controllers/netizenController');

// Routes publiques
router.post('/', netizenController.create);
router.post('/login', netizenController.login);

// Routes protégées
router.get('/', verifyToken, authorizeNetizenRoles("ADMIN"), netizenController.getAll);
router.get('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), netizenController.getOne);
router.patch('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), netizenController.update);
router.delete('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), netizenController.delete);


module.exports = router;