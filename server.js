const express = require('express');
const mongoose = require('mongoose');
const productosRoute = require('./routes/routeProductos.js');
const clientesRoute = require('./routes/routeClientes.js');
//&&clientesroute

const dotenv = require('dotenv');  // utilizo las variables de ambiente
dotenv.config({ path: './config.env' });

const app = express();

const port = process.env.PORT || 8080;   // si no hay puerto asignado, va al 8080

// conexion a la base de datos 
// ups, ha de salir de las variables de ambiente
const uri = `mongodb+srv://admin:${process.env.PASSWORD_DB}@cluster0.mzbdm.mongodb.net/caprichosa?retryWrites=true&w=majority`
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb desde clientes'))
  .catch(e => console.log('error de conexión', e)); 

app.use(express.urlencoded({ extended: false }));  //&&¿qué hago aquí?
app.use(express.json());

// routes api
app.use('/api/producto', productosRoute); 
app.use('/api/cliente', clientesRoute); 

app.listen(port, () => { console.log('server on port:', port) });

