const GenericRepository = require('./genericRepository');
const Country = require('../models/Country');

class CountryRepository extends GenericRepository {
    constructor() {
        super(Country); // On fournit le modèle à la classe
    }

    // Ajout des méthodes nécessaires si besoin
}

module.exports = new CountryRepository();