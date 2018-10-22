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
									
									
										var orddetailstatusData;
										pool.query('SELECT DISTINCT Order_OrdNo,OrdStatus FROM mydb.orderdetail', function(err, results) {       
											if (err) {
												orddetailstatusData=[];
											}else{
												orddetailstatusData=results;
											}
										console.log("orddetailstatusData");
										console.log(orddetailstatusData);

										

									
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
										
													if (err){
														return (err, {message: '修改失敗'});    //導向更改失敗
													}else{
														return (null, false, {message: '修改成功'});
													}
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
											
														if (err){
															return (err, {message: '修改失敗'});    //導向更改失敗
														}else{
															return (null, false, {message: '修改成功'});
														}
													});

												}
											}
											
											
											
										var messages = req.flash('error');
										res.render('supplierstatus', {productData:productData,orderData:orderData,orderdetailData:orderdetailData,customData:customData,supplierData:supplierData,suporddetailData:suporddetailData,yetpendordData:yetpendordData,okpendordData:okpendordData,editpendordData:editpendordData,orddetailstatusData:orddetailstatusData,user : req.user});    
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