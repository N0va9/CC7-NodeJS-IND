const router = require('express').Router();
const verifyToken = require("../middleware/auth");
const authorizeNetizenRoles = require("../middleware/authorizeNetizenRoles");
const countryController = require('../controllers/countryController');

// Routes protégées
router.get('/', verifyToken, authorizeNetizenRoles("ADMIN"), countryController.getAll);
router.get('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), countryController.getOne);
router.post('/', verifyToken, authorizeNetizenRoles("ADMIN"), countryController.create);
router.patch('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), countryController.update);
router.delete('/:id', verifyToken, authorizeNetizenRoles("ADMIN"), countryController.delete);


module.exports = router;