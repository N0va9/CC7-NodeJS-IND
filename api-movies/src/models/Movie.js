const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema (
    {
        title : { type: String, required: true },
        year: { // On définit les limites concernant l'année du film
            type: Number,
            min: 1895,
            max: 2100,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: 'birthYear must be an integer.' // Nous forçons ici un nombre entier
            }
        },
        genre: { type: String, required: true },
        resume : { type: String, required: true},
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country',
            required: true
        }
    },
    {timestamps : true } // created et updated at
)

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;