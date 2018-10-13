var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//------------------
// 載入資料庫連結
//------------------
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var pool = require('../routes/lib/db.js');

/*passport.serializeUser(function(user, done) {
		console.log("------serializeUser--supplier------");
		console.log(user);
		console.log("------serializeUser--supplier------");
        done(null, user.id);
    });

// used to deserialize the user
passport.deserializeUser(function(id, done) {
	console.log("------deserializeUser--supplier------");
	console.log(id);//91
	console.log("------deserializeUser--supplier------");
	pool.query("SELECT * FROM user WHERE userid = ? ",[id], function(err, rows){
		done(err, rows[0]);
	});
});*/



    passport.use(
        'local-signupsupplier',
        new LocalStrategy({
            // by default, local strategy uses account and password
            usernameField : 'userid',
            passwordField : 'userpassword',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req,userid, Password, done) { 
			req.checkBody('userid', '帳號必填!').notEmpty();			
			req.checkBody('userpassword', '密碼為四碼以上必填!').notEmpty().isLength({min:4});
			req.checkBody('username', '姓名必填!').notEmpty();
			req.checkBody('check', '驗證碼必填!').notEmpty();

			
			
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
            pool.query("SELECT * FROM user WHERE userid = ?",[userid], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, {message: '此帳號已存在!'});
                } else {
                    // if there is no user with that account
                    // create the account
					var userpassword=req.body.userpassword;
					userpassword = bcrypt.hashSync(userpassword, null, null);
					
					var Today = new Date();
					var createtime;
					var createid;
					var check;
					check = "abc123";
					createtime = Today.getFullYear()+ "" + (Today.getMonth()+1) + "" + Today.getDate() + "" + Today.getHours()+ "" + Today.getMinutes()+ "" + Today.getSeconds()+ "";
					createid = req.body.userid;
					if (check!=req.body.check){
						return done(null, false, {message: '此驗證碼錯誤!'});
					}
					
					var newUserMysql = {
						supplierid: req.body.SupID,
						userid: req.body.userid,
						username: req.body.username,
						authority: req.body.authority,
						createtime: createtime,
                        userpassword: userpassword,
						enable: req.body.enable,
						createid: createid
						
                    };
					
					console.log(newUserMysql);
					
                    var insertQuery = "INSERT INTO user ( supplierid, userid, username, authority, createtime, userpassword, enable, createid ) values (?,?,?,?,?,?,?,?)";

					pool.query(insertQuery,[ newUserMysql.supplierid, newUserMysql.userid, newUserMysql.username, newUserMysql.authority, newUserMysql.createtime, newUserMysql.userpassword, newUserMysql.enable, newUserMysql.createid],function(err, rows) {
						console.log("---------insertrows0000----supplier--------");
						console.log(rows);
						console.log("---------insertrows0000----supplier--------");
						newUserMysql.id = rows.insertId;
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );



	passport.use(
        'local-loginsupplier',
        new LocalStrategy({
            // by default, local strategy uses account and password
            usernameField : 'userid',
            passwordField : 'userpassword',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, userid, userpassword, done) { // callback with account and password from our form
			req.checkBody('userid', '帳號必填!').notEmpty();			
			req.checkBody('userpassword', '密碼四碼以上必填!').notEmpty().isLength({min:4});
			
	
			var errors = req.validationErrors();
			if (errors) {
				var messages = [];
				errors.forEach(function(error) {
					messages.push(error.msg);
				});
				return done(null, false, req.flash('error', messages));
			}
			
			
			
            pool.query("SELECT * FROM user WHERE userid = ?",[userid], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, {message: '此帳號不存在!'}); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(userpassword, rows[0].userpassword))
                    return done(null, false, {message: '密碼錯誤!'}); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
	
	passport.use(
	     'local-updatesupplier',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'userid',
            passwordField : 'userpassword',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req,userid, userpassword, done) { 
			req.checkBody('username', '姓名必填!').notEmpty();
			req.checkBody('userid', '帳號必填!').notEmpty();
			req.checkBody('userpassword', '密碼四碼以上必填!').notEmpty().isLength({min:4});
			
			
			var errors = req.validationErrors();
			if (errors) {
				var messages = [];
				errors.forEach(function(error) {
				   messages.push(error.msg);
				});
				return done(null, false, req.flash('error', messages));
			}

			var id=req.param("id");
			var username=req.param("username");
			var userid=req.param("userid");
			var userpassword=req.param("userpassword");

			userpassword = bcrypt.hashSync(userpassword, null, null);

			pool.query('UPDATE user SET username=?, userid=?, userpassword=? where id=?', [username, userid, userpassword, id], function(err, rows, fields) {
				if (err){						
					return done(err);    //導向更改失敗頁面
				}else{
					return done(null, false, {message: '修改成功'}); //導向更改成功頁面
				}	
			})
	
        })
    );
	
	
