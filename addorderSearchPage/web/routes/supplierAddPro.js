var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//----------------
// 引用db.js
//----------------
var pool = require('./lib/db.js');
router.post('/', function(req, res, next) {

									

	var OrdDate=req.param("OrdDate");
	var FinishDate=req.param("FinishDate");
	console.log(OrdDate);
	console.log(FinishDate);
	var Today = new Date();
	var createtime;
	createtime = Today.getFullYear()+ "" + (Today.getMonth()+1) + "" + Today.getDate() + "" + Today.getHours()+ "" + Today.getMinutes()+ "" + Today.getSeconds()+ "";
	
	
	var ProId=req.param("ProId");
	var inputSpecific=req.param("inputSpecific");
	var inputNum=req.param("inputNum"); 
	var inputPrice=req.param("inputPrice");
	var notAllowedit=req.param("Allowedit");
	console.log(inputSpecific+" "+inputNum+" "+inputPrice );
	

	var OrdStatus="未出貨未付款"
	var No=req.param("No");
	console.log(No);
	var CusName=req.param("CusName");
	console.log(CusName);
	var Cellphone=req.param("Cellphone");
	console.log(Cellphone);
	var Address=req.param("Address");
	console.log(Address);
	var Email=req.param("Email");
	console.log(Email);
	var Account=req.param("Account");
	Account=CusName+createtime;
	console.log(Account);
	var Password=req.param("Password");
	console.log(Password);
	var createid=req.param("createid");
	console.log(createid);
	
	console.log("****");
	console.log(Array.isArray(No));
	console.log("****");
	
	//新增custom資料
	 var newCustomData={
		CusName:CusName,
		Address:Address,
		Cellphone:Cellphone,
		Email:Email,
		Account:Account,
		Password:Password

	 }
	 
	console.log("newCustomData----------");
	console.log(newCustomData);
	console.log("newCustomData----------");

	//存入custom
	pool.query('INSERT INTO custom SET ?', newCustomData, function(err, rows, fields) {
		console.log("-------insert costom----------");

		//查custom.id
		pool.query('SELECT id FROM custom  ORDER BY id DESC LIMIT 0 , 1', function(err, results){
			console.log("-----select id----");
			console.log(results[0].id);
			var Custom_CusNo = results[0].id;		
				
			//查order.OrdNo
			pool.query('SELECT OrdNo FROM mydb.`order`  ORDER BY OrdNo DESC LIMIT 0 , 1  ',function(err, results){
				if(results[0]==undefined){
					console.log("---123--select OrdNo----");
					var OrdNo = 1 ;
				}
				else{
				console.log("-----select OrdNo----");
				console.log(results[0].OrdNo);
				var OrdNo = results[0].OrdNo;		
				OrdNo = OrdNo+1;
				}
				var memo ="";
				if(!Array.isArray(No)){
					memo=inputSpecific+"斤"+inputNum+"包"+inputPrice+"元"+"//"+memo;	
					}
				else{
					for(var m='0';m<No.length;m++){
						
						console.log(inputSpecific[0]);
						memo=inputSpecific[m]+"斤"+inputNum[m]+"包"+inputPrice[m]+"元"+"//"+memo;
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
						
						if (err){
							return (err, {message: '修改失敗'});    //導向更改失敗
						}else{
							return (null, false, {message: '修改成功'});
						}
		
				});
				
				//查orderdetail資料
				if(!Array.isArray(No)){
					//var ProQuantity=inputSpecific*inputNum;
					//console.log(ProQuantity);
					//var Amount=inputNum*inputPrice;
					var Allowedit=notAllowedit;
					var Product_ProId = ProId;
					var SerNo = 1; 
					var Order_OrdNo = OrdNo;
					var UnitPrice=inputPrice;
					var Quantity=inputNum;
					var Weight=inputSpecific;
					var one={SerNo,Product_ProId,OrdStatus,Order_OrdNo,UnitPrice,Quantity,Weight,Allowedit};
					console.log("one1");
					console.log(one);
					console.log("one1");
					
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
						var Allowedit=notAllowedit[n];
						var Product_ProId = ProId[n];
						var SerNo = [n]; 
						SerNo = parseInt(SerNo)+1;
						var UnitPrice=inputPrice[n];
						var Quantity=inputNum[n];
						var Weight=inputSpecific[n];
						var Order_OrdNo = OrdNo;
						var one={SerNo,Product_ProId,OrdStatus,Order_OrdNo,UnitPrice,Quantity,Weight,Allowedit};
						console.log("one");
						console.log(one);
						console.log("one");
						
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

	res.redirect('supplier');
	//res.render('supplier', { productData:productData,orderData:orderData,orderdetailData:orderdetailData,customData:customData,supplierData:supplierData,suporddetailData:suporddetailData,yetpendordData:yetpendordData,okpendordData:okpendordData,editpendordData:editpendordData,editordData:editordData,user : req.user});    


	
});

module.exports = router;