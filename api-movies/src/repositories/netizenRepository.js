const GenericRepository = require('./genericRepository');
const Netizen = require('../models/Netizen');

class NetizenRepository extends GenericRepository {
    constructor() {
        super(Netizen); // On fournit le modèle à la classe
    }

    // Ajout des méthodes nécessaires si besoin
}

module.exports = new NetizenRepository();