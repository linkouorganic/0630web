var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var startPage=1;      /* 開始頁數 */
var linePerPage=15;   /* 每頁行數 */
var navSegments=10;   /* 每區段頁數 */

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');
/* GET home page. */
router.get('/', isLoggedIn,function(req, res, next) {
	 var pageNo=parseInt(req.param('pageNo'));

    //--------------------------
    // 如果輸入參數不是數字
    //--------------------------
    if(isNaN(pageNo)){
        pageNo=1;
    }

    //--------------------------
    // 如果輸入參數小於1
    //--------------------------
    if(pageNo<1){
        pageNo=1;
    }

    //-----------------------
    // 如果點了上一個區段
    //-----------------------
    if(pageNo<startPage){
        startPage=startPage-navSegments;
    }

    //-----------------------
    // 如果點了下一個區段
    //-----------------------   
    if(pageNo>=(startPage+navSegments)){
        startPage=startPage+navSegments;
    }
	
	 pool.query('select count(*) as cnt from mydb.`order` where createid="yulin" or createid="yabao" or createid="chouhao" or createid="chiyuchi" ', function(err, results) {
        if (err)throw err;

        var totalLine=results[0].cnt;
        var totalPage=Math.ceil(totalLine/linePerPage);
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
	
		var orddetailstatusData;
		pool.query('SELECT DISTINCT Order_OrdNo,OrdStatus FROM mydb.orderdetail', function(err, results) {       
			if (err) {
				orddetailstatusData=[];
			}else{
				orddetailstatusData=results;
			}
		console.log("orddetailstatusData");
		console.log(orddetailstatusData);

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
									
									
										
										var orderData;
										pool.query('select * from mydb.`order` where createid="yulin" or createid="yabao" or createid="chouhao" or createid="chiyuchi" limit ?, ?',[(pageNo-1)*linePerPage, linePerPage], function(err, results) {       
											if (err) {
												res.render('nosupplierstatusdata', {user : req.user});
											}

											if(results.length==0){
												res.render('nosupplierstatusdata', {user : req.user});
											}else{
												var recordNo=(pageNo-1)*linePerPage+1;
												res.render('supplierstatus', { pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments,productData:productData,orderData:results,orderdetailData:orderdetailData,customData:customData,supplierData:supplierData,suporddetailData:suporddetailData,yetpendordData:yetpendordData,orddetailstatusData:orddetailstatusData,okpendordData:okpendordData,editpendordData:editpendordData,user : req.user});    
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