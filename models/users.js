 const mongoose = require('mongoose');

 const usersSchema = mongoose.Schema({
    firstname : String,
    name : String,
    password: String,
    image : String,
    token : String,
 })

 const User = mongoose.model('users', usersSchema);

 module.exports= User