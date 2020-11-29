const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./routes/routes');
const db = require('./configs/db');
require('dotenv').config();

const port = process.env.PORT || 3030;

//mean
//ugFF9tZeeEiTE3kx

db(process.env.DATABASE);

app.use(cors());
app.use('/', router);

app.listen(port, ()=>{
    console.log(`Server en puerto ${port}`);
});