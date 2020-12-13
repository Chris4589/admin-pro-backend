const responses = require('../functions/response.functions');
const doctor = require('../models/doctor.model');

var result;

module.exports = {
    cback_getDoctor: async(req, res)=>{
        try {
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
            console.log(data);
            result = await doctor.create(data);

            return responses(res, 200, result, false);
        } catch (error) {
            return responses(res, 500, `Logs: ${error}`, true);;
        }
    },
    cback_updateDoctor: async(req, res)=>{
        responses(res, 200, 'up', false);
    },
    cback_deleteDoctor: async(req, res)=>{
        responses(res, 200, 'del', false);
    }
};
