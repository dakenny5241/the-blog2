const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('users', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

User.prototype.validPassword = function(password) {
  return this.password === password;
};

module.exports = User;