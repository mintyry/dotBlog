const router = require('express').Router();
const { Post } = require('../../models');

//look into auth; used to ensure user is logged in to see these

//get all posts
// the 'api/posts' endpoint
router.get('/', async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});