const mongoose = require('mongoose')

const PostsSchema = new mongoose.Schema({
    postId: Number,
    userId: String,
})
module.exports = mongoose.model('Posts', PostsSchema)
