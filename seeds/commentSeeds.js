const { Comment } = require('../models');

const commentData =
[
  {

    "content": "Woohoo!",
    "date_created": "3/3/23",
    "user_id": 1,
    "post_id": 1
  },
  {
    "content": "We must cancel this person.",
    "date_created": "1/3/23",
    "user_id": 2,
    "post_id": 2
  },
  {
    "content": "Am i dreaming?",
    "date_created": "6/3/23",
    "user_id": 3,
    "post_id": 3
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;