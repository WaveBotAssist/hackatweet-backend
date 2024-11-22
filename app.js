const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // Ajouter l'importation de cors
require('dotenv').config();
require('./models/connection'); // Connexion à la base de données

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const trendsRouter = require('./routes/trends');
const tweetsRouter = require('./routes/tweets');

const app = express();

app.use(logger('dev'));
app.use(cors()); // Utiliser cors comme middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trends', trendsRouter);
app.use('/tweets', tweetsRouter);



module.exports = app;

