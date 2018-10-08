var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
	var userid=req.param('userid');
	var username=req.param('username');
	
	
    pool.query('select * from user where userid=? and username=? ', [userid, username], function(err, rows, fields) {
        if (err){
            req.session.loginPass=false;
            req.session.userid=''; 
			req.session.username=''; 
            res.render('forgotsupplierpasswordForm', {});     //登入失敗		
        }else if(rows.length==0){
            req.session.loginPass=false;
            req.session.userid=''; 		
			req.session.CusName=''; 
            res.render('forgotsupplierpasswordForm', {});     //登入失敗		
        }else{	
            req.session.loginPass=true;
            req.session.userid=rows[0].userid; 	 		
			req.session.username=rows[0].username;
            res.redirect('/updatesupplierpasswordForm');   //登入成功
        }
    });
	
	
	
	
});

module.exports = router;