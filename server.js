//==================================================
//============ get the packages we need ============
//==================================================

var experss  	= 	require('express');
var app 		= 	experss();
var bodyParser 	= 	require('body-parser');
var morgan 		= 	require('morgan');
var jwt 		= 	require('jsonwebtoken');// used to create ,sign , and verify tokens
//var session	    =	require('express-session');
var apiRoutes 	= 	experss.Router();
var config 		= 	require('./src/config.js'); //get our config file
var port 		= 	process.env.PORT || config.port;


app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(morgan('dev')); // use morgan to log requests to the console
app.set('superSecret',config.secret);

app.use(session({
		secret : 'sssshhhhh' ,
		saveUninitialized: true,
		maxAge : 60000
		})
 );


 app.use((req,res,next)=>{
	 switch(req.url)
	 {
		 case '/home':
		 case '/':
		 next();
		 break;
		 default:
			 app.use('/api/',[
				 require('./route/login.js')
			 ]);
			 next();
			 break;
	 }
 })


app.listen(port , ()=> {
		console.log('Server is starting....');
});

module.exports = app; // for testing server
