const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

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
        res.render('homepage', { posts, logged_in: req.session.logged_in });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//login
router.get('/login', (req, res) => {
    //if user is already logged in, they just get redirected to dashboard
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    };

    res.render('login');
});

//dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name']
                }
            ]
        });

        const posts = allPosts.map((post) => post.get({ plain: true }));

        res.render('dashboard', { posts, logged_in: req.session.logged_in });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };
});

//renders single post with relative user and comment info
router.get('/singlePost/:id', withAuth, async (req, res) => {

    try {
        const onePost = await Post.findByPk(req.params.id,
            {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'name']
                    },
                    {
                        model: Comment,
                        attributes: ['id', 'content', 'date_created'],
                        include: [
                            {
                                model: User,
                                attributes: ['name']
                            }
                        ]
                    },
                ]
            });

        const singlePost = onePost.get({ plain: true });
        
        //making singlePost variable, logged_in, and currenId available in singlePost.handelbars
        res.render('singlePost', { singlePost, logged_in: req.session.logged_in, currentId: req.session.user_id });

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'why wont this page load?'});
    }
});

module.exports = router;