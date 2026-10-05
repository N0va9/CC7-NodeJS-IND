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
        movieIds: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Movie',
                    index: true,
                }
            ],
            required:true,
            set: function (ids) { // Pour empêcher d'enregistrer plisieurs fois le même id dans la liste ids
                if (!Array.isArray(ids)) {
                    return ids;
                }

                const uniqueIds = [
                    ...new Set(ids.map((id) => id.toString())),
                ]

                return uniqueIds;
            },
            validate: { // Vérification que l'id du film est enregistré et valide
                validator: async function (ids) {
                    const Movie = mongoose.model("Movie");

                    // On retire les doublons au cas où 
                    const uniqueIds = [
                        ...new Set(ids.map((id) => id.toString())),
                    ]

                    // On compte le nombre de films trouvés avec ces ids
                    const found = await Movie.countDocuments(
                        { _id: {
                            $in:uniqueIds,
                            },
                        }
                    );

                    return found === uniqueIds.length; // Vérification qu'on a le même nombre d'Ids trouvés
                },
                message: "At least one movieId is wrong, please check."
            }
    }
    },
    { timestamps: true } // Created at and updated at
)

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;