const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv"); // Importe les variables d'environnement.
dotenv.config();

const app = express();
const ID_MANGO_DB = process.env.ID_MANGO_DB; 
const PASSWORD_MANGO_DB = process.env.PASSWORD_MANGO_DB;


mongoose.connect('mongodb+srv://' + ID_MANGO_DB + ":" + PASSWORD_MANGO_DB + '@cluster0.a40ry.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = app;