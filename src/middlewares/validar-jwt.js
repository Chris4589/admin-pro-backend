const responses = require('../functions/response.functions');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{

    try {
        const { token } = req.headers;

        if(!token)
            return responses(res, 401, `No hay token`, true);

        const { uid } = jwt.verify(token, process.env.JWTSECRET);

        req.uid = uid;
        next();
    } catch (error) {
        console.log(`Logs walidar.jwt ${error}`);
        return responses(res, 401, `token invalido`, true);
    }
}