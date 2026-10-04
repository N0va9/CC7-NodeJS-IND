const router = require('express').Router();
const verifyToken = require("../middleware/auth");
const countryController = require('../controllers/countryController');

// Routes protégées
router.get('/', verifyToken, countryController.getAll);
router.get('/:id', verifyToken, countryController.getOne);
router.post('/', verifyToken, countryController.create);
router.patch('/:id', verifyToken, countryController.update);
router.delete('/:id', verifyToken, countryController.delete);


module.exports = router;