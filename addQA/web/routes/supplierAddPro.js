var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//----------------
// 引用db.js
//----------------
var pool = require('./lib/db.js');
router.get('/', function(req, res, next) {
    //取得使用者傳來的參數

    var OrdDate=req.param("OrdDate");
    var FinishDate=req.param("FinishDate");
    console.log("newData---13-------");
	console.log(OrdDate);
	console.log(FinishDate);
	console.log("newData----13------");
	var Today = new Date();
	var createtime;
	createtime = Today.getFullYear()+ "" + (Today.getMonth()+1) + "" + Today.getDate() + "" + Today.getHours()+ "" + Today.getMinutes()+ "" + Today.getSeconds()+ "";
	var Product_ProId=req.param("ProId");
	var inputSpecific=req.param("inputSpecific");
	var inputNum=req.param("inputNum"); 
	var inputPrice=req.param("inputPrice");
	console.log(inputSpecific+" "+inputNum+" "+inputPrice );
	var memo=inputSpecific+"公克 "+inputNum+"包 "+inputPrice+"元";
	var ProQuantity=inputSpecific*inputNum;
	console.log(ProQuantity);
	var Amount=inputNum*inputPrice;
	console.log("-----Amount-----");
	console.log(Amount);
	console.log("-----Amount-----");
	var OrdStatus="新增訂單中"
	
	console.log(memo);
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
		OrdStatus:OrdStatus
        
    }	

	
	console.log("newOrderData----------");
	console.log(newOrderData);
	console.log("newOrderData----------");
	
    pool.query('INSERT INTO order SET ?', newData, function(err, rows, fields) {
		console.log("newOrd868erDat45646464646a----------");
			pool.query('INSERT INTO orderdetail SET ?', newData, function(err, rows, fields) {
			console.log("newOrderDat45646464646a----------");
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