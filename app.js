var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const dotenv =require('dotenv');
dotenv.config({path: './config.env'});
const resError =require('./service/errorhandle');
console.log(process.env.NODE_ENV)
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

app.use(function(err,req,res,next){
  //開發環境dev
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'dev') {
    console.error(err);
     return resError.resErrDev(err,res)
  } 
  //營運環境 Pro
  if (err.name === 'ValidationError') {
    err.message ='資料欄位未填寫正確，請重新輸入！';
    err.isOperational = true;
    return resError.resErrProd(err,res);
  } 
  resError.resErrProd(err,res);
})


// 未捕捉到的 catch 
process.on('unhandledRejection', (err, promise) => {
  console.error('未捕捉到的 rejection：', promise, '! 原因：', err);
});
process.on('uncaughtException', err => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
	console.error('Uncaughted Exception！')
	console.error(err);
	process.exit(1);
});

module.exports = app;
