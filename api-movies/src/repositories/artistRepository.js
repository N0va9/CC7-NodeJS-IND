const GenericRepository = require('./genericRepository');
const Artist = require('../models/Artist');

class ArtistRepository extends GenericRepository {
    constructor() {
        super(Artist); // On fournit le modèle à la classe
    }

    // Ajout des méthodes nécessaires si besoin
}

module.exports = new ArtistRepository();