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

async function uploadToCloudinary(nombre_imagen) {
  // locaFilePath :
  // path of image which was just uploaded to "uploads" folder
  const folderClaudinary = 'home' //&&pendiente colocar nombre correcto en claudinary, ¿si no existe lo crea? CONFIRMAR
  // filePathOnCloudinary :
  // path of image we want when it is uploded to cloudinary
  const rutaClaudinary = folderClaudinary + '/' + nombre_imagen
  return cloudinary.uploader
    .upload('uploads/' + nombre_imagen, { public_id: rutaClaudinary })
    .then(result => {
      // remueve la imagen de uploads cuando se suba a cloudinary de forma correcta
      fs.unlinkSync('uploads/' + nombre_imagen) // && ELIMINA EL ARCHIVO DEL SERVIDOR  salga bién o mal
      return {
        message: 'Success',
        url: result.url
      }
    })
    .catch(error => {
      console.log(error)
      // Remove file from local uploads folder
      fs.unlinkSync('uploads/' + nombre_imagen)
      return { message: 'Fail' }
    })
}

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
app.use('/api/cliente', clientesRoute)
app.use('/api/loginCliente', loginClienteRoute)
app.post('/api/profile-upload-single', upload.single('profile-file'), async (req, res, next) => {
  const nombre_imagen = req.file.filename
  const result = await uploadToCloudinary(nombre_imagen)
  const { url } = result //&& a guardar en base de datos #####

  res.status(200).json({ message: 'success' })
  //var response = buildSuccessMsg([result.url])
  //return res.send(response)
})

app.listen(port, () => {
  console.log('server on port:', port)
})
