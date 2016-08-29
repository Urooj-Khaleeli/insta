//Requiring dependancies

var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var Sequelize=require('Sequelize');
var pgp = require("pg-promise");


app.set('view engine', 'ejs');


//Making sequelize connection

var sequelize = new Sequelize('insta', 'postgres', 'applepie',{
	host: 'localhost',
	dialect: 'postgres',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	port: 5432


});

//middleware
app.use(bodyParser());


//Checking Connection

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });





//Making a Model

var Insta_ID = sequelize.define('Insta_ID', {
  ClientID: {
    type: Sequelize.STRING
  }
});


//Server functions
//Making button by running ejs
app.get('/', function (req, res){
	res.render('button.ejs')
});
//getting /table


app.post('/', function(req,res){
	
	var uinput=req.body.uinput;
	
//syncing model to database
	var syncer = Insta_ID.sync().then(function () {
  			return Insta_ID.create({
    			//adding user input
    			ClientID: uinput
  			});
	});
	
	var html = 'Click to return '+ '<a href="/">Try again.</a>'
	+ 'Click to view table  ' + '<a href="/table">View table</a>';
  		res.send(html);
});

app.get('/table', function(req,res){
		Insta_ID.findAll().then(function(Insta_ID){
			res.send(Insta_ID)
		})
});


app.listen(8080, function(){
	console.log("running on localhost:8080")
})
