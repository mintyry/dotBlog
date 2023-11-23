const router = require('express').Router();
const { User, Post } = require('../../models');

//api/users endpoint
router.get('/', async (req, res) => {
    //find all users
    try {
        const userData = User.findAll();
        res.status(200).json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})