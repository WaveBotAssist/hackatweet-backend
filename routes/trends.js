const express = require('express');
const router = express.Router();
const Tweet = require('../models/tweets'); 

router.get('/trends', (req, res) => {
  console.log('Route /trends atteinte');
  Tweet.find()
    .then(tweets => {
      console.log('Tweets trouvés:', tweets.length);
      let allHashtags = [];
      tweets.forEach(tweet => {
        const hashtags = tweet.tweet.match(/#\w+/g) || [];
        allHashtags = allHashtags.concat(hashtags);
      });

      let hashtagCounts = {};
      allHashtags.forEach(hashtag => {
        if (hashtagCounts[hashtag]) {
          hashtagCounts[hashtag]++;
        } else {
          hashtagCounts[hashtag] = 1;
        }
      });

      let sortedHashtags = Object.keys(hashtagCounts).sort((a, b) => hashtagCounts[b] - hashtagCounts[a]);
      res.json({ result: true, trends: sortedHashtags });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des tweets:', error);
      res.status(500).json({ result: false, error: error.message });
    });
});

module.exports = router;
