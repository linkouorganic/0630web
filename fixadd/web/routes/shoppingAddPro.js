var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//----------------
// 引用db.js
//----------------
var pool = require('./lib/db.js');
var startPage=1;      /* 開始頁數 */
var linePerPage=8;   /* 每頁行數 */
var navSegments=10;   /* 每區段頁數 */

router.post('/', function(req, res, next) {
	
	
	
	
		
    var ProId=req.param("ProId");
    		

	
	var Today = new Date();
	var OrdDate;
	OrdDate = Today.getFullYear()+ "-" + (Today.getMonth()+1) + "-" + Today.getDate() ;
	console.log("OrdDate");
	console.log(OrdDate);
	console.log("OrdDate");
	var FinishDate = OrdDate;
	var createtime = Today.getFullYear()+ "" + (Today.getMonth()+1) + "" + Today.getDate() + "" + Today.getHours()+ "" + Today.getMinutes()+ "" + Today.getSeconds()+ "";
    var createid = req.param("createid");
	var Custom_CusNo=req.param("Custom_CusNo");
	
	var shopWeight=req.param("shopWeight");
	var shopPrice=req.param("shopPrice"); 
	var amount=req.param("amount");
	
	console.log(shopWeight+" "+shopPrice+" "+amount );
	

	var OrdStatus="未出貨未付款"
	var No=req.param("No");
	console.log(No);




	//查order.OrdNo
	pool.query('SELECT OrdNo FROM mydb.`order`  ORDER BY OrdNo DESC LIMIT 0 , 1  ',function(err, results){
		console.log("-----select OrdNo----");
		console.log(results[0].OrdNo);
		var OrdNo = results[0].OrdNo;		
		OrdNo = OrdNo+1;
		
		var memo ="";
		if(!Array.isArray(No)){
			memo=shopWeight+"克"+amount+"包"+shopPrice+"元"+"//"+memo;	
			}
		else{
			for(var m='0';m<No.length;m++){

				memo=shopWeight[m]+"克"+amount[m]+"包"+shopPrice[m]+"元"+"//"+memo;
				console.log(memo);
				
				
			}
		}
		
		//新增order資料
		var newUserMysql = {
			OrdNo:OrdNo,
			Custom_CusNo:Custom_CusNo,
			OrdDate:OrdDate,
			FinishDate:FinishDate,
			createid:createid,
			createtime:createtime,
			memo:memo
		};
		console.log("newUserMysql----");
		console.log(newUserMysql);
		console.log("newUserMysql----");

		//存入order
		pool.query('INSERT INTO mydb.`order` SET ?', newUserMysql, function(err, rows, fields) {
			console.log("insert order----------");
			
			
		
		
			//查orderdetail資料
			if(!Array.isArray(No)){
				
				var Allowedit=0;
				var Product_ProId = ProId;
				var SerNo = No; 
				var Order_OrdNo = OrdNo;
				var UnitPrice=shopPrice;
				var Quantity=amount;
				var Weight=shopWeight;
				var one1={SerNo,Product_ProId,OrdStatus,Order_OrdNo,UnitPrice,Quantity,Weight,Allowedit};
				console.log("one1");
				console.log(one);
				console.log("one1");
				
				//存入orderdetail
				pool.query('INSERT INTO orderdetail SET ?', one1, function(err, rows, fields) {
						console.log("---insert orderdetail----------");
						console.log(err);
						console.log(rows);
						console.log(fields);
					});
				}
			else{
				for(var n='0';n<No.length;n++){
					//var ProQuantity=inputSpecific[n]*inputNum[n];
					//console.log(ProQuantity);
					//var Amount=inputNum[n]*inputPrice[n];
					var Allowedit=0;
					var Product_ProId = ProId[n];
					var SerNo = No[n]; 
					var UnitPrice=shopPrice[n];
					var Quantity=amount[n];
					var Weight=shopWeight[n];
					var Order_OrdNo = OrdNo;
					var one={SerNo,Product_ProId,OrdStatus,Order_OrdNo,UnitPrice,Quantity,Weight,Allowedit};
					console.log("one");
					console.log(one);
					console.log("one");
					
					pool.query('INSERT INTO orderdetail SET ?', one, function(err, rows, fields) {
						console.log("---insert orderdetail----------");
					
					});
				}
			}


		});


	});

	/*req.session.destroy(function (err) {
	  if (err) return next(err)
	  res.redirect('productListByPage')
	})*/
			
	res.redirect('productListByPage');
 
	// res.render('productListByPage', {data:results, pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments, user : req.user});
            

	
});									

module.exports = router;