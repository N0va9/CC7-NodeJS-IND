const express = require('express');
const router = express.Router();
const markController = require('../controllers/markController');

router.get('/', markController.getAll);
router.get('/:id', markController.getOne);
router.post('/', markController.create);
router.patch('/:id', markController.update);
router.delete('/:id', markController.delete);


module.exports = router;