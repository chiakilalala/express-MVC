var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

//Router
var indexRouter = require('./routes/index');
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


app.use('/index', indexRouter);
app.use(postRouter);
app.use('/users', usersRouter);


// app.use(function (req, res, next) {
//   res.status(404).send('抱歉，您的頁面找不到');
//   console.log(req, res)
// })

// app.use(function (err, req, res, next) {
//   res.status(500).send('程式有些問題，請稍後嘗試');
// })

module.exports = app;
