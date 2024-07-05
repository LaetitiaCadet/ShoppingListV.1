const mongoose = require('mongoose');

// definis un schema pour la collection 'user'
const userSchema = mongoose.Schema({
    // _id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: { type: Date, default: Date.now},
});

 
// crée un model pour la collection "user" utilisant le schema
const User = mongoose.model('Users', userSchema);
module.exports = User