const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const router = require('./routes/routes');
const db = require('./configs/db');
const validations = require('./middlewares/validaciones-joi');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swagger = require('./middlewares/swagger');
const port = process.env.PORT || 3030;

//mean
//ugFF9tZeeEiTE3kx

//google sign
//id
//323474616110-skletftrtlg9qt662222t39tn87e04h6.apps.googleusercontent.com

//66sb_9OKFFc48h01cGsgAwYp
db(process.env.DATABASE)
    .then(res=> console.log(`connect db`))
    .catch(err =>console.log(`error : ${err}`));

app.use(cors());

app.use(express.json());

app.use(express.static('src/public'));

app.use('/', router);

app.use(validations);

app.use('/api-docs', swagger, swaggerUi.serve, swaggerUi.setup());

//devolver rutas a angular
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'src/public/index.html'));
});

app.listen(port, ()=>{
    console.log(`Server en puerto ${port}`);
});
