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

// get all songs
app.get('/jukebox',function(req,res,next){
	db.any('SELECT * FROM songs')
	.then(function(data){
		res.render('index',{ data: data });
	})
	.catch(function(err){
		return next(err);
	});
});


app.listen(8000, function(){
	console.log('Listening on port 8000');
});
