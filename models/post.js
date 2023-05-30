const Sequelize = require('sequelize');
const db = require('../config/database');

const Post = db.define('posts', {
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  }
});

Post.belongsTo(User);
Post.hasMany(Comment);

module.exports = Post;