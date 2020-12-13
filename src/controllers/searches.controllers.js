const responses = require('../functions/response.functions');
const user = require('../models/users.model');
const doctor = require('../models/doctor.model');
const hospital = require('../models/hospital.model');

var result;

module.exports = {
    cback_getAll:async(req, res)=>{
        try {
            const { search } = req.query;
            const regex = new RegExp(search, 'i');
            
            const [ users, doctors, hospitals ] = await Promise.all([
                user.find({nombre:regex}, ''),
                doctor.find({nombre:regex}, ''),
                hospital.find({nombre:regex}, '')
            ]);

            return responses(res, 200, { users, doctors, hospitals }, false);
        } catch (error) {
            return responses(res, 500, `logs ${error}`, true);
        }
    },
    cback_Collection: async(req, res)=>{
        try {
            const { table, searches } = req.query;
            const regex = new RegExp(searches, 'i');

            switch (table) {
                case 'medicos':
                    result = await doctor.find({nombre:regex}, '')
                                        .populate('user', 'nombre img')
                                        .populate('hospital', 'nombre img');
                    break;
                case 'hospitals':
                    result = await hospital.find({nombre:regex}, '').populate('user', 'nombre img');
                    break;
                case 'users':
                    result = await user.find({nombre:regex}, '')
                    break;
                default:
                    return responses(res, 400, `Solo tables medicos, hospitals, users`, true);
            }

            return responses(res, 200, result, false);
        } catch (error) {
            return responses(res, 500, `logs ${error}`, true);
        }
    }
};