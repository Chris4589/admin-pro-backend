const { Router } = require('express');
const router = Router();
const { login,  googleSingIn } = require('../controllers/auth.controllers');
const { createValidator } = require('express-joi-validation');
const { loginValidator, loginToken } = require('../controllers/validators/user.validators');
const validator = createValidator({ passError:true });

module.exports = () => {
    router.post('/login/', 
        validator.body(loginValidator), 
        login);
    
    router.post('/login/google/', 
        validator.body(loginToken), 
        googleSingIn);

    return router;
}