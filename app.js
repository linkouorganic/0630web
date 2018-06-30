var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');

//---------------------------------------------------------
// 增加以下的require
//---------------------------------------------------------
//var product = require('./routes/product');
var contact = require('./routes/contact');
var certification = require('./routes/certification');
var distributors = require('./routes/distributors');
var about = require('./routes/about');
var about_yulin = require('./routes/about_yulin');
var about_chouhao = require('./routes/about_chouhao');
var about_chiyuchi = require('./routes/about_chiyuchi');
var about_yabao = require('./routes/about_yabao');
var mv = require('./routes/mv');
var productListByPage = require('./routes/productListByPage');
var productSearchByName = require('./routes/productSearchByName');
var productListByPageSummer = require('./routes/productListByPageSummer');
var productSearchByNameSummer = require('./routes/productSearchByNameSummer');
var productListByPageFall = require('./routes/productListByPageFall');
var productSearchByNameFall = require('./routes/productSearchByNameFall');
var productListByPageWinter = require('./routes/productListByPageWinter');
var productSearchByNameWinter = require('./routes/productSearchByNameWinter');
var productListByPageBud = require('./routes/productListByPageBud');
var productSearchByNameBud = require('./routes/productSearchByNameBud');
var index = require('./routes/index');
var users = require('./routes/users');





var app = express();
require('./config/passport');

//-----------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({secret: 'mysupersecret', resave: false , saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});
//--------------------------------------------
// 增加以下的app.use()
//--------------------------------------------
//app.use('/product', product);
app.use('/contact', contact);
app.use('/certification', certification);
app.use('/distributors', distributors);
app.use('/about', about);
app.use('/about_yulin', about_yulin);
app.use('/about_chouhao', about_chouhao);
app.use('/about_chiyuchi', about_chiyuchi);
app.use('/about_yabao', about_yabao);
app.use('/mv', mv);
app.use('/productListByPage', productListByPage);
app.use('/productSearchByName', productSearchByName);
app.use('/productListByPageSummer', productListByPageSummer);
app.use('/productSearchByNameSummer', productSearchByNameSummer);
app.use('/productListByPageFall', productListByPageFall);
app.use('/productSearchByNameFall', productSearchByNameFall);
app.use('/productListByPageWinter', productListByPageWinter);
app.use('/productSearchByNameWinter', productSearchByNameWinter);
app.use('/productListByPageBud', productListByPageBud);
app.use('/productSearchByNameBud', productSearchByNameBud);


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
