var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//------------------
// 載入資料庫連結
//------------------
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var pool = require('../routes/lib/db.js');

passport.serializeUser(function(user, done) {
		console.log("------serializeUser--user------");
		console.log(user);
		console.log("------serializeUser--user------");
        done(null, user.id);
    });

// used to deserialize the user
passport.deserializeUser(function(id, done) {
	console.log("------deserializeUser--user------");
	console.log(id);//91
	console.log("------deserializeUser--user------");
	pool.query("SELECT * FROM custom WHERE id = ? ",[id], function(err, rows){
		done(err, rows[0]);
	});
});
	
passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses account and password
            usernameField : 'Account',
            passwordField : 'Password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req,Account, Password, done) { 
			req.checkBody('CusName', '姓名必填!').notEmpty();
			req.checkBody('Address', '地址必填!').notEmpty();
			req.checkBody('Cellphone', '手機號碼必填!').notEmpty();
			req.checkBody('Email', '信箱格式有誤必填!').notEmpty().isEmail();
			req.checkBody('Account', '帳號必填!').notEmpty();			
			req.checkBody('Password', '密碼為四碼以上必填!').notEmpty().isLength({min:4});
			req.checkBody('box','請勾選已同意會員服務條款!').notEmpty();
			
			var errors = req.validationErrors();
			if (errors) {
				var messages = [];
				errors.forEach(function(error) {
				   messages.push(error.msg);
				});
				return done(null, false, req.flash('error', messages));
			}
            // find a user whose account is the same as the forms account
            // we are checking to see if the user trying to login already exists
            pool.query("SELECT * FROM custom WHERE Account = ?",[Account], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, {message: '此帳號已存在!'});
                } else {
                    // if there is no user with that account
                    // create the account
                    var newUserMysql = {
						CusName: req.body.CusName,
						Address: req.body.Address,
						Cellphone: req.body.Cellphone,
						Telephone: req.body.Telephone,
						Email: req.body.Email,
                        Account: Account,
                        Password: bcrypt.hashSync(Password, null, null)  // use the generateHash function in our user model
                    };
                    var insertQuery = "INSERT INTO custom ( CusName, Address, Cellphone, Telephone, Email, Account, Password ) values (?,?,?,?,?,?,?)";
					
                    pool.query(insertQuery,[ newUserMysql.CusName, newUserMysql.Address, newUserMysql.Cellphone, newUserMysql.Telephone, newUserMysql.Email, newUserMysql.Account, newUserMysql.Password],function(err, rows) {
						console.log("---------insertrows------------");
						console.log(rows);
						console.log("---------insertrows------------");
						newUserMysql.id = rows.insertId;
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses account and password
            usernameField : 'Account',
            passwordField : 'Password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, Account, Password, done) { // callback with account and password from our form
			req.checkBody('Account', '帳號必填!').notEmpty();			
			req.checkBody('Password', '密碼四碼以上必填!').notEmpty().isLength({min:4});
			var errors = req.validationErrors();
			if (errors) {
				var messages = [];
				errors.forEach(function(error) {
					messages.push(error.msg);
				});
				return done(null, false, req.flash('error', messages));
			}
		
            pool.query("SELECT * FROM custom WHERE Account = ?",[Account], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, {message: '此帳號不存在!'}); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(Password, rows[0].Password))
                    return done(null, false, {message: '密碼錯誤!'}); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
	
	passport.use(
        'local-updatecustom',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'Account',
            passwordField : 'Password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req,Account, Password, done) { 
			req.checkBody('CusName', '姓名必填!').notEmpty();
			req.checkBody('Address', '地址必填!').notEmpty();
			req.checkBody('Cellphone', '手機號碼必填!').notEmpty();
			req.checkBody('Email', '信箱格式有誤必填!').notEmpty().isEmail();
			req.checkBody('Password', '密碼四碼以上必填!').notEmpty().isLength({min:4});
			
			
			var errors = req.validationErrors();
			if (errors) {
				var messages = [];
				errors.forEach(function(error) {
				   messages.push(error.msg);
				});
				return done(null, false, req.flash('error', messages));
			}


			var id=req.param("id");
			var CusName=req.param("CusName");
			var Address=req.param("Address");
			var Cellphone=req.param("Cellphone");
			var Telephone=req.param("Telephone");
			var Email=req.param("Email");
			var Password=req.param("Password");

			Password = bcrypt.hashSync(Password, null, null);

			pool.query('UPDATE custom SET CusName=?, Address=?, Cellphone=?, Telephone=? ,Email=? ,Password=? where id=?', [CusName, Address, Cellphone, Telephone, Email, Password, id], function(err, rows, fields) {
				if (err){						
					return done(err);    //導向更改失敗頁面
				}else{
					return done(null, false, {message: '修改成功'}); //導向更改成功頁面
				}	
			})
	
        })
    );
	
	