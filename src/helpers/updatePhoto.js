const fs = require('fs');

const user = require('../models/users.model');
const doctor = require('../models/doctor.model');
const hospital = require('../models/hospital.model');

var result;

const existsFile = (collection, FileName) =>{
    const OldPath = `./src/uploads/${collection}/${FileName}`;

    if(fs.existsSync(OldPath))
        return true;
    
    return false;
}

const deleteFile = (collection, FileName) =>{
    const OldPath = `./src/uploads/${collection}/${FileName}`;

    if(fs.existsSync(OldPath))
        fs.unlinkSync(OldPath);
}

const updateFile = async(_id, collection, FileName) => {
   switch (collection) {
        case 'hospitals':
            result = await hospital.findById(_id);

            if(!result) return false;

            deleteFile(collection, result.img);

            result.img = FileName;
            await result.save();

            return true;
        case 'users':
            result = await user.findById(_id);

            if(!result) return false;

            deleteFile(collection, result.img);
            
            result.img = FileName;
            await result.save();

            return true;
        case 'doctors':
            result = await doctor.findById(_id);

            if(!result) return false;

            deleteFile(collection, result.img);
            
            result.img = FileName;
            await result.save();

            return true;
   }
}

module.exports ={
    updateFile,
    existsFile
}