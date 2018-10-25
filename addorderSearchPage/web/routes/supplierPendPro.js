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
	var difbuttoncount=req.param("difbutton");//分辨按鈕
	var pendSupID=req.param("SupID");//供應商編號
	var inputProquantity=req.param("inputProquantity");//分配量
	var OrderDetail_Order_OrdNo=req.param("OrderDetail_Order_OrdNo");//主訂單編號
	var OrderSerNo=req.param("OrderSerNo");//各分配商品編號(按鈕)
	var pendSupplierSerNo=req.param("SupplierSerNo");//某一商品分配給供應商的編號
	var notAllowedit=req.param("notAllowedit");
	
	console.log("inputProquantity");
	console.log(difbuttoncount);//分辨按鈕
	console.log(pendSupID);//供應商編號
	console.log(inputProquantity);//分配量
	console.log(OrderDetail_Order_OrdNo);//主訂單編號
	console.log(OrderSerNo);//各分配商品編號(按鈕)
	console.log(pendSupplierSerNo);//某一商品分配給供應商的編號(表格欄位)
	console.log(notAllowedit);
	
	console.log("inputProquantity");
	
	pool.query('DELETE FROM suporddetail where OrderDetail_Order_OrdNo=?', [OrderDetail_Order_OrdNo], function(err, rows, fields) {
			
		if(!Array.isArray(pendSupplierSerNo)){
			var OrderSerNo=difbuttoncount;
			var SupplierSerNo=1;//某一商品分配給供應商的編號
			var Supplier_SupID=pendSupID;//供應商編號
			var ProQuantity=inputProquantity;//分配量
			var Allowedit=notAllowedit;//是否編輯
			
			
			console.log(SupplierSerNo);
			console.log(Supplier_SupID);
			console.log(ProQuantity);
			
			var one={Supplier_SupID,OrderDetail_Order_OrdNo,ProQuantity,OrderSerNo,SupplierSerNo,Allowedit};
				console.log("one");
				console.log(one);
				console.log("one");
			
			pool.query('INSERT INTO suporddetail SET ?', one, function(err, rows, fields) {
				if (err){
					return (err, {message: '修改失敗'});    //導向更改失敗
				}else{
					return (null, false, {message: '修改成功'});
				}
			});	
			
		}
			
		else{	
			for(var s='0';s<pendSupplierSerNo.length;s++){
				var OrderSerNo=difbuttoncount[s];
				var SupplierSerNo=[s];//某一商品分配給供應商的編號
				SupplierSerNo = parseInt(SupplierSerNo)+1;
				var Supplier_SupID=pendSupID[s];//供應商編號
				var ProQuantity=inputProquantity[s];//分配量
				var Allowedit=notAllowedit[s];//是否編輯
				
				
				console.log(SupplierSerNo);
				console.log(Supplier_SupID);
				console.log(ProQuantity);
				
				var one={Supplier_SupID,OrderDetail_Order_OrdNo,ProQuantity,OrderSerNo,SupplierSerNo,Allowedit};
					console.log("one");
					console.log(one);
					console.log("one");
				
				pool.query('INSERT INTO suporddetail SET ?', one, function(err, rows, fields) {
					if (err){
						return (err, {message: '修改失敗'});    //導向更改失敗
					}else{
						return (null, false, {message: '修改成功'});
					}
				});	
			  
			}
		}
	
	});
	var messages = req.flash('error');
	res.redirect('supplierpend');
	//res.render('supplierpend', { productData:productData,orderData:orderData,orderdetailData:orderdetailData,customData:customData,supplierData:supplierData,suporddetailData:suporddetailData,yetpendordData:yetpendordData,okpendordData:okpendordData,editpendordData:editpendordData,user : req.user});    

	

});

module.exports = router;