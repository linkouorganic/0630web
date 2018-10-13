var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var adminpassport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var csrfProtection = csrf();
router.use(csrfProtection);
var pool = require('./lib/db.js');

/* GET home page. */
router.get('/', isLoggedIn, function(req, res) {
	console.log("--xxxss-------------login--------");
	var messages = req.flash('error');
	console.log("----------profulesupplier-----login--------");
	console.log(req.user);
	console.log("---------------login--------");
	res.render('profilesupplier.ejs', {
		csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0,user : req.user // get the user out of session and pass to template
	});
});

module.exports = router;

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
