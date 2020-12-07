const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./routes/routes');
const db = require('./configs/db');
require('dotenv').config();

const port = process.env.PORT || 3030;

//mean
//ugFF9tZeeEiTE3kx

db(process.env.DATABASE)
    .then(res=> console.log(`connect db ${res}`))
    .catch(err =>console.log(`error : ${err}`));

app.use(cors());

app.use(express.json());

app.use('/', router);

app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        return res.status(400).json({
            error:true,
            type: err.type,
            message: err.error.message
        });
    }
    next(err);
});

app.listen(port, ()=>{
    console.log(`Server en puerto ${port}`);
});

