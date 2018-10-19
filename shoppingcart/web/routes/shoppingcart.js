var express = require('express');
var session = require('express-session');
var router = express.Router();
var mysql = require('mysql');

//----------------
// 引用db.js
//----------------
var pool = require('./lib/db.js');


/* GET home page. */

router.get('/', function(req, res, next) {
   
    var cart=req.session.cart;
    var amount=req.session.shopQty;
    var shopPrice = new Array();
    var shopImg = new Array();
    var shopWeight = new Array(); 
    
  
if (cart == null || cart=="") {
    console.log('購物車沒有商品');
    res.render('noshoppingcart', {user:req.user});
      };

 if (cart = req.session.cart){
for(var i=0; i<cart.length; i++) {
    var proname =cart[i];
        pool.query('select ProName, ProPrice, Image1, ProWeight from product where proname=? ',proname  ,function(err, results) {
        if (err) {
        shopPrice=[];
        shopImg=[];
      }else{
        shopPrice.push(results[0].ProPrice);
        shopWeight.push(results[0].ProWeight);
        shopImg.push(results[0].Image1);
        
       

        if( shopPrice.length==cart.length){
            res.render('shoppingcart', {shopPrice:shopPrice, shopImg:shopImg, shopWeight:shopWeight, cart:cart, amount:amount });
      }}
    });
}};


/*for(var v=0; v<amount.length; v++){
if (amount[v] == cart[v]){
    console.log(amount[v]);
}};*/

/*for(var i=0; i<cart.length; i++) {

    shopAdd=shopQty[i]+1;
    shopQty[i]=shopAdd;
    console.log(shopQty);
}*/

console.log(session);


 });


//========================


module.exports = router;
