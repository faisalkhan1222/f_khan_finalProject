var express = require('express');
var promise = require('bluebird');
var path = require('path');
var multer = require('multer');

var app = express();

var options =  {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp('postgres://faisalkhan:admin@localhost:5432/jukebox');

// body parser
var bodyParser = require('body-parser');

// json method kaifu
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.set('view engine','hbs');
app.set('views', path.join(__dirname,'views'));

// users ROUTES BELOW

/*  "/users"
 *    GET: finds all users
 *    POST: creates a new user
 */

// get all users
app.get('/users',function(req,res,next){
	db.any('SELECT * FROM songs')
	.then(function(data){

		console.log(data[0].songname);
		res.render('index',{ data: data });

	})
	.catch(function(err){
		return next(err);
	});
});

/*
// get all pics
app.get('/pics', function(req,res,next){
	db.any('SELECT * FROM pics')
	.then(function(pics){
		res.render('pics/index', { pics: pics });
	})
	.catch(function(){

	});
})

// create a new user
app.post('/users',function(req,res,next){
	var newUser = req.body;
	// expects no rows
	db.none('INSERT INTO users(username,password)'+
		'values(${username},${password})',
		req.body)
	.then(function(){
		console.log('INSERT INTO users(username,password)'+
			'values(${username},${password})',
			req.body);

		res.redirect('/users');
	})
	.catch(function (err){
		return next(err);
	});
});

 "/users/:id"
 *    GET: find user by id
 *    PUT: update user by id
 *    DELETE: deletes user by id


// get user by id

app.get('/users/:id', function(req,res,next){
	var userId = req.params.id;
	db.one('SELECT * FROM users WHERE id = $1', userId)
   .then(function (user) {
   		db.any('SELECT * FROM pics WHERE user_id = $1', user.id)
   			.then(function(pics) {
   				res.render('show', { user: user, pics: pics });
   			})
   			.catch(function(err){
   				return next(err);
   			});
	 })
	 .catch(function(err){
	 	return next(err);
	 });
});

// update user by id
app.put("/users/:id", function(req, res) {
	res.send("req.body.username");
});

// delete user by id
app.get("/delete/users/:id", function(req, res) {
	res.send("user deleted: "+ req.params.id);
});

// create new pic
app.post("/users/:user_id/pics", multer({ dest: './public/images/'}).single('upl'), function(req, res, next){
	var title = req.body.title;
	var src = req.file.filename;
	var user_id = req.params.user_id;
	db.none('insert into pics(title,src,user_id) values(${title},${src},${user_id})', { user_id: user_id,
			src: src,
			title: title} )
		.then(function(){
			res.redirect('/users/'+user_id);
		})
		.catch(function(err){
			return next(err);
		});
});
*/

app.listen(8000, function(){
	console.log('Listening on port 8000');
});