const makeCrudController = require('./genericController');
const roleRepository = require('../repositories/roleRepository');


const roleController = makeCrudController({
    repository: roleRepository,
    resourceName: 'Role'
})

module.exports = roleController;