let fs = require('fs');
let config = require('../config.js');

class FileIO  {

    constructor(filename)
    {
        this.fullPath = config.dataPath + filename;
    }

    /* 
        checkFile is existing or not
    */
    checkFile(callback)
    {
        if (fs.existsSync(this.fullPath))
        {
            callback(true);
        }
        else {
          callback(fasle);    
        }
    }

    createJSONFile(callback)
	 {
		 fs.appendFileSync(this.fullpath, '[ ]', function (err) {
			  if (err){
				  callback(false);
			  }
			  else {
				  callback(true);
				  }
		});
	 }
     
     getDataWithRead(callback)
	 {
	    fs.readFile(this.fullpath, (err,data)=>
			{
				 if (!err){
					   
					callback(JSON.parse(data.toString()));    
				}else
				{		 
					callback({'message':'no record found'});
				}
		});
     }
     
     getData(callback)
     {
         this.checkFile((r)=>{
             if (r)
             {
                 this.getDataWithRead((resp)=>{
                     callback(resp);
                 })
             }
             else
             {
                 this.createJSONFile((resp)=>{
                    if(resp)
                    {
                       this.getDataWithRead((data)=>{
                           callback(data);
                       })     
                    }
                    else{
                        callback({'message':'file not found'});
                    }
                 })
             }
         })
     }

     writeData(data,callback)
	 {
		 this.CheckFile((r)=>{
			if (r)
			{
				fs.writeFile(this.fullpath, JSON.stringify(data), function(err) {
					if(err) {
						callback({'message':err,'success': false});
					}
					else {
                        callback({'message':'file write','success':true})
                    }
				});						
			}
			else 
			{
				callback({'message':'file not found','success':fasle});
			}
		 })
	 }

}