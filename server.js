const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') // cors + concurrently permite conectar el backend y el frontEnd
const productosRoute = require('./routes/routeProductos.js')
const carritoRoute = require('./routes/routeCarrito.js')
const clientesRoute = require('./routes/routeClientes.js')
const loginClienteRoute = require('./routes/routeLoginCliente.js')
//&&clientesroute

const dotenv = require('dotenv') // utilizo las variables de ambiente
dotenv.config({ path: './config.env' })

const app = express()
const port = process.env.PORT || 8080 // si no hay puerto asignado, va al 8080

// conexion a la base de datos
// ups, ha de salir de las variables de ambiente
const uri = `mongodb+srv://admin:${process.env.PASSWORD_DB}@cluster0.mzbdm.mongodb.net/caprichosa?retryWrites=true&w=majority`
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('conectado a mongodb desde clientes'))
  .catch(e => console.log('error de conexión', e))

const whitelist = [
  // Allow domains here
  'http://localhost:3000/',
  'http://localhost:3001/',
  'http://localhost/',
  'http://127.0.0.1:3001/'
]
const corsOptions = {
  origin(origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(null, originIsWhitelisted)
  },
  credentials: true
}
//aplicanco el cors de forma global
app.use(cors()) // sin cors option funciona, aunque se podrá meter todo el mundo whitelist de adorno y corsOption también

app.use(express.urlencoded({ extended: false })) //&&¿qué hago aquí?
app.use(express.json())

// routes api
app.use('/api/carrito', carritoRoute)
app.use('/api/producto', productosRoute)
app.use('/api/cliente', clientesRoute)
app.use('/api/loginCliente', loginClienteRoute)

app.listen(port, () => {
  console.log('server on port:', port)
})
