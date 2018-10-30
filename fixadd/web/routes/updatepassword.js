var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
	var Account=req.param('Account');
	var CusName=req.param('CusName');
	var Email=req.param('Email');
	var Password=req.param('Password');

	console.log(Account+CusName+Email+Password);
	Password = bcrypt.hashSync(Password, null, null);
	console.log(Password);
	
	pool.query('UPDATE custom SET Password=? where Account=? and CusName=? and Email=?', [Password, Account, CusName, Email], function(err, rows, fields) {
				console.log(err);
				if (err){						
					return (err);    //導向更改失敗頁面
				}else{
					res.redirect('/');  //導向更改成功頁面
				}	
			});

   
	
	
	
	
});

module.exports = router;