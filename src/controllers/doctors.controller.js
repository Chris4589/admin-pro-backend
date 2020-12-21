const responses = require('../functions/response.functions');
const doctor = require('../models/doctor.model');

var result;

module.exports = {
    cback_getDoctor: async(req, res)=>{
        try {
            const { _id } = req.query;

            if(_id){
                result = await doctor.findById(_id).populate('user', 'nombre img').populate('hospital', 'nombre img');
                return responses(res, 200, result, false);
            }

            result = await doctor.find().populate('user', 'nombre img').populate('hospital', 'nombre img');
            return responses(res, 200, result, false);
        } catch (error) {
            return responses(res, 500, `Logs ${error}`, true);
        }
    },
    cback_createDoctor: async(req, res)=>{
        try {
            const { ...data } = req.body;

            data.user = req.uid;
            result = await doctor.create(data);

            return responses(res, 200, result, false);
        } catch (error) {
            return responses(res, 500, `Logs: ${error}`, true);
        }
    },
    cback_updateDoctor: async(req, res)=>{
        try {
            const { _id } = req.query;
            const { nombre, hospital } = req.body;

            const [ exists, register ] = await Promise.all([doctor.findById(_id), doctor.findOne({nombre})]);
            
            if(!exists) return responses(res, 400, `No existe el doctor`, true);
            if(register && nombre !==register.nombre) return responses(res, 400, `El nombre ya existe`, true);

            exists.nombre = nombre;
            exists.hospital = hospital;
            exists.user = req.uid;

            exists.save();
            
            return responses(res, 200, exists, false);

        } catch (error) {
            return responses(res, 500, `Logs: ${error}`, true);
        }
    },
    cback_deleteDoctor: async(req, res)=>{
        try {
            const { _id } = req.query;

            result = await doctor.findById(_id);
            if(!result) return responses(res, 400, `No existe el doctor`, true);

            result = await doctor.findByIdAndDelete(_id);
            return responses(res, 200, result, false);
        } catch (error) {
            return responses(res, 500, `Logs: ${error}`, true);
        }
    }
};
