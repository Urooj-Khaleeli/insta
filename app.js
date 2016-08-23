var express = require('express');
var app = express();

app.set('view engine', 'ejs');
//stylesheet link 



var followers='https://api.instagram.com/v1/users/self/follows?access_token='
var access= '3679149982.8455627.8b285b0e02fc439da3bbff5f7cbb6957'


app.get('/', function(req,res){
	res.render('button.ejs',{
		access: access
	})

	});


app.listen(8080, function(){
	console.log("Running on localhost:8080")
});