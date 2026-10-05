const router = require('express').Router();
const verifyToken = require("../middleware/auth");
const authorizeNetizenRoles = require("../middleware/authorizeNetizenRoles");
const movieController = require('../controllers/movieController');

// Routes protégées
router.get('/', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.getAll);
router.get('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.getOne);
router.post('/', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.create);
router.patch('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.update);
router.delete('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.delete);


module.exports = router;