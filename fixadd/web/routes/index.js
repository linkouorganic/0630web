var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var adminpassport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var csrfProtection = csrf();
router.use(csrfProtection);
var pool = require('./lib/db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    var imagechangeData;
	pool.query('select * from imagechange', function(err, results) {       
		if (err) {
			imagechangeData=[];
		}else{
			imagechangeData=results;
		}
	console.log("imagechangeData");
	console.log(imagechangeData);

	var messages = req.flash('error');
	res.render('index', {imagechangeData:imagechangeData,user : req.user});    
	});
});
// =====================================
// 修改供應商基本資料
// =====================================
/*router.get('/updatesupplier', isLoggedIn, function(req, res, next) {
	var messages = req.flash('error');
  res.render('updatesupplier',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});

});
*/
router.post('/updatesupplier', adminpassport.authenticate('local-updatesupplier',{
	successRedirect : '/index', // redirect to the secure profile section
	failureRedirect : '/profilesupplier', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));


// =====================================
// 修改會員基本資料
// =====================================
/*router.get('/updatecustom', isLoggedIn, function(req, res, next) {
	var messages = req.flash('error');
  res.render('updatecustom',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});

});*/

router.post('/updatecustom', passport.authenticate('local-updatecustom',{
	successRedirect : '/index', // redirect to the secure profile section
	failureRedirect : '/profile', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));


// =====================================
// PROFILE =============================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)

router.get('/profile', isLoggedIn, function(req, res) {
	
	var orderData;
	pool.query('select * from mydb.order', function(err, results) {       
		if (err) {
			orderData=[];
		}else{
			orderData=results;
		}
	console.log("orderData");
	console.log(orderData);
	
	
		var orderdetailData;
		pool.query('select * from orderdetail', function(err, results) {       
			if (err) {
				orderdetailData=[];
			}else{
				orderdetailData=results;
			}
		console.log("orderdetailData");
		console.log(orderdetailData);
		
			var productData;
			pool.query('select * from product', function(err, results) {       
				if (err) {
					productData=[];
				}else{
					productData=results;
				}
			console.log("productData");
			console.log(productData);
			
				var orddetailstatusData;
				pool.query('SELECT DISTINCT Order_OrdNo,OrdStatus FROM mydb.orderdetail', function(err, results) {       
					if (err) {
						orddetailstatusData=[];
					}else{
						orddetailstatusData=results;
					}
				console.log("orddetailstatusData");
				console.log(orddetailstatusData);
			
				
				var messages = req.flash('error');
				res.render('profile.ejs', {orddetailstatusData:orddetailstatusData,csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0,user : req.user,orderData:orderData,orderdetailData:orderdetailData,productData:productData});
				});
			});
		
		
		});
	
	
	});
	
	
});

// =====================================
// LOGOUT ==============================
// =====================================

router.get('/logout', isLoggedIn, function (req, res, next) {
	req.logout();
	req.session.destroy();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
   next();
});

// =====================================
// SIGNUP ==============================
// =====================================

router.get('/signup', function(req, res, next) {
	var messages = req.flash('error');
  res.render('signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local-signup',{
	successRedirect : '/profile', // redirect to the secure profile section
	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));


// =====================================
// LOGIN ===============================
// =====================================
// show the login form

router.get('/login', function (req, res, next) {
    var messages = req.flash('error');
    res.render('login', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

// process the login form
router.post('/login', passport.authenticate('local-login',{
	successRedirect : '/profile', // redirect to the secure profile section
	failureRedirect : '/login', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

// =====================================
// SIGNUP-SUPPLIER =======================
// =====================================

router.get('/signupsupplier', function(req, res, next) {
	var messages = req.flash('error');
	var supplierData;
	pool.query('select * from supplier', function(err, results) {       
	
        if (err) {
            supplierData=[];
        }else{
            supplierData=results;
        }
		res.render('signupsupplier', {supplierData:supplierData, csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});        
    }); 
});

router.post('/signupsupplier', adminpassport.authenticate('local-signupsupplier',{
	successRedirect : '/profilesupplier', // redirect to the secure profile section
	failureRedirect : '/signupsupplier', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

// =====================================
// PROFILESupplier =============================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
/*router.get('/profilesupplier', isLoggedIn, function(req, res) {
	var messages = req.flash('error');
	console.log("--------xxx-------login--------");
	console.log(req.supplier);
	console.log("------xxx---------login--------");
	res.render('profilesupplier', {
		csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0,supplier : req.supplier // get the user out of session and pass to template
	});
});*/


// =====================================
// LOGIN-Supplier ======================
// =====================================
// show the login form

router.get('/loginsupplier', function (req, res, next) {
    var messages = req.flash('error');
    res.render('loginsupplier', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

// process the login form
router.post('/loginsupplier', adminpassport.authenticate('local-loginsupplier',{
	successRedirect : '/profilesupplier', // redirect to the secure profile section
	failureRedirect : '/loginsupplier', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));
	


	
module.exports = router;

// route middleware to make sure
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
		console.log("---------------login--------");
		console.log(req.isAuthenticated);
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

