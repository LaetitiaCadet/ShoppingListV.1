
const mongoose = require('mongoose');

// definis un schema pour la collection 'list'
const listSchema = mongoose.Schema({
    // _id: {type: String, required: true},
    name: {type: String, required: true},
    productsList: {type: Array, required: false},
    favorits: {type: Array, required: false},
    date: { type: Date, default: Date.now},
});

 
// crée un model pour la collection "list" utilisant le schema
const List = mongoose.model('Lists', listSchema);
module.exports = List