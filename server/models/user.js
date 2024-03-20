const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    password: String
})

const User = mongoose.model('User', user_schema);

module.exports = User;