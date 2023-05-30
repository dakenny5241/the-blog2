const Sequelize = require('sequelize');
const db = require('../config/database');

const Comment = db.define('comments', {
  content: {
    type: Sequelize.TEXT
  }
});

Comment.belongsTo(User);
Comment.belongsTo(Post);

module.exports = Comment;