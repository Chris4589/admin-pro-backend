const hospital = require('./user.routes');
const auth = require('./auth.routes');

module.exports = [].concat(hospital(), auth());