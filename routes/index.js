const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

router.get('/', (req, res) => {
  Post.findAll()
    .then((posts) => {
      res.render('index', {
        posts: posts
      });
    })
    .catch((err) => console.log(err));
  });

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then((user) => {
      if (user) {
        if (user.validPassword(req.body.password)) {
          req.session.user = user.dataValues;
          res.redirect('/dashboard');
        } else {
          console.log('Incorrect Password');
        }
      } else {
        console.log('Username does not exist');
      }
    })
    .catch((err) => console.log(err));
});

router.post('/signup', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then((user) => {
      req.session.user = user.dataValues;
      res.redirect('/dashboard');
    })
    .catch((err) => console.log(err));
});

router.get('/logout', (req, res) => {
  req.session.user = false;
  res.redirect('/');
});

router.get('/posts/:id/:title', (req, res) => {
  Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then((post) => {
      res.render('post', {
        post: post
      });
    })
    .catch((err) => console.log(err));
});

router.post('/posts/:id/comment', (req, res) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      post
        .createComment({
        user_id: req.session.user.id,
        content: req.body.content
      })
        .then(() => {
          res.redirect(`/posts/${req.params.id}/${req.params.title}`);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;