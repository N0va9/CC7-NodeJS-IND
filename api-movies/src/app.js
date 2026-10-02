// Regarde le package express dans node_modules et nous donne l'accès à ses fonctions pour créer un serveur web
const express = require('express');

// Gestionnaire d'erreurs
const errorHandler = require("./errors/errorHandler")

// Routage
const artistRouter = require('./routes/artistRoutes');
const countryRouter = require('./routes/countryRoutes');
const movieRouter = require('./routes/movieRoutes');
const netizenRouter = require('./routes/netizenRoutes');
const markRouter = require('./routes/markRoutes');

// Configuration Swagger
const swaggerDocs = require('./config/swagger');
const swaggerUi = require("swagger-ui-express");

// Permet de créer un objet représentant mon serveur web
// On va pouvoir définir nos routes, middleware, et contrôler comment notre serveur répond aux requêtes
const app = express();

// Middleware global 
app.use(express.json());

// Une route est une instruction nous permettant de dire, que quand quelqu'un visite une URL spécifique, ça enverra une réponse spécifique.
// Dans notre cas, on va créer des routes pour envoyer des données ou effectuer une action que l'on spécifiera dans notre gestionnaire de routes.


// On peut spécifier des paramètres pour les routes : ce sont des variables dans l'URL permettant à notre server de gérer les valeurs dynamiques, comme un id pour une route par exemple
// En Express, on l'écrit ainsi :id
// Tout ce qu'on remplace par :id dans l'URL devient disponible en tant que req.params.id dans notre gestionnaire de routes.


const jwt = require('jsonwebtoken')




// Branchement des routers
app.use("/api-movies/artists", artistRouter);
app.use("/api-movies/countries", countryRouter);
app.use("/api-movies/movies", movieRouter);
app.use("/api-movies/netizens", netizenRouter);
app.use("/api-movies/marks", markRouter);
app.use('/api-movies/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Gestion de routes inconnues
app.use((req, res) => {
    return res.status(404).json({
        status: 404,
        code: "ROUTE_NOT_FOUND",
        message: "Route not found",
    });
});

// Gestion d'erreur globale (toujours en dernier)
app.use(errorHandler);

module.exports = app;