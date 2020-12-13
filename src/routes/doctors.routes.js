const { Router } = require('express');
const Joi = require('joi');
const router = Router();

const { 
    cback_createDoctor,
    cback_deleteDoctor,
    cback_getDoctor,
    cback_updateDoctor
} = require('../controllers/doctors.controller');

const validarJwt = require('../middlewares/validar-jwt');
const validator = require('express-joi-validation').createValidator({ passError:true })

module.exports = () => {

    router.get('/doctors/', cback_getDoctor);

    router.put('/doctors/', cback_updateDoctor);

    router.post('/doctors/', [
            validarJwt,
            validator.body(
                Joi.object({
                    nombre:Joi.string().required().not().empty().description('asd'),
                    hospital:Joi.string().required().not().empty().regex(/^[0-9a-fA-F]{24}$/).description('asd')
                })
            )
        ], 
        cback_createDoctor);

    router.delete('/doctors/', cback_deleteDoctor);
    
    return router;
}