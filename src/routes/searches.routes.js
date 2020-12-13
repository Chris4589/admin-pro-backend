const { Router } = require('express');
const Joi = require('joi');

const { cback_getAll, cback_Collection } = require('../controllers/searches.controllers');
const validarJWT = require('../middlewares/validar-jwt');
const validator = require('express-joi-validation').createValidator({passError:true});
const router = Router();

module.exports = () => {
    router.get('/todo/', [
            validarJWT,
            validator.query(Joi.object({
                search:Joi.string().required().not().empty()
            }))
        ], 
        cback_getAll);

    router.get('/collection/', [
        validarJWT,
        validator.query(Joi.object({
                searches:Joi.string().required().not().empty(),
                table:Joi.string().required().not().empty(),
            }))
        ], cback_Collection);

    return router;
}