const { Router } = require('express');
const Joi = require('joi');
const fileUpload = require('express-fileupload');

const { cback_Upload, cback_getFile } = require('../controllers/upload.controller');

const validarJWT = require('../middlewares/validar-jwt');
const validator = require('express-joi-validation').createValidator({ passError:true });

const router = Router();

module.exports = () => {
    // default options
    router.use(fileUpload());

    router.put('/upload/', [
            validarJWT,
            validator.query(Joi.object({
                collection:Joi.string().required().not().empty(), 
                _id:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).not().empty()
            }))
        ], cback_Upload);

    router.get('/upload/', [
            validarJWT,
            validator.query(Joi.object({
                collection:Joi.string().required().not().empty(), 
                file:Joi.string().required().not().empty()
            }))
        ], cback_getFile);

    return router;
}