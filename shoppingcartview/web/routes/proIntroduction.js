var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//----------------
// 引用db.js
//----------------
var pool = require('./lib/db.js');
/* GET home page. */

router.get('/', function(req, res, next) {
    var ProId=req.param('proNo');

	pool.query('select * from product where ProId=?', [ProId], function(err, rows, fields) {
		if (err) throw err;

		if(rows.length==0){
			res.render('noproductdata', {user : req.user});         
		}else{
			res.render('proIntroduction', { data: rows ,user : req.user});   
		}		
	});
});

module.exports = router;