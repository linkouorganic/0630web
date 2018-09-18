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
	
    //建立一個新資料物件
    var newData={
        OrdDate:OrdDate,
        FinishDate:FinishDate,
		createtime:createtime
        
    }	

	console.log("newData----------");
	console.log(newData);
	console.log("newData----------");
	
    pool.query('INSERT INTO order SET ?', newData, function(err, rows, fields) {
        if (err){
            res.render('productAddFail', {});     //新增失敗
        }else{
            res.render('productAddSuccess', {});  //新增成功
        }
    });
});

module.exports = router;