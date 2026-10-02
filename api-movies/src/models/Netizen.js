const mongoose = require('mongoose');

const netizenSchema = new mongoose.Schema (
    {
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName : { type: String, required: true },
        password: { type: String, required: true, select: false}, // select empêche de retourner le champ
        // TODO encryptage du mdp (bcrypt)
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
        role : { type: String, enum:['user', 'admin'], default: 'user' },

    },
    { timestamps: true } // Created at and updated at
)

const Netizen = mongoose.model('Netizen', netizenSchema);
module.exports = Netizen;