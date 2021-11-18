const Carrito = require('../models/Carrito')
const ID_registro = require('../models/ID_registro')

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

// lectura de todos los carritos
// GET http://localhost:5001/carritos   body vacío
const read = async (req, res) => {
  try {
    const todosCarrito = await Carrito.find().populate('id_cliente') //.populate('id_producto')
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
    console.log(`________id_carrito:${id_carrito}`)
    let filter = {}
    if (id_carrito) {
      filter = { id_carrito }

      console.log(`____filter: ${filter.id_carrito}`)
    } else {
      if (id_mongo) {
        filter = { _id: id_mongo }
      } else {
        throw new Error('Ups, Sin Id')
      }
    }
    const carritoEncontrado = await Carrito.findOne(filter).populate('id_cliente')
    //.populate('id_producto')
    res.status(200).json(carritoEncontrado)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error en readOne carrito...', error: err }) //&& quiero poner el error que me viene, err.message
  }
}

//## updateCarrito => funciona con el id de mongo y con el id_cliente
// PUT  http://localhost:5001/api/carrito  Ej body: {{ ("_id":"id mongo" || "id_carrito": "nºcarrido") ,}} Sólo lo qeu hay qeu actualizar
const updateCarrito = async (req, res) => {
  try {
    let modificacion = req.body // tengo que extraer la información a modificar insertar variación, eliminar  modificar cantidad
    //aquí veo la modificación

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
    let carritoEncontrado = await Carrito.findOne(filter)
    let response = await Carrito.findByIdAndUpdate(carritoEncontrado._id, modificacion, {
      new: true
    })
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al actualizar un carrito...' })
  }
}

// delete  http://localhost:5001/api/carrito
const deleteCarrito = async (req, res) => {
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
    let carritoEncontrado = await Carrito.findOne(filter)

    let response = await Carrito.findByIdAndDelete(carritoEncontrado._id)
    res
      .status(200)
      .json({ mensaje: 'se ha eliminado correctamente el carrito ' + filter, response })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error en deleteCarrito...' })
  }
}

// Carrito.remove()   ###  peligro!!!!  limpieza de toda la base de datos
// DELETE  http://localhost:5001/api/carrito/removed/user/admin_1/pass/pass_1
const removedAllCarrito = async (req, res) => {
  try {
    const userName = req.params.user
    const password = req.params.pass
    if (userName === 'admin_1' && password === 'pass_1') {
      let removedAll = await Carrito.remove()
      res.status(200).json({
        removedAll,
        msg: 'acabas de limpiar la Base de datos todos los carritos  removedAllCarrito'
      })
    } else {
      res.status(200).json('Ups, usuario y contraseña falló en removedAllCarrito')
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error   al eliminar todos los carritos... removedAllCarrito()  Carrito.remove()',
      'err.message': err.message,
      'err completo': err
    })
  }
}

module.exports = {
  create,
  read,
  readOne,
  updateCarrito,
  deleteCarrito,
  removedAllCarrito
}
