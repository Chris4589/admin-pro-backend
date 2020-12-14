const Joi = require('joi');

module.exports = {
    queryId: Joi.object({
        _id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
    }),
    bodyPut: Joi.object({
        email: Joi.string().required().not().empty(),
        nombre: Joi.string().required().not().empty()
    }),
    bodyPost: Joi.object({
        email: Joi.string().required().not().empty(),
        nombre: Joi.string().required().not().empty(),
        password: Joi.string().required().not().empty()
    }),
    loginValidator: Joi.object({
        email: Joi.string().required().not().empty(),
        password: Joi.string().required().not().empty()
    }),
    loginToken: Joi.object({
        token:Joi.string().required().not().empty()
    })
}