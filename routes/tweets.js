const express = require('express'); // Importation du module Express
const router = express.Router(); // Création d'un routeur Express
const Tweet = require('../models/tweets'); // Importation du modèle Tweet, assurez-vous que le chemin est correct
const { checkBody } = require('../modules/checkBody'); // Importation de la fonction checkBody pour valider les données

// Route pour ajouter un tweet
router.post('/add', (req, res) => {
  if (!checkBody(req.body, ['tweet'])) { // Vérification des champs requis dans le corps de la requête
    res.json({ result: false, error: 'Missing or empty fields' }); // Réponse si des champs sont manquants ou vides
    return;
  }

  const newTweet = new Tweet({
    timestamp: new Date(), // Ajout de l'horodatage actuel
    tweet: req.body.tweet, // Contenu du tweet depuis le corps de la requête
  });

  newTweet.save().then(newDoc => { // Sauvegarde du nouveau tweet dans la base de données
    res.json({ result: true, tweet: newDoc }); // Réponse avec le tweet sauvegardé
  }).catch(error => {
    res.json({ result: false, error: error.message }); // Réponse en cas d'erreur de sauvegarde
  });
});

// Route pour récupérer tous les tweets
router.get('/all', (req, res) => {
  Tweet.find().then(tweets => { // Recherche de tous les tweets dans la base de données
    res.json({ result: true, tweets }); // Réponse avec la liste des tweets trouvés
  }).catch(error => {
    res.json({ result: false, error: error.message }); // Réponse en cas d'erreur de récupération
  });
});

module.exports = router; // Exportation du routeur pour l'utiliser dans app.js
