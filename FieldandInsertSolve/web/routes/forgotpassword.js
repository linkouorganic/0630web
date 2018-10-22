var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
	var Account=req.param('Account');
	var CusName=req.param('CusName');
	var Email=req.param('Email');
var pageErrors = req.validationErrors();
	
	
    pool.query('select * from custom where Account=? and CusName=? and Email=?', [Account, CusName, Email], function(err, rows, fields) {
        if (err){
            req.session.loginPass=false;
            req.session.Account=''; 
			req.session.CusName=''; 
			req.session.Email=''; 
            res.render('forgotpasswordForm', {});     //登入失敗		
        }else if(rows.length==0){
            req.session.loginPass=false;
            req.session.Account=''; 		
			req.session.CusName=''; 
			req.session.Email=''; 
            res.render('forgotpasswordForm', {});     //登入失敗		
        }else{	
            req.session.loginPass=true;
            req.session.Account=rows[0].Account; 	 		
			req.session.CusName=rows[0].CusName;
			req.session.Email=rows[0].Email;
            res.redirect('/updatepasswordForm');   //登入成功
        }
    });
	
	
	
	
});

module.exports = router;