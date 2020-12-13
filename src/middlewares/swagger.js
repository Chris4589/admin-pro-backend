const Joi = require('joi');
const swaggerOptions = {
    swagger: "2.0",
    pathPrefixSize: 2,
    info: {
        title: 'API docs for signup service',
        description: ' This service is used for register new users ',
        version: '0.1.0'
    },
    paths:{
        "/users/":{
            "get":{
        
                responses:{
                    200:{
                        description: 'Will send Authenticated'
                    },
                    401: {
                        description: 'You do not have necessary permissions for the resource'
                    }
                    
                }
            }
        }
    }
};

module.exports = (req, res, next)=>{
    swaggerOptions.host = req.get('host'); 
    req.swaggerDoc = swaggerOptions; 
    next();
}