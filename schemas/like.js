const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    postId: Number,
    userId: String,
})
module.exports = mongoose.model('Like', LikeSchema)
