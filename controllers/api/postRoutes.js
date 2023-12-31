const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// the 'api/posts' endpoint

// get 1 post
router.get('/:id', async (req, res) => {
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
                        include: [{
                            model: User,
                            attributes: ['name']
                        }]
                    },
                ]
            });
        res.status(200).json(onePost);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//make new post
router.post('/', async (req, res) => {

    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create post' });
    }
});

//update post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update(req.body,
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            }
        );

        if (!updatePost) {
            res.status(404).json(
                {
                    message: 'Post does not exist, therefore cannot be updated.'
                }
            );
            return;
        };

        res.status(200).json(updatePost);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

//delete post
router.delete('/:id', async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id,
                //to ensure the user who made this is the only one who can delete it
                user_id: req.session.user_id
            }
        });

        if (!deletePost) {
            res.status(404).json({ message: 'Can\'t delete something that doesn\'t exist.' });
            return;
        };
        res.status(200).json(deletePost);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };
});

module.exports = router;