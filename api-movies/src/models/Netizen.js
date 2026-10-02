const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const netizenSchema = new mongoose.Schema (
    {
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName : { type: String, required: true },
        password: { 
            type: String, 
            required: true, 
            select: false, // select empêche de retourner le champ
            minlength: 8
        }, 
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

// Hash du mot de passe avant tout (création ou sauvegarde)
netizenSchema.pre("save", async function () {
    // Vérifie que le mot de passe est modifié pour le re-hacher si besoin (update)
    if(!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 12); // 

});

// Vérification si connexion 
netizenSchema.methods.checkPassword = async function (passwordInput) {
    return bcrypt.compare(passwordInput, this.password); // Compare les 2 hash
}


const Netizen = mongoose.model('Netizen', netizenSchema);
module.exports = Netizen;