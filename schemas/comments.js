const mongoose = require('mongoose')

const CommentsSchema = new mongoose.Schema({
    postId: Number,
    userId: Number,
    commentId: Number,
    content: String,
    createAt: Date,
})
module.exports = mongoose.model('Comments', CommentsSchema)
