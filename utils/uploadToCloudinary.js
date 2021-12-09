const cloudinary = require('cloudinary').v2
const fs = require('fs')
var path = require('path')

const uploadToCloudinary = async (nombre_imagen, carpeta, id_cliente) => {
  // locaFilePath :
  // path of image which was just uploaded to "uploads" folder
  const folderClaudinary = carpeta //&&pendiente colocar nombre correcto en claudinary, ¿si no existe lo crea? CONFIRMAR
  // filePathOnCloudinary :
  // path of image we want when it is uploded to cloudinary
  const rutaClaudinary = folderClaudinary + '/' + id_cliente
  return cloudinary.uploader
    .upload(path.resolve('./') + '/uploads/' + nombre_imagen, { public_id: rutaClaudinary })
    .then(result => {
      // remueve la imagen de uploads cuando se suba a cloudinary de forma correcta
      fs.unlinkSync(path.resolve('./') + '/uploads/' + nombre_imagen) // && ELIMINA EL ARCHIVO DEL SERVIDOR  salga bién o mal
      return {
        message: 'Success',
        url: result.url,
        result: result
      }
    })
    .catch(error => {
      console.log(error)
      // Remove file from local uploads folder
      fs.unlinkSync(path.resolve('./') + '/uploads/' + nombre_imagen)
      return { message: 'Fail' }
    })
}

module.exports = { uploadToCloudinary }
