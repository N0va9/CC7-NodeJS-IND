const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.get('/', roleController.getAll);
router.get('/:id', roleController.getOne);
router.post('/', roleController.create);
router.patch('/:id', roleController.update);
router.delete('/:id', roleController.delete);


module.exports = router;