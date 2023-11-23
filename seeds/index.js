const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userSeeds = require('./user-seeds');
const postSeeds = require('./post-seeds');
const commentSeeds = require('./comment-seeds');


