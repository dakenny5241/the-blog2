const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const db = new Sequelize('dbname', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const handlebars = require('express-handlebars');
const hbs = handlebars.create({ /* config */ });

// Configure the session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    })
  );
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set engine for view files
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Set the folder where the views files are
app.set('views', path.join(__dirname, 'views'));