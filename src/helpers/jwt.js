const jwt = require('jsonwebtoken');

module.exports = (uid) =>{

    return new Promise((resolve, reject) =>{
        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn: '24h',
        }, (err, token)=>{
            if(err){
                console.log(`error jtw ${err}`);
                reject(`Error jwt ${err}`);
                return;
            }
            resolve(token);
        });
    });

        
}