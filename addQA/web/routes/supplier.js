var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
	var productData;
	pool.query('select * from product', function(err, results) {       
	
        if (err) {
            productData=[];
        }else{
            productData=results;
        }
		res.render('supplier', {productData:productData});        
    }); 
	

});

module.exports = router;
