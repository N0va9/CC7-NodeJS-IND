const mongoose = require('mongoose');

//_id généré automatiquement
const markSchema = new mongoose.Schema (
    {
        email: {
            type: String,
            ref: 'Netizen',
            required: true,
            index: true,
            validate: { // Vérification que l'email de l'internaute est enregistré et valide
                validator: async function (email) {
                    const Netizen = mongoose.model("Netizen");
                    return await Netizen.exists({ email: email }) !== null;
                },
                message: "This email doesn't exist. Please choose a good one."
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
        mark: {
                type: Number,
                required: true,
                min: 0,
                max: 20
        },

    },
    { timestamps: true } // Created at and updated at
);

// Ici, nous voulons forcer l'unicité de couple (netizenEmail, movieId)
// Un internaute ne peut donner qu'une unique note à un film
markSchema.index(
    {email: 1, movieId: 1},
    {unique: true, name: 'unique_netizen_by_movie'}
);

const Mark = mongoose.model('Mark', markSchema);
module.exports = Mark;