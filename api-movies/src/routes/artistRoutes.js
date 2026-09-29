const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

router.get('/', artistController.getAll);
router.get('/:id', artistController.getOne);
router.post('/', artistController.create);
router.patch('/:id', artistController.update);
router.delete('/:id', artistController.delete);


module.exports = router;