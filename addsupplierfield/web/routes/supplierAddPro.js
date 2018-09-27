var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//----------------
// 引用db.js
//----------------
var pool = require('./lib/db.js');
router.get('/', function(req, res, next) {

    var OrdDate=req.param("OrdDate");
    var FinishDate=req.param("FinishDate");
	console.log(OrdDate);
	console.log(FinishDate);
	var Today = new Date();
	var createtime;
	createtime = Today.getFullYear()+ "" + (Today.getMonth()+1) + "" + Today.getDate() + "" + Today.getHours()+ "" + Today.getMinutes()+ "" + Today.getSeconds()+ "";

	var Product_ProId=req.param("ProId");
	var inputSpecific=req.param("inputSpecific");
	var inputNum=req.param("inputNum"); 
	var inputPrice=req.param("inputPrice");
	console.log(inputSpecific+" "+inputNum+" "+inputPrice );
	
	var memo=inputSpecific+"公克 "+inputNum+"包 "+inputPrice+"元";
	console.log(memo);
	
	var ProQuantity=inputSpecific*inputNum;
	console.log(ProQuantity);
	var Amount=inputNum*inputPrice;
	console.log(Amount);
	var OrdStatus="新增訂單中"
	var SerNo=req.param("SerNo");
	console.log(SerNo);
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
	
    //建立一個新資料物件
    var newData={
        OrdDate:OrdDate,
        FinishDate:FinishDate,
		createtime:createtime,
		memo:memo
        
    }	
	
	
	console.log("newData----------");
	console.log(newData);
	console.log("newData----------");
	
	 var newOrderData={
        Product_ProId:Product_ProId,
		ProQuantity:ProQuantity,
		Amount:Amount,
		OrdStatus:OrdStatus,
		SerNo:SerNo
        
    }	
	

	
	console.log("newOrderData----------");
	console.log(newOrderData);
	console.log("newOrderData----------");
	
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
	
    pool.query('INSERT INTO order SET ?', newData, function(err, rows, fields) {
		console.log("newOrd868erDat45646464646a----------");
			pool.query('INSERT INTO orderdetail SET ?', newOrderData, function(err, rows, fields) {
			console.log("newOrderDat456----------");
			
			pool.query('INSERT INTO custom SET ?', newCustomData, function(err, rows, fields) {
			console.log("newCustomData899----------");
			if (err){
				return (err, {message: '修改失敗'});    //導向更改失敗
			}else{
				return (null, false, {message: '修改成功'});
			}
			});
			
			
			if (err){
				return (err, {message: '修改失敗'});    //導向更改失敗
			}else{
				return (null, false, {message: '修改成功'});
			}
			});
			
			
			
			if (err){
				return (err, {message: '修改失敗'});    //導向更改失敗
        }else{
            return (null, false, {message: '修改成功'});
        }
			
        
    });
});

module.exports = router;