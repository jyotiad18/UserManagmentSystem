const jwt = require('jsonwebtoken');
const express = require('express');
const query = require('array-query');
const loginRoute = experss.Router();
const config = require('../config.js');
const ioFile = require('../utils.fileio.js');

loginRoute.use((req,res,next)=>{
    next();
})

routelogin.use(
		(req, res, next)=>
			{	
				next();		
		    }
);

routelogin.post('/login',function(req ,res) {

	var username = req.query.username ;
	var passwords = req.query.passwords;

	
	fs.getJSONData(fileName,(v) => {
	
                 var data = query('username').is(username).on(v);
				 if (data.length > 0)
				 {
					 var token = jwt.sign(data[0], config.secret, {});	
					 
					 req.session.token = token  ;
					 req.session.username = data[0].username;					 
					 
					 res.status(200).json({
								  success: true,
								  message: 'Enjoy your token!',
								  token: token
								});	
								
					
				 }
				 else 
				 {
					res.status(400).json({								 
								  message: 'Authenication Failed !',
								  token: null
								});	
				 }
				 
														
			});
});


module.exports = routelogin ;