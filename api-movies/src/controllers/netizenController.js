const makeCrudController = require('./genericController');
const netizenRepository = require('../repositories/netizenRepository');


const netizenController = makeCrudController({
    repository: netizenRepository,
    resourceName: 'Netizen'
})

module.exports = netizenController;