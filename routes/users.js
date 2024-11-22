const express = require('express');
const router = express.Router();
const User = require('../models/users'); // Correction de la casse
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

// Extraction des fonctions nécessaires depuis bcrypt
const { hashSync, compareSync } = bcrypt;

// Route pour l'inscription des utilisateurs
router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['firstname', 'username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Vérification si l'utilisateur n'est pas déjà enregistré
  User.findOne({ username: req.body.username }).then(data => { // Correction du modèle User
    if (data === null) {
      const hash = hashSync(req.body.password, 10);

      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        image: '.../hacktweet-frontend/public/user.png',
        password: hash,
        token: uid2(32),
      });

      newUser.save().then(newDoc => {
        res.json({ 
          result: true, 
          firstname: newDoc.firstname, 
          username: newDoc.username,
          image: newDoc.image,
          token: newDoc.token 
        });
      });
    } else {
      // L'utilisateur existe déjà dans la base de données
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

// Route pour la connexion des utilisateurs
router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, firstname: data.firstname, username: data.username, image: data.image, token: data.token });
  User.findOne({ username: req.body.username }).then(data => { // Correction du modèle User
    if (data && compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

module.exports = router; 
