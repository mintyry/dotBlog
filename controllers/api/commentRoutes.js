const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// the '/api/comments' endpoint

//find a comment
// router.get('/:id', async (req, res) => {
//     try {
//         const oneComment = await Comment.findByPk(req.params.id,
//             {
//                 include: [Post, User]
//             });

//         if (!oneComment) {
//             res.status(404).json({ message: 'No comment.' });
//             return;
//         };

//         res.status(200).json(oneComment);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     };
// });

//create a comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;