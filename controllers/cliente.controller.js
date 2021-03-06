const Cliente = require('../models/Cliente')
const ID_registro = require('../models/ID_registro')
const { uploadToCloudinary } = require('../utils/uploadToCloudinary.js')
const cloudinary = require('cloudinary').v2

//await cloudinary.uploader.destroy(personaje.cloudinary_id)

// lectura de todos los producto
// GET http://localhost:5001/api/cliente   body vacío
const read = async (req, res) => {
  try {
    const todosClientes = await Cliente.find()
    res.status(200).json(todosClientes)
    console.log('read() Ejecutado / cliente.controller')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error READ todosClientes' })
  }
}

// ver un cliente SÓLO EL Admin
//GET http://localhost:5001/api/cliente/admin/1022  body vacío
const readOne = async (req, res) => {
  try {
    const params_id = req.params.id
    // ojo, lo busco por id_cliente no por el de mongo  ¡¡ RIESGO DE FALLO !!  pero es lo qeu me llegará de woocommerce
    const clienteEncontrado = await Cliente.findOne({ id_cliente: params_id }) //se puede unificar en una sola función =>"id_cliente"/"_id"

    res.status(200).json(clienteEncontrado)
    console.log('readOne() Ejecutado / cliente.controller')
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error en readOne clienteEncontrado' })
  }
}

// ver un cliente
//GET http://localhost:5001/api/cliente/  body vacío
const readOne_id = async (req, res) => {
  try {
    const id_cliente_autenticado = req.user.id
    const clienteEncontrado = await Cliente.findOne({ _id: id_cliente_autenticado })
    const parsed = JSON.parse(JSON.stringify(clienteEncontrado)) //&& usar cliente encontrado directamente, no hace falta parsear un Stringify
    delete parsed['pass'] //forma interesante de eliminar la contraseña
    //  console.log(parsed)
    res.status(200).json(parsed) //&&¿el segundo console no se ejecuta?
    console.log('readOne_id() Ejecutado / cliente.controller')
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error en readOne clienteEncontrado' })
  }
}

//creando un nuevo cliente
// POST http://localhost:5001/api/cliente   body con todo
const create = async (req, res) => {
  try {
    const cliente = req.body
    let id_registro = await ID_registro.findOne()

    //&& en producción, si no coge el id => que lance un error "Ups, no cogí la info de la base de datos"
    let response = ''
    if (!id_registro.id_cliente) {
      //supongo que id_registro existe
      response = await ID_registro.findByIdAndUpdate(
        id_registro._id,
        { id_cliente: 20 },
        { new: true }
      )
      id_registro.id_cliente = 20
    }
    //fin verificación inicial

    cliente.id_cliente = id_registro.id_cliente
    id_registro.id_cliente += 1
    id_registro.save()
    let clienteCreado = await Cliente.create(cliente)

    if (req.file) {
      const nombre_imagen = req.file.filename
      const responseCloudinary = await uploadToCloudinary(
        nombre_imagen,
        'clientes',
        clienteCreado._id
      )
      const { url, result } = responseCloudinary //&& a guardar en base de datos #####
      console.log('url de la imagen', url)
      console.log('response Cloudinary', responseCloudinary)

      clienteCreado.img = url
      clienteCreado.asset_id = result.asset_id
      clienteCreado.public_id = result.public_id
      clienteCreado.response_cloudinary = responseCloudinary

      clienteCreado = await clienteCreado.save()
    }

    // &&¿create es de mongoose? se crea el producto, mediante el metodo Producto.create()
    res.status(200).json({ message: 'success', cliente: clienteCreado, response }) // se le envia al front el producto creado y un menasaje de exitoso
    console.log('create() Ejecutado / cliente.controller')
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Error al crear el cliente  POST create',
      'mensaje del error': err.message,
      'error completo por si falla': err
    })
  }
}

// update
// PUT  http://localhost:5001/api/cliente/1022  Ej body: {{"id": "id_único","nombre":"nombre_cliente","email":"email_cliente","telefono":"telefono_cliente","pass":"contraseña_encriptada"}} Sólo lo qeu hay qeu actualizar
const update = async (req, res) => {
  try {
    let modificacion = req.body
    console.log(req.body)
    const params_id = req.params.id
    //let cliente = await Cliente.findOne({ id_cliente: params_id })
    //let response = await Cliente.findByIdAndUpdate(cliente._id, modificacion, { new: true })
    //colocandolas dos líneas en una sola   { id_cliente: params_id } lo puedo modificar por lo qeu quiera
    const response = await Cliente.findOneAndUpdate({ id_cliente: params_id }, modificacion, {
      new: true
    })
    res.status(200).json(response)
    console.log('update() Ejecutado / cliente.controller')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al actualizar un cliente...' })
  }
}

const updateImage = async (req, res) => {
  try {
    let modificacion = req.body
    if (req.file) {
      const nombre_imagen = req.file.filename
      const responseCloudinary = await uploadToCloudinary(
        nombre_imagen,
        'clientes',
        modificacion._id
      )
      const { url, result } = responseCloudinary //&& a guardar en base de datos ####
      let cliente = await Cliente.findOne({ _id: modificacion._id })
      cliente.asset_id = result.asset_id
      cliente.response_cloudinary = responseCloudinary
      cliente.public_id = result.public_id
      cliente.img = url
      cliente = await cliente.save()
      res.status(200).json(cliente)
    } else {
      let cliente = await Cliente.findOne({ _id: modificacion._id })
      const responseCloudinary = await cloudinary.uploader.destroy(modificacion.public_id)
      cliente.asset_id = ''
      cliente.response_cloudinary = responseCloudinary
      cliente.img = ''
      cliente.public_id = ''
      cliente = await cliente.save()
      res.status(200).json(cliente)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error updateImage...' })
  }
}

// delete  http://localhost:5001/api/cliente/1022
const deleteCliente = async (req, res) => {
  try {
    const params_id = req.params.id //en el caso de recibir el id/EAN por url
    //let cliente = await Cliente.findOne({"id_cliente":eliminar.id_cliente})  //en el caso de pasarselo por el body
    let cliente = await Cliente.findOne({ id_cliente: params_id })
    let response = await Cliente.findByIdAndDelete(cliente._id)
    //res.status(200).json(`has eliminado el cliente 24  ${response}`);   // funcionaría !sip y es mejor!
    res.status(200).json({ mensaje: 'se ha eliminado correctamente el id= ' + params_id, response })
    console.log('deleteCliente() Ejecutado / cliente.controller')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error en deleteCliente...' })
  }
}

// Cliente.remove()   ###  peligro!!!!  limpieza de toda la base de datos
// DELETE  http://localhost:5001/api/cliente/removed/user/admin_1/pass/pass_1
const removedAllCliente = async (req, res) => {
  try {
    console.log('removedAllCliente() iniciado / cliente.controller')
    const userName = req.params.user
    const password = req.params.pass
    if (userName === 'admin_1' && password === 'pass_1') {
      let removedAll = await Cliente.remove()
      res.status(200).json({
        removedAll,
        msg: 'acabas de limpiar la Base de datos todos los clientes  removedAllCliente'
      })
    } else {
      res.status(200).json('Ups, algo falló en removedAllCliente')
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error   al eliminar todos los clientes... removedAllCliente()  Cliente.remove()'
    })
  }
}

module.exports = {
  create,
  read,
  readOne,
  readOne_id,
  update,
  deleteCliente,
  removedAllCliente,
  updateImage
}
