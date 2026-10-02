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
                message: 'year must be an integer.' // Nous forçons ici un nombre entier
            }
        },
        genre: { type: String, required: true },
        resume : { type: String, required: true},
        country: {
            type: String,
            ref: 'Country',
            required: true,
            index: true,
            validate: { // Vérification que le code du pays est enregistré et valide
                validator: async function (country) {
                    const Country = mongoose.model("Country");
                    return await Country.exists({ _id: country }) !== null;
                },
                message: "This country code isn't valid. Please choose a good one."
            }
        }
    },
    {timestamps : true } // created et updated at
)

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;