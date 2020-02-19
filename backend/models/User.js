const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define collection and schema
let User = new Schema({
    userId: {
        type: Number
    },
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    userRegistered: {
        type: String
    } 
}, {
    collection: 'users'
})

module.exports = mongoose.model('User', User)