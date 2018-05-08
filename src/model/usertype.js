'use strict';
const Joi = require('joi');
module.exports = {
    schema : Joi.object().keys(
            {
                typename : Joi.string().required()
            }
        ).with('typename',[])
}