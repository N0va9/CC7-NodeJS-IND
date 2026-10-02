const GenericRepository = require('./genericRepository');
const Mark = require('../models/Mark');

class MarkRepository extends GenericRepository {
    constructor() {
        super(Mark); // On fournit le modèle à la classe
    }

    // Ajout des méthodes nécessaires si besoin
}

module.exports = new MarkRepository();