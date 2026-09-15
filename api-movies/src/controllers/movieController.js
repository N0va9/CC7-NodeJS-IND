const makeCrudController = require('./genericController');
const movieRepository = require('../repositories/movieRepository');


const movieController = makeCrudController({
    repository: movieRepository,
    resourceName: 'Movie',
})

module.exports = movieController;