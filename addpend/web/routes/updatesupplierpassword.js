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
	var userid=req.param('userid');
	var username=req.param('username');
	var userpassword=req.param('userpassword');

	console.log(userid+username+userpassword);
	userpassword = bcrypt.hashSync(userpassword, null, null);
	console.log(userpassword);
	
	pool.query('UPDATE user SET userpassword=? where userid=? and username=?', [userpassword, userid, username], function(err, rows, fields) {
				console.log(err);
				if (err){						
					return (err);    //導向更改失敗頁面
				}else{
					res.redirect('/');  //導向更改成功頁面
				}	
			});

   
	
	
	
	
});

module.exports = router;