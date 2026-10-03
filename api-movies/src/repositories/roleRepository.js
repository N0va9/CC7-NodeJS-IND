const GenericRepository = require('./genericRepository');
const Role = require('../models/Role');

class RoleRepository extends GenericRepository {
    constructor() {
        super(Role); // On fournit le modèle à la classe
    }

    // Ajout des méthodes nécessaires si besoin
}

module.exports = new RoleRepository();