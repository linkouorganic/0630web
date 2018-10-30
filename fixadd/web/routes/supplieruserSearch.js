var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var startPage=1;
var linePerPage=15; 
var navSegments=10;
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
	
		//訂單列表suporddetailData資料表
		var suporddetailData;
		pool.query('select * from suporddetail', function(err, results) {       
			if (err) {
				suporddetailData=[];
			}else{
				suporddetailData=results;
			}
		console.log("suporddetailData");
		console.log(suporddetailData);


			//訂單列表orderdetail資料表
			var orderdetailData;
			pool.query('select * from orderdetail', function(err, results) {       
				if (err) {
					orderdetailData=[];
				}else{
					orderdetailData=results;
				}
			//console.log("orderdetailData");
			//console.log(orderdetailData);
				
				//訂單列表custom資料表
				var customData;
				pool.query('select * from custom', function(err, results) {       
					if (err) {
						customData=[];
					}else{
						customData=results;
					}
				//console.log("customData");
				//console.log(customData);

					//訂單列表supplier資料表
					var supplierData;
					pool.query('select * from supplier', function(err, results) {       
						if (err) {
							supplierData=[];
						}else{
							supplierData=results;
						}
					//console.log("supplierData");
					//console.log(supplierData);
					
					
						var okpendordData;
						pool.query('select * from okpendord', function(err, results) {       
							if (err) {
								okpendordData=[];
							}else{
								okpendordData=results;
							}
						//console.log("okpendordData");
						//console.log(okpendordData);

							var orderData;
							pool.query('select * from mydb.`order` ', function(err, results) {       
								if (err) {
								orderData=[];
							}else{
								orderData=results;
							}
							
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
											res.render('nosupplieruser', {user : req.user});
										}

										if(results.length==0){
											console.log("444");
											res.render('nosupplieruser', {user : req.user});
										}else{
											console.log("555");
											console.log(results);
											var recordNo=(pageNo-1)*linePerPage+1;
											//res.redirect('supplier');

										res.render('supplieruser', {pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments,productData:productData,orderData:results,orderdetailData:orderdetailData,customData:customData,supplierData:supplierData,okpendordData:okpendordData,suporddetailData:suporddetailData,user : req.user});    

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