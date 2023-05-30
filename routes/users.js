const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');
const upload = multer({});

router.get('/dashboard', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user.id
    }
  })
    .then((posts) => {
      res.render('dashboard', {
        posts: posts
      });
    })
    .catch((err) => console.log(err));
});

router.post('/add', upload.fields([]), (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user.id
  })
    .then(() => {
      res.redirect('/users/dashboard');
    })
    .catch((err) => console.log(err));
});

router.post('/update/:id', upload.fields([]), (req, res) => {
  Post.update(
    {
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((post) => {
      res.redirect('/users/dashboard');
    })
    .catch((err) => console.log(err));
});

router.post('/delete/:id', upload.fields([]), (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((post) => {
      res.redirect('/users/dashboard');
    })
    .catch((err) => console.log(err));
});

module.exports = router;