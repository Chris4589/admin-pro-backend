'use strict';

const { model, Schema } = require('mongoose');

const Hospital = new Schema({
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
        ref: 'user',
        required:false
    }
});

Hospital.method('toJSON', function (){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('hospitals', Hospital);


//nombre obli
//usuario obli
//img temp