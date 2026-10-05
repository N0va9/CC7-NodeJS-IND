const router = require('express').Router();
const verifyToken = require("../middleware/auth");
const authorizeNetizenRoles = require("../middleware/authorizeNetizenRoles");
const artistController = require('../controllers/artistController');

// Routes publiques (nécessite tout de même l'authentification)
router.get('/all', verifyToken, authorizeNetizenRoles("USER", "ADMIN"), artistController.publicGetAll);

// Routes protégées
router.get('/:id/allMoviesRealised', verifyToken, authorizeNetizenRoles("ADMIN"), artistController.getAllMoviesRealised);
router.get('/', verifyToken, authorizeNetizenRoles("ADMIN"), artistController.getAll);
router.get('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), artistController.getOne);
router.post('/', verifyToken, authorizeNetizenRoles("ADMIN"), artistController.create);
router.patch('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), artistController.update);
router.delete('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), artistController.delete);


module.exports = router;