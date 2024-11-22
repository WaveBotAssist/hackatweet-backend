const express = require('express'); // Importation du module Express
const router = express.Router(); // Création d'un routeur Express
const Tweet = require('../models/tweets'); // Importation du modèle Tweet
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
    likes: 0, // Initialisation du nombre de likes à 0
    likedBy: [] // Initialisation du tableau des utilisateurs qui ont liké
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

// Nouvelle route pour liker ou unliker un tweet
router.post('/:id/like', (req, res) => {
  const tweetId = req.params.id;
  const userId = req.body.userId; // Assurez-vous que l'ID de l'utilisateur est passé dans le corps de la requête

  Tweet.findById(tweetId).then(tweet => {
    if (!tweet) {
      return res.status(404).json({ result: false, message: 'Tweet non trouvé' });
    }

    const index = tweet.likedBy.indexOf(userId);
    if (index === -1) {
      // Utilisateur n'a pas liké le tweet, donc on ajoute son ID
      tweet.likes += 1;
      tweet.likedBy.push(userId);
    } else {
      // Utilisateur a déjà liké le tweet, donc on enlève son ID
      tweet.likes -= 1;
      tweet.likedBy.splice(index, 1);
    }

    return tweet.save();
  }).then(() => {
    res.status(200).json({ result: true, message: 'Action sur le like/unlike réalisée avec succès' });
  }).catch(error => {
    res.status(500).json({ result: false, error: error.message });
  });
});

module.exports = router; // Exportation du routeur pour l'utiliser dans app.js
