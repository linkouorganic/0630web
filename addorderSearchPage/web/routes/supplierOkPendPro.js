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
	
	var Ok_Order_OrdNo=req.param("Ok_Order_OrdNo");//主訂單編號
	
	var noAllowedit=req.param("Allowedit");
	
	console.log("okinputProquantity");
	
	console.log(Ok_Order_OrdNo);
	console.log(noAllowedit);
	
	console.log("okinputProquantity");
	if(!Array.isArray(Ok_Order_OrdNo)){
		var OrderDetail_Order_OrdNo=Ok_Order_OrdNo;//主訂單編號											
		var Allowedit=noAllowedit;
		
		pool.query('UPDATE suporddetail SET Allowedit=? where OrderDetail_Order_OrdNo=?', [Allowedit, OrderDetail_Order_OrdNo], function(err, rows, fields) {
			if (err){
				return (err, {message: '修改失敗'});    //導向更改失敗
			}else{
				return (null, false, {message: '修改成功'});
			}
		});
	}
	
	
	else{
		for(var s='0';s<Ok_Order_OrdNo.length;s++){
			var OrderDetail_Order_OrdNo=Ok_Order_OrdNo[s];//主訂單編號											
			var Allowedit=noAllowedit[s];
			
			pool.query('UPDATE suporddetail SET Allowedit=? where OrderDetail_Order_OrdNo=?', [Allowedit, OrderDetail_Order_OrdNo], function(err, rows, fields) {
				if (err){
					return (err, {message: '修改失敗'});    //導向更改失敗
				}else{
					return (null, false, {message: '修改成功'});
				}
			});
		  
		}
	}
	
	res.redirect('supplierpend');
	//res.render('supplierpend', { productData:productData,orderData:orderData,orderdetailData:orderdetailData,customData:customData,supplierData:supplierData,suporddetailData:suporddetailData,yetpendordData:yetpendordData,okpendordData:okpendordData,editpendordData:editpendordData,user : req.user});    
			
						

});

module.exports = router;