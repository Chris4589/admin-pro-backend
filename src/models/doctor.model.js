//nombre obligatorio
//img temp
//usuario obligatorio ref
//hospital obligatorio ref
//

const { Schema, model } = require('mongoose');

const doctors = new Schema({
    nombre:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:false
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    hospital:{
        type:Schema.Types.ObjectId,
        ref:'hospitals',
        required:true
    }
}, {
    collection:'doctors'//si no quiero que le agregue la S
});

doctors.method('toJSON', function(){
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('doctors', doctors);