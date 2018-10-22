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
											var OrdNo=req.param("orderNo");
											var OrdDate=req.param("OrdDate");
											var FinishDate=req.param("FinishDate");
											var Today = new Date();
											var createtime;
											createtime = Today.getFullYear()+ "" + (Today.getMonth()+1) + "" + Today.getDate() + "" + Today.getHours()+ "" + Today.getMinutes()+ "" + Today.getSeconds()+ "";
											console.log("--------order-----");
											
											var CusName=req.param("CusName");										
											var Cellphone=req.param("Cellphone");
											var Address=req.param("Address");
											var id=req.param("id");
											console.log("--------custom-----");
											
											var notAllowedit=req.param("Allowedit");
											var ProId=req.param("ProId");
											var inputSpecific=req.param("inputSpecific");
											var inputNum=req.param("inputNum"); 
											var inputPrice=req.param("inputPrice");
											console.log(inputSpecific+" "+inputNum+" "+inputPrice );
											console.log("--------orderdetail-----");

											var OrdStatus="未出貨未付款"
											var No=req.param("No");
											console.log("No");
											console.log(No);
											console.log("No");
											
											var memo ="";
											if(!Array.isArray(No)){
												memo=inputSpecific+"公克"+inputNum+"包"+inputPrice+"元"+"//"+memo;	
												console.log("memo1");
													console.log(memo);
													console.log("memo1");
											}
											else{
												for(var m='0';m<No.length;m++){	
													console.log(inputSpecific[0]);
													memo=inputSpecific[m]+"公克"+inputNum[m]+"包"+inputPrice[m]+"元"+"//"+memo;
													console.log("memo2");
													console.log(memo);
													console.log("memo2");
													
												}
											}
											
											if(!Array.isArray(No)){
												//var ProQuantity=inputSpecific*inputNum;
												//console.log(ProQuantity);
												//var Amount=inputNum*inputPrice;
												var Allowedit = notAllowedit;
												var Product_ProId = ProId;
												var SerNo = No; 
												var Order_OrdNo = OrdNo;
												var UnitPrice=inputPrice;
												var Quantity=inputNum;
												var Weight=inputSpecific;
												var one={SerNo,Product_ProId,OrdStatus,Order_OrdNo,UnitPrice,Quantity,Weight,Allowedit};
												console.log("one1");
												console.log(one);
												console.log("one1");
												
												
												}
											else{
												for(var n='0';n<No.length;n++){
													//var ProQuantity=inputSpecific[n]*inputNum[n];
													//console.log(ProQuantity);
													//var Amount=inputNum[n]*inputPrice[n];
													var Allowedit = notAllowedit[n];
													var Product_ProId = ProId[n];
													var SerNo = No[n]; 
													var UnitPrice=inputPrice[n];
													var Quantity=inputNum[n];
													var Weight=inputSpecific[n];
													var Order_OrdNo = OrdNo;
													var one={SerNo,Product_ProId,OrdStatus,Order_OrdNo,UnitPrice,Quantity,Weight,Allowedit};
													console.log("one2");
													console.log(one);
													console.log("one2");

												}
											}
								
											console.log(id);
											console.log("--------id-----");
											
										
											
											pool.query('UPDATE mydb.`order` SET OrdDate=?, FinishDate=?, createtime=?, memo=? where OrdNo=?', [OrdDate, FinishDate, createtime, memo, OrdNo], function(err, rows, fields) {
												console.log("-------update order----------");

												pool.query('UPDATE custom SET CusName=?, Cellphone=?, Address=? where id=?', [CusName, Cellphone, Address, id], function(err, rows, fields) {
													console.log("-------update custom----------");
													
													console.log("Order_OrdNo");
													console.log(Order_OrdNo);
													console.log("Order_OrdNo");
													pool.query('DELETE FROM orderdetail where Order_OrdNo=?', [Order_OrdNo], function(err, rows, fields) {
														if(!Array.isArray(No)){
															//var ProQuantity=inputSpecific*inputNum;
															//console.log(ProQuantity);
															//var Amount=inputNum*inputPrice;
															var Allowedit = notAllowedit;
															var Product_ProId = ProId;
															var SerNo = No; 
															var Order_OrdNo = OrdNo;
															var UnitPrice=inputPrice;
															var Quantity=inputNum;
															var Weight=inputSpecific;
															var one={SerNo,Product_ProId,OrdStatus,Order_OrdNo,UnitPrice,Quantity,Weight,Allowedit};
															console.log(one);
															
															//存入orderdetail
															pool.query('INSERT INTO orderdetail SET ?', one, function(err, rows, fields) {
																console.log("---insert orderdetail----------");
																if (err){
																		return (err, {message: '修改失敗'});    //導向更改失敗
																}else{
																	return (null, false, {message: '修改成功'});
																}
															});
															}
														else{
															for(var n='0';n<No.length;n++){
																//var ProQuantity=inputSpecific[n]*inputNum[n];
																//console.log(ProQuantity);
																//var Amount=inputNum[n]*inputPrice[n];
																var Allowedit = notAllowedit[n];
																var Product_ProId = ProId[n];
																var SerNo = No[n]; 
																var UnitPrice=inputPrice[n];
																var Quantity=inputNum[n];
																var Weight=inputSpecific[n];
																var Order_OrdNo = OrdNo;
																var one={SerNo,Product_ProId,OrdStatus,Order_OrdNo,UnitPrice,Quantity,Weight,Allowedit};
																console.log(one);
																
																pool.query('INSERT INTO orderdetail SET ?', one, function(err, rows, fields) {
																	console.log("---insert orderdetail----------");
																	if (err){
																	return (err, {message: '修改失敗'});    //導向更改失敗
																	}else{
																		return (null, false, {message: '修改成功'});
																	}
																});
															}
														}	
													});
												
												});
											
											});	
										
										var messages = req.flash('error');
										res.render('supplierordedit', { productData:productData,orderData:orderData,orderdetailData:orderdetailData,customData:customData,supplierData:supplierData,suporddetailData:suporddetailData,yetpendordData:yetpendordData,okpendordData:okpendordData,editpendordData:editpendordData,editordData:editordData,user : req.user});    
										
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