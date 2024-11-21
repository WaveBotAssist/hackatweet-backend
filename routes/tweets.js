const express = require('express');
const router = express.Router();
const Tweet = require('../models/tweets'); // Assurez-vous que le chemin est correct
const { checkBody } = require('../modules/checkBody');

// Route pour ajouter un tweet
router.post('/add', (req, res) => {
  if (!checkBody(req.body, ['tweet'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  const newTweet = new Tweet({
    timestamp: new Date(),
    tweet: req.body.tweet,
  });

  newTweet.save().then(newDoc => {
    res.json({ result: true, tweet: newDoc });
  }).catch(error => {
    res.json({ result: false, error: error.message });
  });
});

// Route pour récupérer tous les tweets
router.get('/all', (req, res) => {
  Tweet.find().then(tweets => {
    res.json({ result: true, tweets });
  }).catch(error => {
    res.json({ result: false, error: error.message });
  });
});

module.exports = router;
