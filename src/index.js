const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./routes/routes');
const db = require('./configs/db');
const validations = require('./middlewares/validaciones-joi');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swagger = require('./middlewares/swagger');
const port = process.env.PORT || 3030;

//mean
//ugFF9tZeeEiTE3kx

db(process.env.DATABASE)
    .then(res=> console.log(`connect db ${res}`))
    .catch(err =>console.log(`error : ${err}`));

app.use(cors());

app.use(express.json());

app.use('/', router);

app.use(validations);

app.use('/api-docs', swagger, swaggerUi.serve, swaggerUi.setup());


app.listen(port, ()=>{
    console.log(`Server en puerto ${port}`);
});
