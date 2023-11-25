const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// !! look into auth; used to ensure user is logged in to see these
// !! need to have update method


// the 'api/posts' endpoint

//get 1 post
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
//above route works

//create a new post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//update post
// router.put('/:id', async (req, res) => {
//     try {
//        const updatePost = await Post.update(req.body, 
//         {
//             where: {
//                 id: req.params.id
//             }
//         });

//         if(!updatePost[0])
//     } catch (error) {
        
//     }
// })

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
            res.status(404).json({message: 'Can\'t delete something that doesn\'t exist.'});
            return;
        };
        res.status(200).json(deletePost);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };
});

module.exports = router;