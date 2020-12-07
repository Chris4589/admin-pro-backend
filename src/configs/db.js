const mongoose = require('mongoose');

module.exports = async (url) =>{
    mongoose.Promise = global.Promise;
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
    return mongoose;
}