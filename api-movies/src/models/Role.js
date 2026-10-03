const mongoose = require('mongoose');

//_id généré automatiquement
const roleSchema = new mongoose.Schema (
    {
        artistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist',
            required: true,
            index: true,
            validate: { // Vérification que l'id de l'artiste est enregistré et valide
                validator: async function (artistId) {
                    const Artist = mongoose.model("Artist");
                    return await Artist.exists({ _id: artistId }) !== null;
                },
                message: "This artistId isn't valid. Please choose a good one."
            }
        },        
        movieId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Movie',
                    required: true,
                    index: true,
                    validate: { // Vérification que l'id du film est enregistré et valide
                        validator: async function (movieId) {
                            const Movie = mongoose.model("Movie");
                            return await Movie.exists({ _id: movieId }) !== null;
                        },
                        message: "This movieId isn't valid. Please choose a good one."
                    }
        },
        role: {
                type: String,
                required: true,
        },

    },
    { timestamps: true } // Created at and updated at
);

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;