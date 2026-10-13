# Initialisation

# Création du package.json et initialisation du projet

```bash=
npm init
```

# Installation des dépendances

```bash=
npm i express dotenv mongoose
npm i --save-dev nodemon
```

`express` : Framework NodeJS pour créer des serveurs HTTP/APIs REST
`dotenv`  : Permet de charger des variables d'environnement depuis un fichier .env
`mongoose`: Bibliothèque standard pour travailler avec MongoDB en Node/Express -> gère les schémas, modèles, etc
`nodemon` : Redémarre le serveur lorsqu'on modifie un fichier

# Pour lancer le projet depuis la racine (api-movies)

```bash=
npm start
```

# Bibliothèques utilisées

morgan nodemon  ejs body-parser dotenv mongoose axios
express swagger-ui-express swagger-jsdoc
mongoose-to-swagger
bcrypt
jsonwebtoken
multer
Utilisation de l'API RestCountries pour récupérer les codes, langues et pays dans le monde

Pour les tests : supertest jest
