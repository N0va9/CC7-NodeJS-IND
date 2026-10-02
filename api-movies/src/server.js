require('dotenv').config(); // Charge le .env (1ère ligne obligatoire)

const app = require("./app")

// Se connecte à la BDD MongoDB
const mongoose = require('mongoose');

// Variables d'environnement
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
                console.log(`The server is running at http://localhost:${PORT}/api-movies/docs`);
                console.log(`The server is running at http://localhost:${PORT}/api-movies/artists`);
                console.log(`The server is running at http://localhost:${PORT}/api-movies/countries`);
                console.log(`The server is running at http://localhost:${PORT}/api-movies/movies`);
                console.log(`The server is running at http://localhost:${PORT}/api-movies/netizens`);
                console.log(`The server is running at http://localhost:${PORT}/api-movies/marks`);
        });
    })
    .catch(err => {
        console.error('MongoDB  connection error: ', err);
        process.exit(1);
    });

module.exports = PORT