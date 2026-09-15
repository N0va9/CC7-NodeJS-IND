const GenericRepository = require('./genericRepository');
const Movie = require('../models/Movie');

class MovieRepository extends GenericRepository {
    constructor() {
        super(Movie); // On fournit le modèle à la classe
    }

    // Ajout des méthodes nécessaires si besoin
}

module.exports = new MovieRepository();