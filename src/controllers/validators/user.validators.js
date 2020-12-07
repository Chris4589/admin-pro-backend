const Joi = require('joi');

module.exports = {
    queryId: Joi.object({
        _id: Joi.string().required()
    }),
    bodyPut: Joi.object({
        email: Joi.string().required(),
        nombre: Joi.string().required()
    }),
    bodyPost: Joi.object({
        email: Joi.string().required(),
        nombre: Joi.string().required(),
        password: Joi.string().required()
    }),
    loginValidator: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}