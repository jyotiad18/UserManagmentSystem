const Joi = require('joi');

module.exports = {
    CheckValidation(value,schema,callback)
    {
        Joi.validate(value,schema,(error,value)=>{
            
            if (!error) callback(true);
            else 
             callback(false);

        });
    }
}