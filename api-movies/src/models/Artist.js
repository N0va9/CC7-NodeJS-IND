const mongoose = require('mongoose');

//_id généré automatiquement
const artistSchema = new mongoose.Schema (
    {
        firstName: { type: String, required: true },
        lastName : { type: String, required: true },
        birthYear: { // On définit les limites concernant l'année de naissance
            type: Number,
            min: 1900,
            max: new Date().getFullYear(), // Année courante
            required: true
        },
    },
    { timestamps: true } // Created at and updated at
)

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;