var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

//session会话存储
var session = require('express-session');//session使用
//引入 flash 模块来实现页面通知
var flash = require('connect-flash');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());//定义使用 flash 功能

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//提供session支持
app.use(session({
  secret: 'chat',//secret 用来防止篡改 cookie
  key: 'chat',//cookie name
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24}//1 day
}));

// 视图交互：实现用户不同登陆状态下显示不同的页面及显示登陆注册等时的成功和错误等提示信息
app.use(function(req, res, next){
  console.log("app.usr local");
  //res.locals.xxx实现xxx变量全局化，在其他页面直接访问变量名即可
  //访问session数据：用户信息
  res.locals.user = req.session.user;
  //获取要显示错误信息
  var error = req.flash('error');//获取flash中存储的error信息
  res.locals.error = error.length ? error : null;
  //获取要显示成功信息
  var success = req.flash('success');
  res.locals.success = success.length ? success : null;
  next();//控制权转移，继续执行下一个app。use()
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
