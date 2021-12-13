const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    userEmail: String,
    password: String,
    gender: String,
    birth: Date,
})
module.exports = mongoose.model('User', UserSchema)
