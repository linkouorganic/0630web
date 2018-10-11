var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');


/* GET home page. */
router.post('/', function(req, res, done) {
    //取得使用者傳來的參數
	var difbuttoncount=req.param("difbutton");//分辨按鈕
	var pendSupID=req.param("SupID");//供應商編號
    var inputProquantity=req.param("inputProquantity");//分配量
	var OrderDetail_Order_OrdNo=req.param("OrderDetail_Order_OrdNo");//主訂單編號
	var OrderSerNo=req.param("OrderSerNo");//各分配商品編號(按鈕)
	var pendSupplierSerNo=req.param("SupplierSerNo");//某一商品分配給供應商的編號
	console.log("inputProquantity");
	console.log(difbuttoncount);//分辨按鈕
	console.log(pendSupID);//供應商編號
	console.log(inputProquantity);//分配量
	console.log(OrderDetail_Order_OrdNo);//主訂單編號
	console.log(OrderSerNo);//各分配商品編號(按鈕)
	console.log(pendSupplierSerNo);//某一商品分配給供應商的編號(表格欄位)
	
	console.log("inputProquantity");
	
	//判斷按鈕
    /*for(var i=0;i<pendProNo.length;i++){
       var count = 0;
	   var OrderSerNo=pendProNo[i];//各分配商品編號(按鈕)
      for(var j=0;j<difbuttoncount.length;j++){
        if(difbuttoncount[j] == (i+1)){
          count++;
        }
      }
	  console.log("diff");
      console.log((i+1)+"=>"+count);
	  console.log("diff");
	  
	  
	  


    }*/
	

	
	//重量總額
	/*var total = '0';
	var totalProquantity ='0';
	for(var sum='0';sum<inputProquantity.length;sum++){
		total=inputProquantity[sum];
		//console.log(parseInt(total, 10));
		totalProquantity = (parseInt(totalProquantity, 10))+(parseInt(total, 10));
	}
	console.log(totalProquantity);*/
	//重量總額
		/*for(var n='0';n<pendProNo.length;n++){
				var OrderSerNo=pendProNo[n];//各分配商品編號(按鈕)
				console.log(OrderSerNo);
			}
	*/
		
		for(var s='0';s<pendSupplierSerNo.length;s++){
			var OrderSerNo=difbuttoncount[s];
			var SupplierSerNo=pendSupplierSerNo[s];//某一商品分配給供應商的編號
			var Supplier_SupID=pendSupID[s];//供應商編號
			var ProQuantity=inputProquantity[s];//分配量
			
			
			console.log(SupplierSerNo);
			console.log(Supplier_SupID);
			console.log(ProQuantity);
			
			var one={Supplier_SupID,OrderDetail_Order_OrdNo,ProQuantity,OrderSerNo,SupplierSerNo};
				console.log("one");
				console.log(one);
				console.log("one");
			
			pool.query('INSERT INTO suporddetail SET ?', one, function(err, rows, fields) {
				if (err){						
					return done(err);    //導向更改失敗頁面
				}else{
					return done(null,false, {message: '修改成功'}); //導向更改成功頁面
				}
			});	
		  
		}
		
	
	

});

module.exports = router;