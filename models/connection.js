const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://lion455:Irgpt455@cluster0.peqfc.mongodb.net/hackatweet';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

  .catch(error => console.error(error));