const router = require('express').Router();
const { User, Post, Comment } = require('../models');

//renders homepage
router.get('/', async (req, res) => {
    //get all posts
    try {
        const allPosts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'name']
                }
            ]
        });

        const posts = allPosts.map((post) => post.get({ plain: true }));
        console.log(posts)
        res.render('homepage', { posts, logged_in: req.session.logged_in });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//login
router.get('/login', (req, res) => {
    res.render('login', {});
});

//dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard', {});
});

//single post
router.get('/single-post/:id', (req, res) => {
    res.render('singlePost', {});
});


module.exports = router;