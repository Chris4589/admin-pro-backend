const { Router } = require('express');
const router = Router();
const { login } = require('../controllers/auth.controllers');
const { createValidator } = require('express-joi-validation');
const { loginValidator } = require('../controllers/validators/user.validators');
const validator = createValidator({ passError:true });

module.exports = () => {
    router.post('/login/', 
        validator.body(loginValidator), 
        login);

    return router;
}