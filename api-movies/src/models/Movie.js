const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema (
    {
        title : { type: String, required: true },
        year: { // On définit les limites concernant l'année du film
            type: Number,
            min: 1800,
            max: new Date().getFullYear(), // Année courante
            required: true
        },
        genre: { type: String, required: true },
        resume : { type: String, required: true},
    },
    {timestamps : true } // created et updated at
)

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;