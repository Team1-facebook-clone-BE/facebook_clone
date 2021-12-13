const mongoose = require('mongoose')

const PostsSchema = new mongoose.Schema({
    postId: Number,
    userId: Number,
    userName: String,
    img: String,
    content: String,
    createAt: String,
})
module.exports = mongoose.model('Posts', PostsSchema)
