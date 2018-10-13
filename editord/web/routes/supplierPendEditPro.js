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

									
											
											
	
										
											
										
	
	
											//取得使用者傳來的參數
											var difbuttoncount=req.param("difbutton");//分辨按鈕
											var pendSupID=req.param("SupID");//供應商編號
											var inputProquantity=req.param("inputProquantity");//分配量
											var OrderDetail_Order_OrdNo=req.param("OrderDetail_Order_OrdNo");//主訂單編號
											var OrderSerNo=req.param("OrderSerNo");//各分配商品編號(按鈕)
											var pendSupplierSerNo=req.param("SupplierSerNo");//某一商品分配給供應商的編號
											var notAllowedit=req.param("notAllowedit");//某一商品分配給供應商的編號
											console.log("inputProquantity");
											console.log(difbuttoncount);//分辨按鈕
											console.log(pendSupID);//供應商編號
											console.log(inputProquantity);//分配量
											console.log(OrderDetail_Order_OrdNo);//主訂單編號
											console.log(OrderSerNo);//各分配商品編號(按鈕)
											console.log(pendSupplierSerNo);//某一商品分配給供應商的編號(表格欄位)
											
											console.log("inputProquantity");
											
											pool.query('DELETE FROM suporddetail where OrderDetail_Order_OrdNo=?', [OrderDetail_Order_OrdNo], function(err, rows, fields) {
												
												
												for(var s='0';s<pendSupplierSerNo.length;s++){
													var OrderSerNo=difbuttoncount[s];
													var SupplierSerNo=pendSupplierSerNo[s];//某一商品分配給供應商的編號
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
												
												
												
											});
											
											var messages = req.flash('error');
											res.render('supplierpendedit', { productData:productData,orderData:orderData,orderdetailData:orderdetailData,customData:customData,supplierData:supplierData,suporddetailData:suporddetailData,yetpendordData:yetpendordData,okpendordData:okpendordData,editpendordData:editpendordData,user : req.user});    
										
	
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