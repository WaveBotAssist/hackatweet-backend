const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
require('./models/connection'); // Connexion à la base de données

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const trendsRouter = require('./routes/trends');
const tweetsRouter = require('./routes/tweets');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trends', trendsRouter);
app.use('/tweets', tweetsRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;

