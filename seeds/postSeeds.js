const { Post } = require('../models');

const postData =
[
  {
    "title": "It's Thanksgiving",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "date_created": "1/1/2023",
    "user_id": 1
  },
  {
    "title": "This is a seeded post",
    "content": "Et consequatur nobis in dolorum recusandae est omnis laudantium. Non quia nulla et illo perspiciatis et voluptas quia id aperiam ratione non maiores autem. ",
    "date_created": "1/2/2023",
    "user_id": 2
  },
  {
    "title": "Inception is related to The Matrix",
    "content": "There is a bronze marker placed by the Multnomah Chapter of the Daughters of the American Revolution on May 12, 1939.",
    "date_created": "1/3/2023",
    "user_id": 3
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
