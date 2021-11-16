const Carrito = require('../models/Carrito')
const ID_registro = require('../models/ID_registro')

// lectura de todos los carritos
// GET http://localhost:5001/carritos   body vacío
const read = async (req, res) => {
  try {
    const todosCarrito = await Carrito.find().populate('id_cliente')
    res.status(200).json(todosCarrito)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al LEER carrito...' })
  }
}

// leer un carrito
//GET http://localhost:5001/carrito/readone  body vacío
const readOne = async (req, res) => {
  try {
    const { id_carrito, id_mongo } = req.body
    let filter = {}
    if (id_carrito) {
      filter = { id_carrito }
    } else {
      if (id_mongo) {
        filter = { _id: id_mongo }
      } else {
        throw new Error('Ups, Sin Id')
      }
    }
    const carritoEncontrado = await Carrito.findOne(filter).populate('id_cliente')
    res.status(200).json(carritoEncontrado)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error en readOne carrito...', error: err }) //&& quiero poner el error que me viene, err.message
  }
}

//creando un nuevo carrito
// POST http://localhost:5001/carrito   body con todo
const create = async (req, res) => {
  try {
    const carrito = req.body // objeto que viene desde el front
    let id_registro = await ID_registro.findOne()
    id_registro.id_carrito += 1
    console.log(id_registro.id_carrito)
    carrito.id_carrito = id_registro.id_carrito
    await id_registro.save()
    const carritoCreado = await Carrito.create(carrito) // se crea el carrito, mediante el metodo carrito.create()
    res.status(200).json({ message: 'success', carrito: carritoCreado }) // se le envia al front el carrito creado y un menasaje de exitoso
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al crear carrito...', carrito })
  }
}

module.exports = {
  create,
  read,
  readOne
}
