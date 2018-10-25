var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');

var startPage=1;
var linePerPage=15; 
var navSegments=10;

/* GET home page. */
router.get('/', function(req, res, next) {
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

										//var messages = req.flash('error');
										//res.render('supplier', {productData:productData,orderData:orderData,orderdetailData:orderdetailData,customData:customData,supplierData:supplierData,suporddetailData:suporddetailData,yetpendordData:yetpendordData,okpendordData:okpendordData,editpendordData:editpendordData,editordData:editordData,user : req.user});    
										
										console.log("CusName000");
										var CusName=req.param('CusName');
										CusName = "%" + CusName + "%";
										var pageNo=1
										console.log("CusName111");
										console.log(CusName);
										pool.query('select count(*) as cnt from suppliersearch where CusName like ?', [CusName], function(err, results) {
											if (err)throw err;
											console.log("11111");
											var totalLine=results[0].cnt;
											var totalPage=1;

											pool.query('select * from suppliersearch where CusName like ? limit ?, ? ',[CusName,(pageNo-1)*linePerPage, linePerPage], function(err, results) {
												console.log("222");
												if (err) {
													console.log("333");
													res.render('nosupplier', {user : req.user});
												}

												if(results.length==0){
													console.log("444");
													res.render('nosupplier', {user : req.user});
												}else{
													console.log("555");
													console.log(results);
													var recordNo=(pageNo-1)*linePerPage+1;
													//res.redirect('supplier');
												  res.render('supplier', {orderData:results, pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments,productData:productData,orderdetailData:orderdetailData,customData:customData,supplierData:supplierData,suporddetailData:suporddetailData,yetpendordData:yetpendordData,okpendordData:okpendordData,editpendordData:editpendordData,editordData:editordData,user : req.user});    

												  // res.render('supplier', {data:results, pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments, user : req.user});

												}
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
	
	});
	
	
	
	
});

module.exports = router;