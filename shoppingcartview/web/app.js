var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var adminpassport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var moment = require('moment');
//---------------------------------------------------------
// 增加以下的require
//---------------------------------------------------------

//靜態網頁
var contact = require('./routes/contact');
var certification = require('./routes/certification');
var distributors = require('./routes/distributors');
var about = require('./routes/about');
var about_yulin = require('./routes/about_yulin');
var about_chouhao = require('./routes/about_chouhao');
var about_chiyuchi = require('./routes/about_chiyuchi');
var about_yabao = require('./routes/about_yabao');
var mv = require('./routes/mv');
var proIntroduction = require('./routes/proIntroduction');
//供應商
var profilesupplier = require('./routes/profilesupplier');
var supplier = require('./routes/supplier');//訂單清單
var supplierordedit = require('./routes/supplierordedit');//訂單編輯
var supplierstatus = require('./routes/supplierstatus');//訂單狀況
var supplierpend = require('./routes/supplierpend');//分配訂單
var supplierpendedit = require('./routes/supplierpendedit');//分配訂單編輯
var supplieruser = require('./routes/supplieruser');
//供應商各家負責人新增產品
var supplierAddPro = require('./routes/supplierAddPro');
var supplierOkAddPro = require('./routes/supplierOkAddPro');
//供應商各家負責人編輯訂單
var supplierEditPro = require('./routes/supplierEditPro');
//供應商各家負責人分配產品
var supplierPendPro = require('./routes/supplierPendPro');
var supplierOkPendPro = require('./routes/supplierOkPendPro');
//供應商各家負責人分配產品編輯
var supplierPendEditPro = require('./routes/supplierPendEditPro');
//供應商各家負責人訂單狀況
var supplierUpdateStatus = require('./routes/supplierUpdateStatus');
//一般會員忘記密碼
var forgotpassword = require('./routes/forgotpassword');
var forgotpasswordForm = require('./routes/forgotpasswordForm');
var updatepassword = require('./routes/updatepassword');
var updatepasswordForm = require('./routes/updatepasswordForm');
//供應商忘記密碼
var forgotsupplierpassword = require('./routes/forgotsupplierpassword');
var forgotsupplierpasswordForm = require('./routes/forgotsupplierpasswordForm');
var updatesupplierpassword = require('./routes/updatesupplierpassword');
var updatesupplierpasswordForm = require('./routes/updatesupplierpasswordForm');
//產品
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
//購物車
var shoppingcart = require('./routes/shoppingcart');


var index = require('./routes/index');
var users = require('./routes/users');





var app = express();
require('./config/passport');
require('./config/passportsupplier');

//-----------------------------------------
// 增加使用session及uuid
//-----------------------------------------

var uuid=require('uuid');

app.use(session({
    genid:function(req){
        return uuid.v1();
    },
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
}));
//-----------------------------------------
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
app.use(adminpassport.initialize());
app.use(adminpassport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});


//--------------------------------------------
// 增加以下的app.use()
//--------------------------------------------
//靜態網頁
app.use('/contact', contact);
app.use('/certification', certification);
app.use('/distributors', distributors);
app.use('/about', about);
app.use('/about_yulin', about_yulin);
app.use('/about_chouhao', about_chouhao);
app.use('/about_chiyuchi', about_chiyuchi);
app.use('/about_yabao', about_yabao);
app.use('/mv', mv);
app.use('/proIntroduction', proIntroduction);
//供應商
app.use('/profilesupplier', profilesupplier);
app.use('/supplier', supplier);//訂單清單
app.use('/supplierordedit', supplierordedit);//訂單編輯
app.use('/supplierstatus', supplierstatus);//訂單狀況
app.use('/supplierpend', supplierpend);//分配訂單
app.use('/supplierpendedit', supplierpendedit);//分配訂單編輯
//供應商分配
app.use('/supplieruser', supplieruser);
//供應商各家負責人新增產品
app.use('/supplierAddPro', supplierAddPro);
app.use('/supplierOkAddPro', supplierOkAddPro);
//供應商各家負責人編輯產品
app.use('/supplierEditPro', supplierEditPro);
//供應商各家負責人分配產品
app.use('/supplierPendPro', supplierPendPro);
app.use('/supplierOkPendPro', supplierOkPendPro);
//供應商各家負責人分配產品編輯
app.use('/supplierPendEditPro', supplierPendEditPro);
//供應商各家負責人訂單狀況
app.use('/supplierUpdateStatus', supplierUpdateStatus);
//一般會員忘記密碼
app.use('/forgotpassword', forgotpassword);
app.use('/forgotpasswordForm', forgotpasswordForm);
app.use('/updatepassword', updatepassword);
app.use('/updatepasswordForm', updatepasswordForm);
//供應商忘記密碼
app.use('/forgotsupplierpassword', forgotsupplierpassword);
app.use('/forgotsupplierpasswordForm', forgotsupplierpasswordForm);
app.use('/updatesupplierpassword', updatesupplierpassword);
app.use('/updatesupplierpasswordForm', updatesupplierpasswordForm);
//產品
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
//購物車
app.use('/shoppingcart', shoppingcart);

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

app.locals.myDateFormat = function(date){
    return moment(date).format('YYYY-MM-DD');
};


module.exports = app;
