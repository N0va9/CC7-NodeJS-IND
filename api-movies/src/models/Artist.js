const mongoose = require('mongoose');

//_id généré automatiquement
const artistSchema = new mongoose.Schema (
    {
        firstName: { type: String, required: true },
        lastName : { type: String, required: true },
        birthYear: { // On définit les limites concernant l'année de naissance
            type: Number,
            min: 1800,
            max: 2100,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: 'birthYear must be an integer.' // Nous forçons ici un nombre entier
            }
        },
    },
    { timestamps: true } // Created at and updated at
)

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;