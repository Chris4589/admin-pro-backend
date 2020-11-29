const mongoose = require('mongoose');

module.exports = (url) =>{
    mongoose.Promise = global.Promise;
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
    return mongoose;
}