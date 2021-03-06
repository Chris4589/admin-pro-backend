const responses = require('../functions/response.functions');
const hospital = require('../models/hospital.model');
var result;

module.exports = {
    cback_getHospitales: async(req, res)=>{
        const { start, end, ...params } = req.query;
            params.start = start || 0;
            params.end = end || 5;

        try {
            const [ data, total ] = await Promise.all([
                hospital.find().populate('user', 'nombre img')
                        .skip(Number(params.start))
                        .limit(Number(params.end)),

                hospital.count()
            ]);
            
            return responses(res, 200, {data, total}, false);
        } catch (error) {
            return responses(res, 500, `Logs ${error}`, true);
        }
    },
    cback_createHospital: async(req, res)=>{
        try {
            const { ...data } = req.body;
            data.user = req.uid;
            result = await hospital.create(data);

            return responses(res, 200, result, false);
        } 
        catch (error) {
            return responses(res, 500, `Logs: hos_controller ${error}`, true);
        }
    },
    cback_updateHospital: async(req, res)=>{
        try {
            const { _id } = req.query;
            const { nombre } = req.body;

            const [ exists, register ] = await Promise.all([hospital.findById(_id), hospital.findOne({nombre})]);
            
            if(!exists) return responses(res, 400, `No existe el hosítal`, true);
            if(register && nombre !== register.nombre) return responses(res, 400, `El nombre ya existe`, true);

            exists.nombre = nombre;
            exists.user = req.uid;
            exists.save();
            
            return responses(res, 200, exists, false);
        } catch (error) {
            return responses(res, 500, `Logs: cback_updateHospital ${error}`, true);
        }
    },
    cback_deleteHospital: async(req, res)=>{
        try {
            const { _id } = req.query;

            result = await hospital.findById(_id);

            if(!result)
                return responses(res, 400, `No existe el hosítal`, true);

            result = await hospital.findByIdAndDelete(_id);

            return responses(res, 200, result, false);
        } catch (error) {
            return responses(res, 500, `Logs: cback_updateHospital ${error}`, true);
        }
    }
};
