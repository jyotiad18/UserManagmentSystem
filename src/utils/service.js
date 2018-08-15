'use strict';

const fileIO = 	require('../utils/fileio.js');
var _ = require('lodash');
const uuidv1 = require('uuid/v1');

class Service extends Fileio{
	// GET 
	constructor(filename)
	{
		super(filename);

	}
	
	getAll(callback)
	{
	   try {
	       this.getData((r)=>{
	            callback(r);
	       })
	   }
	   catch(error)
	   {
	       callback([]);
		   console.log(error);
	   }
	}
	
	getByValue(params,callback)
	{
		try{
			if (typeof(params) === "object")
			{
				if (Object.keys(params).length > 0) {
					this.getData((r) => {
					  
					  callback(_.filter(r, params));
						 
					})
				} else 
				{
					callback({"message":"object is Blank"});
				}
			}
			else
			{
				callback({"message":"object is not valid"});
			}
		}
		catch(error)
		{
			console.log(error);
		}
	}
	
	// Searching through object 
	
	getBySearch(params,callback)
	{
	    if (params === "")
	    	callback({"error":"paras isnot Object"});
	    else 
	    {
	        params = JSON.parse(params);
	    	this.getByValue(params,(response)=>{
	    		callback(response);
	    	});
	    }
	}
	//Insert
	post(params,callback)
	{
		try {
			
			params['id'] = uuidv1();
			this.getAll((resp)=>{
			    resp.push(params);
				//r.push(params);
				this.writeData(resp,(v)=>{
				callback(v);
			});
				
			});
			
		}
		catch(error)
		{
			console.log(error);
		}
	}
	//Update
	put(params,id,callback)
	{
		try {
			if (id == null || id == 0) callback({'message':'id isnot valid'});
			this.getAll((response)=> {
				var index = _.findIndex(response, function(r) { return r.id == id; });
				if (index >= 0)
				{
					response[index] = params;
					this.writeData(response,(res)=>{
						callback(res);
					});
				}
				else
				{
					callback({'message':'Data not found'});
				}
			})
			
		}
		catch(error)
		{
			console.log(error);
		}
	}
	//Delete
	delete(id,callback)
	{
		try {
			
			if (id == null || id == 0) callback({'message':'id isnot valid'});
			this.getAll((response)=> {
				var index = _.findIndex(response, function(r) { return r.id == id; });
				if (index >= 0)
				{
					response.splice(index, 1)
					this.writeData(response,(res)=>{
						callback(res);
					});
				}
				else
				{
					callback({'message':'Data not found'});
				}
			})
		}
		catch(error)
		{
			console.log(error);
		}
	}

}

module.exports = Service ;