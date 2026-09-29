require('dotenv').config(); // Charge le .env (1ère ligne obligatoire)


// Regarde le package express dans node_modules et nous donne l'accès à ses fonctions pour créer un serveur web
const express = require('express');

// Se connecte à la BDD MongoDB
const mongoose = require('mongoose');

// Variables d'environnement
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;


// Permet de créer un objet représentant mon serveur web
// On va pouvoir définir nos routes, middleware, et contrôler comment notre serveur répond aux requêtes
const app = express();

// Middleware global 
app.use(express.json());

// Routage
const artistRouter = require('./routes/artistRoutes');
const countryRouter = require('./routes/countryRoutes');
const movieRouter = require('./routes/movieRoutes');
const netizenRouter = require('./routes/netizenRoutes');

// Gestion d'erreur globale
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({error: message});
});

// Branchement des routers
app.use("/artists", artistRouter);
app.use("/countries", countryRouter);
app.use("/movies", movieRouter);
app.use("/netizens", netizenRouter);

// Une route est une instruction nous permettant de dire, que quand quelqu'un visite une URL spécifique, ça enverra une réponse spécifique.
// Dans notre cas, on va créer des routes pour envoyer des données ou effectuer une action que l'on spécifiera dans notre gestionnaire de routes.


// On peut spécifier des paramètres pour les routes : ce sont des variables dans l'URL permettant à notre server de gérer les valeurs dynamiques, comme un id pour une route par exemple
// En Express, on l'écrit ainsi :id
// Tout ce qu'on remplace par :id dans l'URL devient disponible en tant que req.params.id dans notre gestionnaire de routes.

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
                console.log("The server is running at http://localhost:"+ PORT);
                console.log(`The server is running at http://localhost:${PORT}/artists`);
                console.log(`The server is running at http://localhost:${PORT}/countries`);
                console.log(`The server is running at http://localhost:${PORT}/movies`);
                console.log(`The server is running at http://localhost:${PORT}/netizens`);
        });
    })
    .catch(err => {
        console.error('MongoDB  connection error: ', err);
        process.exit(1);
    })