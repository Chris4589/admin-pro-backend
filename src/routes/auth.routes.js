const { Router } = require('express');
const router = Router();
const { login,  googleSingIn, renewToken } = require('../controllers/auth.controllers');
const { createValidator } = require('express-joi-validation');
const { loginValidator, loginToken } = require('../controllers/validators/user.validators');
const validator = createValidator({ passError:true });
const validarJWT = require('../middlewares/validar-jwt');

module.exports = () => {
    router.post('/login/', 
        validator.body(loginValidator), 
        login);
    
    router.post('/login/google/', 
        validator.body(loginToken), 
        googleSingIn);

    router.get('/login/renew/', 
        validarJWT, 
        renewToken);

    return router;
}