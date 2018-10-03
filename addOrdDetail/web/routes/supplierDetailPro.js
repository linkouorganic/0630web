var express = require('express');
var router = express.Router();

var pool = require('./lib/db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    pool.query('select * from order', function (error, results, fields) {
        if (error){
            res.render('supplier', {data:[]});
        }else{
            res.render('supplier', {data:results,user:req.user});
        }       
    });
});

module.exports = router;