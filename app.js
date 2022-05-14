var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

//Router
var postRouter = require('./routes/post');
var usersRouter = require('./routes/users');


var app = express();

require('./connection');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/posts', postRouter);
app.use('/users', usersRouter);

module.exports = app;
