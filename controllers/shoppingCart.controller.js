const ShoppingCart = require('../models/ShoppingCart')
const Producto = require('../models/Producto')

const read = async (req, res) => {
  try {
    const id_cliente_autenticado = req.user.id
    const shopping = await ShoppingCart.findOne({
      id_cliente: id_cliente_autenticado,
      state: 'OPENED'
    })
    res.status(200).json({ function: 'read', message: 'success', shoppingCart: shopping })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error leyendo el carrito' })
  }
}

const add = async (req, res) => {
  try {
    const id_cliente_autenticado = req.user.id
    const { id_variacion, cantidad } = req.body
    const producto = await Producto.findOne({
      'variaciones.id_variacion': id_variacion
    })
    let shopping = await ShoppingCart.findOne({
      id_cliente: id_cliente_autenticado,
      state: 'OPENED'
    })
    if (!shopping) {
      shopping = await ShoppingCart.create({ id_cliente: id_cliente_autenticado })
    }
    shopping.variaciones.push({ id_producto: producto._id, id_variacion, cantidad })
    shopping = await shopping.save()
    res.status(200).json({ message: 'success', shoppingCart: shopping })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'error al agregar a carrito' })
  }
}

// delete  http://localhost:5001/api/cliente/1022
const deleteVariacion = async (req, res) => {
  try {
    console.log('req.body', req.body)
    const id_cliente_autenticado = req.user.id
    let shopping = await ShoppingCart.findOne({ id_cliente: id_cliente_autenticado })
    if (shopping) {
      const { _id } = req.body
      shopping = await shopping.variaciones.pull({ _id: _id })
      res.status(200).json({ mensaje: 'Variacion eliminada correctamente', shoppingCart: shopping })
    } else {
      res.status(404).json({ mensaje: 'Carrito no encontrado...' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al eliminar una variacion de un carrito...' })
  }
}

const deleteShopping = async (req, res) => {
  try {
    const id_cliente_autenticado = req.user.id
    let shopping = await ShoppingCart.deleteOne({ id_cliente: id_cliente_autenticado })
    res.status(200).json({ mensaje: 'Carrito elimanado correctamente', shoppingCart: shopping })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al eliminar un carrito...' })
  }
}

module.exports = {
  add,
  read,
  deleteVariacion,
  deleteShopping
}
