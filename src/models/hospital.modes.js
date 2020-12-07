'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospital = new Schema({
    
    username:{
        type:String,
        required:true,
        trim:true
    },
});
/*
const user = new Schema({
    username:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    }
});

module.exports = mongoose.model('user', user);*/

//nombre obli
//usuario obli
//img temp