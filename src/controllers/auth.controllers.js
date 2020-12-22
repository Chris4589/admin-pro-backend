const user = require('../models/users.model');
const responses = require('../functions/response.functions');
const bcrypt = require('bcryptjs');
const jwt = require('../helpers/jwt');
const menu = require('../helpers/menu-front');

const { googleVerify } = require('../helpers/google-verify');

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

            req.loged = 1;
            const generarToken = await jwt(result._id);

            return responses(res, 200, {generarToken, menu:menu(result.role)}, false);
        } catch (error) {
            console.log(`*login ${error}`); 
            return responses(res, 500, `Error en el servidor`, true);
        }
    },
    googleSingIn:async(req, res)=>{
        try {
            const { token } = req.body;

            const { name, email, picture } = await googleVerify(token);

            result = await user.findOne({ email });
            if( !result ){
                result = await user.create({
                    nombre: name,
                    email,
                    password: '@@@@',
                    img: picture,
                    google:true
                });
            }
            else{
                //existe en DB lo de google
                result.google = true;

                result.save();
            }
            req.loged = 1;
            const token_jwt = await jwt(result._id);

            return responses(res, 200, {token_jwt, menu:menu(result.role)}, false);
        } catch (error) {
            console.log(`*login google signIn ${error}`); 
            return responses(res, 401, `*login google signIn ${error}`, true);
        }
    },
    renewToken:async(req, res)=>{
        try {
            const { uid } = req;

            const [ token, data ] = await Promise.all([
                jwt(uid),
                user.findById(uid, 'role google _id nombre email img')
            ]);

            return responses(res, 200, {token, data, menu:menu(data.role)}, false);
        } catch (error) {
            console.log(`*login ${error}`); 
            return responses(res, 500, `*renew token ${error}`, true);
        }
    }
}