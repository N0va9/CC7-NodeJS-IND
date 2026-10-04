// Swagger configuration
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const mongooseToSwagger = require("mongoose-to-swagger");


// Schémas des entités
const Artist = require("../models/Artist");
const Country = require("../models/Country");
const Movie = require("../models/Movie");
const Netizen = require("../models/Netizen");
const Mark = require("../models/Mark");
const Role = require("../models/Role");

// __v : champ de version interne à Mongoose -> pas nécessaire ici

const models = {
    Artist, 
    Country, 
    Movie,
    Netizen,
    Mark,
    Role
}

const schemas = Object.fromEntries( // TODO Netizen password? ou 2 représentations (une publique et une privée)
    Object.entries(models).map(([name, model]) => [
        name, 
        mongooseToSwagger(model, {
            omitFields: ["__v", "createdAt", "updatedAt", "password", "role"], // Retire les champs s'ils existent
        }),
    ]),
);


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.2.0',
        info: {
            title: "Movies API",
            version: '1.0.0',
            description: 'API documentation using Swagger for movies API',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
        components: {
            schemas: {
                ...schemas
            },

            securitySchemes: {
                oauth2Password: {
                    type: "oauth2",
                    flows: {
                        password: {
                            tokenUrl: "/api-movies/netizens/login",
                            scopes: {},
                        }
                    }
                }
            },
        },
    },
    apis: [
        path.resolve(__dirname, "../docs/openapi.yaml"),
    ], //API docs paths
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;