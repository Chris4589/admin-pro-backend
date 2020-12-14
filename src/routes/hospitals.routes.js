const { Router } = require('express');
const router = Router();
const { 
    cback_getHospitales, 
    cback_createHospital, 
    cback_deleteHospital, 
    cback_updateHospital 
} = require('../controllers/hospitals.controller');

const validarJWT = require('../middlewares/validar-jwt');
const validator = require('express-joi-validation').createValidator({ passError:true });
const Joi = require('joi');

module.exports = () => {

    router.get('/hospitals/', [
            validarJWT
        ],
        cback_getHospitales);

    router.put('/hospitals/', [
        validarJWT,
        validator.query(
            Joi.object({
                _id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
            })
        ),
        validator.body(
            Joi.object({
                nombre:Joi.string().required().not().empty()
            })
        )
    ],
     cback_updateHospital);

    router.post('/hospitals/', [
        validarJWT,
        validator.body(
            Joi.object({
                nombre:Joi.string().required().not().empty()
            })
        )
    ],
     cback_createHospital);

    router.delete('/hospitals/', [
        validarJWT,
        validator.query(
            Joi.object({
                _id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
            })
        )
    ],
     cback_deleteHospital);
    
    return router;
}