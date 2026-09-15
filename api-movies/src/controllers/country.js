const makeCrudController = require('./genericController');
const countryRepository = require('../repositories/countryRepository');


const countryController = makeCrudController({
    repository: countryRepository,
    resourceName: 'Country',
})

module.exports = countryController;