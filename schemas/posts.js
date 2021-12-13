const mongoose = require('mongoose')

const PostsSchema = new mongoose.Schema({
    postId: Number,
    userId: String,
    userName: String,
    content: String,
    likeCnt: Number,
})
module.exports = mongoose.model('Posts', PostsSchema)
