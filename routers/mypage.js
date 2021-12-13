const express = require('express')
const Posts = require('../schemas/posts')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router()

router.get('/mypage/:userId', authMiddleware, async (req, res) => {
    const user = res.locals.user
    const { userId } = req.params

})

module.exports = router;
