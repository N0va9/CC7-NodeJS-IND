const router = require('express').Router();
const netizenController = require('../controllers/netizenController');
const verifyToken = require("../middleware/auth");

// Routes publiques
router.post('/', netizenController.create);
router.post('/login', netizenController.login);

// Routes protégées
router.get('/', verifyToken, netizenController.getAll);
router.get('/:id', verifyToken, netizenController.getOne);
router.patch('/:id', verifyToken, netizenController.update);
router.delete('/:id', verifyToken, netizenController.delete);


module.exports = router;