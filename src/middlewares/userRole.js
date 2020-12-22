const user = require('../models/users.model');
const responses = require('../functions/response.functions');

module.exports = {
    roleAdmins: async (req, res, next)=>{
        try {
            const { uid } = req;
            
            const usuarioDB = await user.findById(uid);

            if(!usuarioDB)
                return responses(res, 400, `User inexistente`, true);
            else{
                if(usuarioDB.role !== 'ADMIN_ROLE')
                    return responses(res, 403, `User no autorizado`, true);
                else{
                    next();
                }
            }
            
        } catch (error) {
            return responses(res, 500, `rol invalido`, true);
        }
    },
    RoleUserAndId: async (req, res, next)=>{
        try {
            const { uid } = req;
            const { _id } = req.query;
            
            const usuarioDB = await user.findById(uid);

            if(!usuarioDB)
                return responses(res, 400, `User inexistente`, true);
            else{
                if(usuarioDB.role !== 'ADMIN_ROLE' && uid !== _id)
                    return responses(res, 403, `User no autorizado`, true);
                else{
                    next();
                }
            }
            
        } catch (error) {
            return responses(res, 500, `rol invalido`, true);
        }
    }
}