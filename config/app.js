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
