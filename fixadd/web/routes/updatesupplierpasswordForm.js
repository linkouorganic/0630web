var express = require('express');
var router = express.Router();
var authorize = require('./lib/authorize.js');
/* GET home page. */
router.get('/', function(req, res, next) {
	//------------------------------------------
    // 如尚未登入, 轉至未登入頁面
    //------------------------------------------
    if(!authorize.isPass(req)){
        res.render(authorize.illegalURL, {});
        return;
    }
	
    res.render('updatesupplierpasswordForm', {userid:req.session.userid,username:req.session.username});
});

module.exports = router;