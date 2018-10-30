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
				
					var customData;
					pool.query('select * from custom', function(err, results) {       
						if (err) {
							customData=[];
						}else{
							customData=results;
						}
					console.log("customData");
					console.log(customData);
			
			
					var messages = req.flash('error');
					res.render('profilesupplier.ejs', {customData:customData,orddetailstatusData:orddetailstatusData,csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0,user : req.user,orderData:orderData,orderdetailData:orderdetailData,productData:productData});
					});
				
				});
				
			});
		
		
		});
	
	
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
