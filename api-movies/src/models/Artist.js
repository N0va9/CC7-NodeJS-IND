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
        movieId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Movie',
                    index: true,
                    validate: { // Vérification que l'id du film est enregistré et valide
                        validator: async function (movieId) {
                            const Movie = mongoose.model("Movie");
                            return await Movie.exists({ _id: movieId }) !== null;
                        },
                        message: "This movieId isn't valid. Please choose a good one."
                    }
        },
    },
    { timestamps: true } // Created at and updated at
)

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;