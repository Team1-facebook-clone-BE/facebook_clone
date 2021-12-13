const express = require('express')
const Posts = require('../schemas/posts')
const Likes = require('../schemas/like')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')
const posts = require('../schemas/posts')

const router = express.Router()

router.get('/post/:postId', async (req, res) => {
    const { postId } = req.params;
    const post = await Posts.findOne({ postId });
    res.json(post);
})

router.post("/like/:postId", authMiddleware, async (req, res) => {
    const user = res.locals.user
    const { postId } = res.params
    const likeExist = await Posts.findOne({ user: user, postId: postId })

    if (likeExist) {
        await Likes.findByIdAndDelete(likeExist)
        result = { data = false }
    } else {
        await Likes.create({ user: user, postId: postId })
        result = { data = true }
    }
})
module.exports = router
