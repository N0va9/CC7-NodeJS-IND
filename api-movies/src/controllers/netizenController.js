const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const makeCrudController = require('./genericController');
const netizenRepository = require('../repositories/netizenRepository');
const Netizen = require("../models/Netizen")

const netizenController = makeCrudController({
    repository: netizenRepository,
    resourceName: 'Netizen'
});

netizenController.login = async (req, res, next) => {
    try {
        const { email, username, password, grant_type } = req.body;
        
        const netizenEmail = email ?? username; // username car champ possible via OAUTH2

        // Si le mot de passe entré contient au moins 8 charactères
        if (!password || password.length <= 8) { 
            return res.status(401).json({
                error: "invalid_grant",
                error_description: "Password must have at least 8 characters",
            });
        }

        const netizen = await Netizen.findOne({ email: netizenEmail }).select("+password");
        
        // Si on trouve un internaute avec ce mail, on continue
        if (!netizen) { // Si internaute non trouvé
            return res.status(401).json({
                error: "invalid_grant",
                error_description: "Incorrect email or password",
            });
        }

        // On compare le mot de passe fourni hashé et celui en base
        const goodPassword = await bcrypt.compare(password, netizen.password);


        if (!goodPassword ) { // Si mot de passe incorrect
            return res.status(401).json({
                error: "invalid_grant",
                error_description: "Incorrect email or password",
            });
        }

        // Vérification grant_type
        if (grant_type && grant_type !== "password") {
            return res.status(400).json({
                error: "unsupported_grant_type",
                error_description: "grant_type must be password",
            });
        }

        const token = jwt.sign({
            id: netizen._id.toString(),
            role: netizen.role,
            }, 
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1h",
            }
        );

        return res.status(200).json({
            access_token: token,
            token_type: "Bearer",
            expires_in: 3600,
        });

    } catch (error) {
        console.log(error);
        return next(error);
    }
}

module.exports = netizenController;