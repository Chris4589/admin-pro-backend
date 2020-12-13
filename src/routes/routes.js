const hospital = require('./user.routes');
const auth = require('./auth.routes');
const hospitals = require('./hospitals.routes');
const doctors = require('./doctors.routes');
const searches = require('./searches.routes');
const upload = require('./upload.routes');

module.exports = [].concat(hospital(), auth(), hospitals(), doctors(), searches(), upload());