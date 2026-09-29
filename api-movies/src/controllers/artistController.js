const makeCrudController = require('./genericController');
const artistRepository = require('../repositories/artistRepository');


const artistController = makeCrudController({
    repository: artistRepository,
    resourceName: 'Artist'
})

module.exports = artistController;