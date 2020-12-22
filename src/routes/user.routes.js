const { Router } = require('express');
const router = Router();
const { createValidator } = require('express-joi-validation');
const { queryId, bodyPost, bodyPut } = require('../controllers/validators/user.validators');
const validatorJWT = require('../middlewares/validar-jwt');
const { roleAdmins, RoleUserAndId } = require('../middlewares/userRole');

const validator = createValidator({ passError:true });

const { cback_findUser, cback_createUser, cback_updateUser, cback_deleteUser } = require('../controllers/user.controller');

module.exports = () =>{

    router.get('/users/', [
        validatorJWT,
        roleAdmins
    ], cback_findUser);

    router.post('/users/', [
            validator.body(bodyPost)
        ],
        cback_createUser);
            
    router.put('/users/', [
            validatorJWT, 
            RoleUserAndId,
            validator.query(queryId),
            validator.body(bodyPut)
        ],
        cback_updateUser);

    router.delete('/users/', [
            validatorJWT,
            roleAdmins,
            validator.query(queryId)
        ],
        cback_deleteUser);

    return router;
}