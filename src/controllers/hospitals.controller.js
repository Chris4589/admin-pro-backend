const responses = require('../functions/response.functions');
const hospital = require('../models/hospital.model');
var result;

module.exports = {
    cback_getHospitales: async(req, res)=>{
        try {
            result = await hospital.find().populate('user', 'nombre img');//traer esos datos de otra collecion por llave ref
            return responses(res, 200, result, false);
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
        responses(res, 200, 'up', false);
    },
    cback_deleteHospital: async(req, res)=>{
        responses(res, 200, 'del', false);
    }
};
