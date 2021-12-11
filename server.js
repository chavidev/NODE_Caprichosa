const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer') //recibe las imágenes y los videos
const fs = require('fs')
const cloudinary = require('cloudinary').v2
const cors = require('cors') // cors + concurrently permite conectar el backend y el frontEnd
const productosRoute = require('./routes/routeProductos.js')
const carritoRoute = require('./routes/routeCarrito.js')
const clientesRoute = require('./routes/routeClientes.js')
const loginClienteRoute = require('./routes/routeLoginCliente.js')
const shoppingCartRoute = require('./routes/routeShoppingCart.js')
const pedidoRoute = require('./routes/routePedido.js')
//&&clientesroute

const dotenv = require('dotenv') // utilizo las variables de ambiente
dotenv.config({ path: './config.env' })

const app = express()
const port = process.env.PORT || 8080 // si no hay puerto asignado, va al 8080

//confuguramos multer, y lo cargamos en el servidor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY
})

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
// si comento la siguiente línea sigue funcionando ¡¡¡ TENDRÍA QUE CAERSE !!! pero sigue funcionando la ruta http://localhost:3000/clientes
app.use(cors()) // sin cors option funciona, aunque se podrá meter todo el mundo whitelist de adorno y corsOption también

app.use(express.urlencoded({ extended: false })) //&&¿qué hago aquí?
app.use(express.json()) //&&¿qué hago aquí?

// routes api
app.use('/api/carrito', carritoRoute)
app.use('/api/producto', productosRoute)
app.use('/api/cliente', upload.single('profile-file'), clientesRoute)
app.use('/api/loginCliente', loginClienteRoute)
app.use('/api/shoppingCart', shoppingCartRoute)
app.use('/api/pedido', pedidoRoute)

app.listen(port, () => {
  console.log('server on port:', port)
})
