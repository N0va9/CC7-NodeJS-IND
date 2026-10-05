const router = require('express').Router();
const verifyToken = require("../middleware/auth");
const authorizeNetizenRoles = require("../middleware/authorizeNetizenRoles");
const movieController = require('../controllers/movieController');

// Routes publiques (nécessite tout de même l'authentification)
router.get('/all', verifyToken, authorizeNetizenRoles("USER", "ADMIN"), movieController.publicGetAll);

// Routes protégées
router.get('/:id/ratings', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.getAllRatings);
router.get('/:id/details', /* verifyToken, authorizeNetizenRoles("ADMIN"),*/ movieController.getDetails);
router.get('/', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.getAll);
router.get('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.getOne);
router.post('/', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.create);
router.patch('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.update);
router.delete('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.delete);


module.exports = router;