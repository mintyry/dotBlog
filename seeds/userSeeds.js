const { User } = require('../models');

const userData =
  [
    {
      "name": "Ryan",
      "email": "Ryan@nomail.com",
      "password": "123pw"
    },
    {
      "name": "Nike",
      "email": "sweetlove@nomail.com",
      "password": "123pw"
    },
    {
      "name": "Bulba",
      "email": "bulbasaur@nomail.com",
      "password": "151pw"
    }
  ];

  const seedUsers = () => User.bulkCreate(userData);

  module.exports = seedUsers;