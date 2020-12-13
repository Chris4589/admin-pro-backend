//nombre string obligatorio
//correo string obligatorio
//contraseña string temp
//img string obligatorio
//rol string obligatorio
//google bool temp

const { Schema, model } = require('mongoose');

const User = new Schema({
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:false
    },
    role:{
        type:String,
        required:true,
        default: 'USER_ROLE'
    },
    google:{
        type:Boolean,
        required:false,
        default:false
    }
});


module.exports = model('user', User);