const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getAll);
router.get('/:id', movieController.getOne);
router.post('/', movieController.create);
router.patch('/:id', movieController.update);
router.delete('/:id', movieController.delete);


module.exports = router;