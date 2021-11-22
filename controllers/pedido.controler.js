const Pedido = require('../models/Pedido')
const ID_registro = require('../models/ID_registro')

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//ojo el carrito hay que cerrarlo
//creando un nuevo pedido
// POST http://localhost:5001/pedido   body con todo
const createPedido = async (req, res) => {
  try {
    const pedido = req.body // objeto que viene desde el front
    let id_registro = await ID_registro.findOne()
    id_registro.id_pedido += 1
    console.log(id_registro.id_pedido)
    pedido.id_pedido = id_registro.id_pedido
    await id_registro.save()
    const pedidoCreado = await Pedido.create(pedido)
    res.status(200).json({ message: 'success', pedido: pedidoCreado }) // se le envia al front el carrito creado y un menasaje de exitoso
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error: pedido.controler.create ...', pedido })
  }
}

// lectura de todos los pedidos
// GET http://localhost:5001/pedidos   body vacío
const readPedido = async (req, res) => {
  try {
    const todosPedido = await Pedido.find().populate('id_cliente').populate('id_carrito') //.populate('id_producto')
    res.status(200).json(todosPedido)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error pedido.controler.read...', error, todosPedido })
  }
}

// leer un pedido
//GET http://localhost:5001/pedido/readone  body vacío
const readOnePedido = async (req, res) => {
  try {
    const { id_pedido, id_mongo } = req.body
    console.log(`________id_pedido:${id_pedido}`)
    let filter = {}
    if (id_pedido) {
      filter = { id_pedido }

      console.log(`____filter: ${filter.id_pedido}`)
    } else {
      if (id_mongo) {
        filter = { _id: id_mongo }
      } else {
        throw new Error('Ups, no estoy recibiendo id en: filter / pedido.controler.readOne')
      }
    }
    const pedidoEncontrado = await Pedido.findOne(filter)
      .populate('id_cliente')
      .populate('id_carrito')
    res.status(200).json(pedidoEncontrado)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error:pedido.controler.readOne...', error: err })
  }
}

//## updatePedido => funciona con el id de mongo y con el id_cliente
// PUT  http://localhost:5001/api/pedido  Ej body: {{ ("_id":"id mongo" || "id_pedido": "nºpedido") ,}} Sólo lo qeu hay qeu actualizar
const updatePedido = async (req, res) => {
  try {
    let modificacion = req.body

    const { id_pedido, id_mongo } = req.body
    let filter = {}
    if (id_pedido) {
      filter = { id_pedido }
    } else {
      if (id_mongo) {
        filter = { _id: id_mongo }
      } else {
        throw new Error('Ups, no estoy recibiendo id en: filter / pedido.controler.updatePedido')
      }
    }
    let pedidoEncontrado = await Pedido.findOne(filter)
    let response = await Pedido.findByIdAndUpdate(pedidoEncontrado._id, modificacion, {
      new: true
    })
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error pedido.controler.updatePedido...' })
  }
}

// delete  http://localhost:5001/api/pedido
const deletePedido = async (req, res) => {
  try {
    const { id_pedido, id_mongo } = req.body
    let filter = {}
    if (id_pedido) {
      filter = { id_pedido }
    } else {
      if (id_mongo) {
        filter = { _id: id_mongo }
      } else {
        throw new Error('Ups, Sin Id en filter / pedido.controler.deletePedido')
      }
    }
    let pedidoEncontrado = await Pedido.findOne(filter)

    let response = await Pedido.findByIdAndDelete(pedidoEncontrado._id)
    res.status(200).json({
      mensaje: 'se ha eliminado correctamente el carrito en pedido.controler.deletePedido' + filter,
      response
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error en: pedido.controler.deletePedido...' })
  }
}

// Pedido.remove()   ###  peligro!!!!  limpieza de toda la base de datos
// DELETE  http://localhost:5001/api/pedido/removed/user/admin_1/pass/pass_1
const removedAllPedido = async (req, res) => {
  try {
    const userName = req.params.user
    const password = req.params.pass
    if (userName === 'admin_1' && password === 'pass_1') {
      let removedAll = await Pedido.remove()
      res.status(200).json({
        removedAll,
        msg: 'acabas de limpiar la Base de datos todos los pedidos  pedidos.controler.removedAllPedido'
      })
    } else {
      res.status(200).json('Ups, usuario y contraseña falló en pedidos.controler.removedAllPedido')
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error   al eliminar todos los pedidos... pedidos.controler.removedAllPedido',
      'err.message': err.message,
      'err completo': err
    })
  }
}

module.exports = {
  createPedido,
  readPedido,
  readOnePedido,
  updatePedido,
  deletePedido,
  removedAllPedido
}
