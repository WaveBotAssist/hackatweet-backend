const express = require('express'); // Importation du module Express
const router = express.Router(); // Création d'un routeur Express
const Tweet = require('../models/tweets'); // Importation du modèle Tweet, assurez-vous que le chemin est correct

// Définition de la route GET pour '/trends'
router.get('/', (req, res) => { // Utilisez '/' pour correspondre à '/trends' lors de l'usage dans app.js
  console.log('Route / atteinte'); // Log pour vérifier que la route est atteinte
  Tweet.find() // Recherche de tous les documents dans la collection Tweet
    .then(tweets => {
      console.log('Tweets trouvés:', tweets.length); // Log pour le nombre de tweets trouvés
      let allHashtags = [];
      tweets.forEach(tweet => { // Pour chaque tweet, extraire les hashtags
        const hashtags = tweet.tweet.match(/#\w+/g) || []; // Trouver tous les hashtags dans le tweet
        allHashtags = allHashtags.concat(hashtags); // Ajouter les hashtags trouvés à la liste globale
      });

      let hashtagCounts = {}; // Objet pour compter les occurrences de chaque hashtag
      allHashtags.forEach(hashtag => { // Pour chaque hashtag
        if (hashtagCounts[hashtag]) { // Si le hashtag existe déjà dans le comptage
          hashtagCounts[hashtag]++; // Incrémenter le compteur
        } else {
          hashtagCounts[hashtag] = 1; // Initialiser le compteur à 1
        }
      });

      // Trier les hashtags par leur fréquence d'apparition
      let sortedHashtags = Object.keys(hashtagCounts).sort((a, b) => hashtagCounts[b] - hashtagCounts[a]);
      res.json({ result: true, trends: sortedHashtags }); // Réponse avec les hashtags triés
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des tweets:', error); // Log de l'erreur si la récupération échoue
      res.status(500).json({ result: false, error: error.message }); // Réponse avec l'erreur
    });
});

module.exports = router; // Exportation du routeur pour l'utiliser dans app.js


