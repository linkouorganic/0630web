var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');
/* GET home page. */
router.get('/', isLoggedIn,function(req, res, next) {
	//產品名稱選單列
	var productData;
	pool.query('select * from product', function(err, results) {       
        if (err) {
            productData=[];
        }else{
            productData=results;
        }
		
    //console.log("productData");
	//console.log(productData);
	
		//訂單列表order資料表
		var orderData;
		pool.query('select * from mydb.`order`', function(err, results) {       
			if (err) {
				orderData=[];
			}else{
				orderData=results;
			}
		//console.log("orderData");
		//console.log(orderData);

			var orderdetailData;
			pool.query('select * from orderdetail', function(err, results) {       
				if (err) {
					orderdetailData=[];
				}else{
					orderdetailData=results;
				}
			//console.log("orderdetailData");
			//console.log(orderdetailData);

			
				var customData;
				pool.query('select * from custom', function(err, results) {       
					if (err) {
						customData=[];
					}else{
						customData=results;
					}
				console.log("customData");
				console.log(customData);


					res.render('supplier', {productData:productData,orderData:orderData,orderdetailData:orderdetailData,customData:customData,user : req.user});    
				});
			
			
				//res.render('supplier', {productData:productData,orderData:orderData,orderdetailData:orderdetailData,user : req.user});    
			}); 
		
		//SELECT * FROM mydb.orderdetail,mydb.`order` where orderdetail.Order_OrdNo = `order`.OrdNo
		
		
			
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