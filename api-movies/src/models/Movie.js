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
        countries: {
            type: [
                {
                    type: String,
                    ref: 'Country',
                    index: true,
                }
            ],
            required:true,
            set: function (ids) { // Pour empêcher d'enregistrer plusieurs fois le même countryCode dans la liste countries
                if (!Array.isArray(ids)) {
                    return ids;
                }

                // On retire les doublons au cas où 
                const uniqueCodes = [
                    ...new Set(ids.map((id) => id.toString())),
                ]

                return uniqueCodes;
            },
            validate: { // Vérification que l'id du pays est enregistré et valide
                validator: async function (ids) {
                    // On veut au moins un pays, pas de liste vide
                    if(!Array.isArray(ids) || ids.length === 0) {
                        return false;
                    }
                    const Country = mongoose.model("Country");

                    // On retire les doublons au cas où 
                    const uniqueCodes = [
                        ...new Set(ids.map((id) => id.toString())),
                    ]

                    // On compte le nombre de pays trouvés avec ces ids
                    const found = await Country.countDocuments(
                        { _id: {
                            $in:uniqueCodes,
                            },
                        }
                    );

                    return found === uniqueCodes.length; // Vérification qu'on a le même nombre d'Ids trouvés
                },
                message: "At least one countryCode is wrong or you forget to put one, please check."
            }
        }



    },
    {timestamps : true } // created et updated at
)

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;