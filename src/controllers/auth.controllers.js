const user = require('../models/users.model');
const responses = require('../functions/response.functions');
const bcrypt = require('bcryptjs');
const jwt = require('../helpers/jwt');

var result;

module.exports = {
    login: async(req, res)=>{
        try {
            const { email, password } = req.body;

            result = await user.findOne({ email });

            if(!result)
                return responses(res, 400, `Email no valido`, true);

            const validPw = bcrypt.compareSync(password, result.password);

            if(!validPw)
                return responses(res, 400, `password no valido`, true);

            const generarToken = await jwt(result._id);

            return responses(res, 200, generarToken, false);
        } catch (error) {
            console.log(`*login ${error}`); 
            return responses(res, 500, `Error en el servidor`, true);
        }
    }
}