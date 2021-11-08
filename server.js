const express = require('express');
const mongoose = require('mongoose');
const productosRoute = require('./routes/productos.js');

const dotenv = require('dotenv');  // utilizo las variables de ambiente
dotenv.config({ path: './config.env' });

const app = express();

const port = process.env.PORT || 8080;   // si no hay puerto asignado, va al 8080

// conexion a la base de datos 
const uri = `mongodb+srv://admin:${process.env.PASSWORD_DB}@cluster0.mzbdm.mongodb.net/caprichosa?retryWrites=true&w=majority`
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb'))
  .catch(e => console.log('error de conexión', e)); 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes api
app.use('/api', productosRoute); 

app.listen(port, () => { console.log('server on port:', port) });



//process.env.PORT