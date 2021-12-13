const express = require('express')
const Posts = require('../schemas/posts')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')
const multer = require('multer')

// 이미지파일 처리
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`)
        },
        fileFilter: function (req, file, cb) {
            const ext = path.extname(file.originalname)
            if (ext !== '.gif' || ext !== '.png' || ext !== '.jpg' || ext !== '.jpeg') {
                return cb(res.status(400).end('잘못된 파일 형식입니다.'), false)
            }
            cb(null, true)
        },
    }),
})
const router = express.Router()

// 메인페이지 모든 포스팅 보여주기
router.get('/post', async (req, res) => {
    const Post = await Posts.find({}).sort('-postId')
    res.json(Post)
})

// 포스팅 게시
router.post('/post', authMiddleware, upload.single('img'), async (req, res) => {
    console.log(req.file)
    const { userId, userName } = res.locals.user
    const { content } = req.body
    const createAt = new Date(+new Date() + 3240 * 10000)
        .toISOString()
        .replace('T', ' ')
        .replace(/\..*/, '')
    let img = req.file.location
    console.log('img_url' + img)
    let postId = await Posts.find({}).sort('-postId').limit(1)
    if (postId.length == 0) {
        postId = 1
    } // 검색결과가 없으면 postId를 1로 설정
    else {
        postId = postId[0]['postId'] + 1
    } //검색결과가 있으면 결과의 postId + 1 로 설정
    await Posts.create({
        postId,
        userId,
        userName,
        img,
        content,
        createAt,
    })

    res.send({ result: 'success' })
})
// 게시글 수정페이지 로딩
router.get('/modify/:postId', authMiddleware, async (req, res) => {
    const { postId } = req.params
    const post = await Posts.findOne({ postId: postId })

    res.json({ post })
})

router.get("/modify/:postId", async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await Posts.findOne({ postId }).exec();
        res.json({ post });
    } catch (error) {
        res.render("error");
    }
});
// 게시글 수정
router.put(
    '/modify/:postId',
    authMiddleware,
    upload.single('img'),
    async (req, res, next) => {
        try {
            const { userId } = res.locals.user
            const { content } = req.body
            const { postId } = req.params
            let img = req.file.location

            const existId = await Posts.findOne({ postId, userId })
            if (existId.length !== 0) {
                await Posts.updateOne(
                    { postId },
                    {
                        $set: {
                            postId,
                            userId,
                            userName,
                            content,
                            img,
                            createAt: existId.createAt,
                        },
                    }
                )
                res.send({ result: 'success' })
            }
        } catch (err) {
            console.error(err)
            res.status(400).send({
                errorMessage: err,
            })
        }
    }
)

// 게시글 삭제하기
router.delete('/post/:postId', authMiddleware, async (req, res) => {
    try {
        const { postId } = req.params
        const { userId } = res.locals.user
        const postsExist = await Posts.findOne({ postId, userId })
        const commentsExist = await Comments.findOne({ postId })

        if (postsExist && commentsExist) {
            await Comments.deleteMany({ postId })
            await Posts.deleteOne({ postId })
            res.send({ result: 'success' })
        } else if (postsExist) {
            await Posts.deleteOne({ postId })
            res.send({ result: 'success' })
        } else {
            res.send({ result: 'fail' })
        }
    } catch (err) { }
})
module.exports = router
