var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// updateCustom

router.get('/updatecustom', function(req, res, next) {
	var messages = req.flash('error');
  res.render('updatecustom',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});

  
});

router.post('/updatecustom', passport.authenticate('local-updatecustom',{
	successRedirect : '/index', // redirect to the secure profile section
	failureRedirect : '/profile', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));
// =====================================
// PROFILE SECTION =========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
	var messages = req.flash('error');
	res.render('profile.ejs', {
		csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0,user : req.user // get the user out of session and pass to template
	});
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
   next();
});


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


	
module.exports = router;

// route middleware to make sure
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
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


