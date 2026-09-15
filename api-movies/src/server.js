// Charge le .env
require('dotenv').config();


// Se connecte à la BDD MongoDB
const mongoose = require('mongoose');
const app = require('./app');

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB  connection error: ', err);
        process.exit(1);
    })