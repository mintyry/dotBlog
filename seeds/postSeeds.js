const { Post } = require('../models');

const postData =
[
  {
    "title": "It's Thanksgiving",
    "content": "I am coding on Thanksgiving, lol.",
    "date_created": "1/1/23",
    "user_id": 1
  },
  {
    "title": "This is a seeded post",
    "content": "This wasn't dynamically made by anyone!",
    "date_created": "1/2/23",
    "user_id": 2
  },
  {
    "title": "Inception is related to The Matrix",
    "content": "This is all a dream.",
    "date_created": "1/3/23",
    "user_id": 3
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
