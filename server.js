const express = require('express');
const app = express();
const createError = require('http-errors');

app.get('/', (req, res, next) => {
  res.render('index', { title: 'My Blog' });
});

app.get('/login', (req, res, next) => {
  res.render('login', { title: 'My Blog - Login' });
});

app.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'My Blog - Sign Up' });
});

app.get('/dashboard', (req, res, next) => {
  res.render('dashboard', { title: 'My Blog - Dashboard' });
});

app.get('/posts/:id', (req, res, next) => {
  res.render('post', { title: 'My Blog - Post' });
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('My Blog app listening on port 3000!');
});