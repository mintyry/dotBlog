const { User } = require('../models');

const userData =
  [
    {
      "name": "Ryan",
      "email": "Ryan@nomail.com",
      "password": "123Password$"
    },
    {
      "name": "Nike",
      "email": "sweetlove@nomail.com",
      "password": "123Password$"
    },
    {
      "name": "Bulba",
      "email": "bulbasaur@nomail.com",
      "password": "151Password$"
    }
  ];

  const seedUsers = () => User.bulkCreate(userData);

  module.exports = seedUsers;