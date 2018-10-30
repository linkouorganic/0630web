var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');


/* GET home page. */
router.post('/', function(req, res, next) {
							
	//取得使用者傳來的參數
	var orddetailNo=req.param("orddetailNo");//主訂單編號
	var shipment=req.param("shipment");
	
	var payment=req.param("payment");
	
	console.log("status");
	
	console.log(orddetailNo);
	console.log(shipment);
	console.log(payment);
	
	console.log("status");
	
	if(!Array.isArray(orddetailNo)){
		var Order_OrdNo=orddetailNo;
		var OrdStatus=shipment+payment;
		console.log(Order_OrdNo);
		console.log(OrdStatus);
		var one={Order_OrdNo,OrdStatus};
			console.log("one");
			console.log(one);
			console.log("one");
		pool.query('UPDATE orderdetail SET OrdStatus=? where Order_OrdNo=? ', [OrdStatus, Order_OrdNo], function(err, rows, fields) {

		});
	}
	
	
	else{
		for(var s='0';s<orddetailNo.length;s++){
			var Order_OrdNo=orddetailNo[s];
			var OrdStatus=shipment+payment;
			console.log(Order_OrdNo);
			console.log(OrdStatus);
			var one={Order_OrdNo,OrdStatus};
				console.log("one");
				console.log(one);
				console.log("one");
			pool.query('UPDATE orderdetail SET OrdStatus=? where Order_OrdNo=? ', [OrdStatus, Order_OrdNo], function(err, rows, fields) {
				
			});
		}
	}

	res.redirect('back');
	//res.render('supplierstatus', {productData:productData,orderData:orderData,orderdetailData:orderdetailData,customData:customData,supplierData:supplierData,suporddetailData:suporddetailData,yetpendordData:yetpendordData,okpendordData:okpendordData,editpendordData:editpendordData,orddetailstatusData:orddetailstatusData,user : req.user});    

	
});										

module.exports = router;