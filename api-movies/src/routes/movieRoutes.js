const router = require('express').Router();

// Middlewares
const verifyToken = require("../middleware/auth");
const authorizeNetizenRoles = require("../middleware/authorizeNetizenRoles");
const uploadFile = require("../middleware/upload");
const checkMovieExists = require('../middleware/checkMovieExists');

//Controller
const movieController = require('../controllers/movieController');


// Routes publiques (nécessite tout de même l'authentification)
router.get('/all', verifyToken, authorizeNetizenRoles("USER", "ADMIN"), movieController.publicGetAll);

// Routes protégées spécifiques à l'entité
router.get('/:id/ratings', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.getAllRatings);
router.get('/:id/details', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.getDetails);
router.post('/:id/addFile', verifyToken, authorizeNetizenRoles("ADMIN"), checkMovieExists, uploadFile.single("file"), movieController.addFile);

// CRUD (routes protégées)
router.post('/', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.create);
router.get('/', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.getAll);
router.get('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.getOne);
router.patch('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.update);
router.delete('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), movieController.delete);


module.exports = router;