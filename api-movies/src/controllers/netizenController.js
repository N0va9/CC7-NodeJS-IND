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
        const { email, password } = req.body;

        const netizen = await Netizen.findOne({email}).select("+password");
        const goodPassword = await bcrypt.compare(password, netizen.password);


        if (!netizen || !goodPassword ) { // Si internaute non trouvé ou mot de passe incorrect
            return res.status(401).json({
                message: "Incorrect email or password",
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
            message: "Login successful",
            token,
            netizen: {
                email: netizen.email,
                role: netizen.role,
            },
        });

    } catch (error) {
        return next(error);
    }
}

module.exports = netizenController;