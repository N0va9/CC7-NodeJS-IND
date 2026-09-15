const express = require('express');
const router = express.Router();
const netizenController = require('../controllers/netizenController');

router.get('/', netizenController.getAll);
router.get('/:id', netizenController.getOne);
router.post('/', netizenController.create);
router.put('/:id', netizenController.update);
router.delete('/:id', netizenController.delete);


module.exports = router;