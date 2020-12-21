const responses = require('../functions/response.functions');
const { v4: uuidv4 } = require('uuid');
const { updateFile, existsFile } = require('../helpers/updatePhoto');

const path = require('path');

module.exports = {
    cback_Upload:async(req, res)=>{
        try {
            const { files, query } = req;
            const { collection, _id } = query;
            
            const typeValid = ['hospitals', 'doctors', 'users'];

            if(!typeValid.includes(collection))
                return responses(res, 400, `No es un hospitals, doctors, users.`, true);

            if (!files || Object.keys(files).length === 0)
               return responses(res, 400, `No files were uploaded.`, true);
            
            const file = files.img;
            const namecortado = file.name.split('.');
            const extension = namecortado[namecortado.length-1];
            const validExtends = [ 'png', 'gif', 'jpg', 'jpeg'];

            if(!validExtends.includes(extension))
                return responses(res, 400, `invalid extension`, true);

            const FileName = `${uuidv4()}.${extension}`;
            const pathFile = `./src/uploads/${collection}/${FileName}`;
            
            file.mv(pathFile, async (err)=> {
                if (err){
                    return responses(res, 500, `Logs: ${err}`, true);
                }
                const status = await updateFile(_id, collection, FileName);
                return responses(res, 200, {msg:'File uploaded!', status, FileName}, false);
            });

        } catch (error) {
            return responses(res, 500, `Logs: ${error}`, true);
        }
    },
    cback_getFile:async(req, res)=>{
        try {
            const { collection, file } = req.query;

            const pathImg = path.join( __dirname, `../uploads/${collection}/${file}` );

            if(!existsFile(collection, file)){
                const notExistsImg = path.join( __dirname, '../uploads/no-img.jpg' );
                return res.status(200).sendFile(notExistsImg);
            }
            
            return res.status(200).sendFile(pathImg);

        } catch (error) {
            return responses(res, 500, `Logs: ${error}`, true);
        }
    }
}