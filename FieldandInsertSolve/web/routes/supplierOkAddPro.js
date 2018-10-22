var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');


/* GET home page. */
router.post('/', function(req, res, next) {
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
				//console.log("customData");
				//console.log(customData);

					var supplierData;
					pool.query('select * from supplier', function(err, results) {       
						if (err) {
							supplierData=[];
						}else{
							supplierData=results;
						}
					//console.log("supplierData");
					//console.log(supplierData);
					
						var suporddetailData;
						pool.query('select * from suporddetail', function(err, results) {       
							if (err) {
								suporddetailData=[];
							}else{
								suporddetailData=results;
							}
						//console.log("suporddetailData");
						//console.log(suporddetailData);
						
							var yetpendordData;
							pool.query('select * from yetpendord', function(err, results) {       
								if (err) {
									yetpendordData=[];
								}else{
									yetpendordData=results;
								}
							console.log("yetpendordData");
							console.log(yetpendordData);
							
								var okpendordData;
								pool.query('select * from okpendord', function(err, results) {       
									if (err) {
										okpendordData=[];
									}else{
										okpendordData=results;
									}
									console.log("okpendordData");
									console.log(okpendordData);
									
									
									var editpendordData;
									pool.query('select * from editpendord', function(err, results) {       
										if (err) {
											editpendordData=[];
										}else{
											editpendordData=results;
										}
									console.log("editpendordData");
									console.log(editpendordData);
									
										var editordData;
										pool.query('select * from editord', function(err, results) {       
											if (err) {
												editordData=[];
											}else{
												editordData=results;
											}
										console.log("editordData");
										console.log(editordData);

									
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
										
										
										
										var messages = req.flash('error');
										res.render('supplier', { productData:productData,orderData:orderData,orderdetailData:orderdetailData,customData:customData,supplierData:supplierData,suporddetailData:suporddetailData,yetpendordData:yetpendordData,okpendordData:okpendordData,editpendordData:editpendordData,editordData:editordData,user : req.user});    
										});			
									});			
								});

							});

						});

					});
			
				});
				
			}); 		
			
		}); 
	
	});
	
			 	
				
		
	
	

});

module.exports = router;