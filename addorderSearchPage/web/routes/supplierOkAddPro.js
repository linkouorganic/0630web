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
	
	var ordNo=req.param("ordNo");//主訂單編號
	
	var noAllowedit=req.param("Allowedit");
	
	console.log("okinputProquantity");
	
	console.log(ordNo);//某一商品分配給供應商的編號(表格欄位)
	console.log(noAllowedit);
	console.log(ordNo.length);
	console.log(Array.isArray(ordNo));
	console.log("okinputProquantity");
	
	
	if(!Array.isArray(ordNo)){
	
			var Order_OrdNo=ordNo;//主訂單編號											
			var Allowedit=noAllowedit;
			
			
			console.log("test1");
			console.log(Order_OrdNo);
			console.log("test1");
			
			pool.query('UPDATE orderdetail SET Allowedit=? where Order_OrdNo=?', [Allowedit, Order_OrdNo], function(err, rows, fields) {
				if (err){
					return (err, {message: '修改失敗'});    //導向更改失敗
				}else{
					return (null, false, {message: '修改成功'});
				}
			});
		  
	
	
	}
	else{
	for(var s='0';s<ordNo.length;s++){
			var Order_OrdNo=ordNo[s];//主訂單編號											
			var Allowedit=noAllowedit;
			
			var test={Order_OrdNo,Allowedit};
			console.log("test");
			console.log(test);
			console.log("test");
			
			pool.query('UPDATE orderdetail SET Allowedit=? where Order_OrdNo=?', [Allowedit, Order_OrdNo], function(err, rows, fields) {
				if (err){
					return (err, {message: '修改失敗'});    //導向更改失敗
				}else{
					return (null, false, {message: '修改成功'});
				}
			});
		  
	}
	}



	res.redirect('supplier');
	//res.render('supplier', { productData:productData,orderData:orderData,orderdetailData:orderdetailData,customData:customData,supplierData:supplierData,suporddetailData:suporddetailData,yetpendordData:yetpendordData,okpendordData:okpendordData,editpendordData:editpendordData,editordData:editordData,user : req.user});    

});

module.exports = router;