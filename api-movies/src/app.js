PORT = 3000


// Regarde le package express dans node_modules et nous donne l'accès à ses fonctions pour créer un serveur web
const express = require('express');

// Permet de créer un objet représentant mon serveur web
// On va pouvoir définir nos routes, middleware, et contrôler comment notre serveur répond aux requêtes
const app = express();

// Middleware global 
app.use(express.json());

// Routage
const userRoutes = require('./routes/userRoutes');

// Gestion d'erreur globale
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({error: message});
});

module.exports = app;















app.get('/', (req, res) => {
    res.send('Hello from Express');
})


app.get('/about', (req, res) => {
    res.send('About Page');
})

app.get('/player', (req, res) => {
    res.send('Player page');
})

app.get('/products', (req, res) => {
    res.json([
        {id: 1, name: 'Laptop', price: 1299},
        {id: 2, name: 'Screen', price: 499},
        {id: 3, name: 'Pen', price: 2},
    ])
})

app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id);

    const products = [
        {id: 1, name: 'Laptop', price: 1299},
        {id: 2, name: 'Screen', price: 499},
        {id: 3, name: 'Pen', price: 2},
    ]

    const requestedProduct = products.find((product) => product.id === id)
    res.json(requestedProduct)

})



app.listen(PORT, () => {
    console.log("The server is running at http://localhost:"+ PORT);
    console.log("The server is running at http://localhost:"+ PORT+ "/about");
    console.log("The server is running at http://localhost:"+ PORT+"/player");
    console.log("The server is running at http://localhost:"+ PORT+"/products");
    console.log("The server is running at http://localhost:"+ PORT+"/products/2");
})



// Une route est une instruction nous permettant de dire, que quand quelqu'un visite une URL spécifique, ça enverra une réponse spécifique.
// Dans notre cas, on va créer des routes pour envoyer des données ou effectuer une action que l'on spécifiera dans notre gestionnaire de routes.


// On peut spécifier des paramètres pour les routes : ce sont des variables dans l'URL permettant à notre server de gérer les valeurs dynamiques, comme un id pour une route par exemple
// En Express, on l'écrit ainsi :id
// Tout ce qu'on remplace par :id dans l'URL devient disponible en tant que req.params.id dans notre gestionnaire de routes.
