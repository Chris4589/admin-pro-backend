
const user = require('../models/users.model');
const responses = require('../functions/response.functions');

const bcrypt = require('bcryptjs');
const jwt = require('../helpers/jwt');

var result;

module.exports = {
    cback_findUser: async(req, res)=>{
        try {
            const { start, end, ...params } = req.query;
            params.start = start || 0;
            params.end = end || 5;

            const [ data, total ] = await Promise.all([
                user.find({}, 'email role nombre google img')
                    .skip(Number(params.start))
                    .limit(Number(params.end)),

                user.count()
            ]);
            
            return responses(res, 200, {data, total}, false);
        } catch (error) {
           console.log(`*Error al cargar usuarios ${error}`); 
           return responses(res, 500, `-Error al cargar usuarios ${error}`, true);
        }
    },
    cback_createUser: async(req, res)=>{
        try {
            const { email, password, ...fields } = req.body;

            result = await user.findOne({ email });
            if( result ) return responses(res, 400, `Ya registrado`, true);
            
            const salt = bcrypt.genSaltSync();
            fields.email = email;
            fields.password = bcrypt.hashSync(password, salt);

            result = await user.create(fields);

            const token = await jwt(result._id);

            return responses(res, 200, {result, token}, false);
        } catch (error) {
           console.log(`*Error al crear usuario ${error}`); 
           return responses(res, 500, `Error en el servidor`, true);
        }
    },
    cback_updateUser:async(req, res)=>{
        try {
            const { _id } = req.query;
            const { email, password, google, ...fields } = req.body;

            if(_id.match(/^[0-9a-fA-F]{24}$/)) {
                result = await Promise.all([user.findById(_id), user.findOne({email})]);
                
                if(!result[0]) return responses(res, 400, `No existe el usuario`, true);
                if(result[1] && email !== result[0].email)
                    return responses(res, 400, `El mail ya existe`, true);
                

                if(!result[0].google)
                    fields.email = email;
                
                result = await user.findByIdAndUpdate(_id, fields, {new:true});
                
                return responses(res, 200, result, false);
            }
            return responses(res, 400, `ID invalida`, true);      
        } catch (error) {
           console.log(`*Error al actualizar usuario ${error}`); 
           return responses(res, 500, `Error en el servidor`, true);
        }
    },
    cback_deleteUser:async(req, res)=>{
        try {
            const { _id } = req.query;

            if(req.uid === _id)
                return responses(res, 400, `No puedes borrarte a ti mismo`, true);

            if(_id.match(/^[0-9a-fA-F]{24}$/)){
                result = await user.findById(_id);

                if(!result)
                    return responses(res, 400, `ID no existenten`, true);
                
                result = await user.findByIdAndDelete(_id);

                return responses(res, 200, result, false);
            }
            else
                return responses(res, 400, `ID invalida`, true);
        } catch (error) {
            console.log(`Error al eliminar usuario ${error}`);
            return responses(res, 500, `Error en el servidor: al eliminar`, true);
        }
    }
}


