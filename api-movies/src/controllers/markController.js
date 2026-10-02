const makeCrudController = require('./genericController');
const markRepository = require('../repositories/markRepository');


const markController = makeCrudController({
    repository: markRepository,
    resourceName: 'Mark'
})

module.exports = markController;