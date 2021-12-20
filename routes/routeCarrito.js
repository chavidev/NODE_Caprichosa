const express = require('express')
const router = express.Router()
const carrito = require('../controllers/carrito.controller')

//zona de peligro limpieza de todos los ccarritos
router.delete('/removed/user/:user/pass/:pass', carrito.removedAllCarrito)

router.route('/readone').get(carrito.readOne)

router
  .route('/')
  .post(carrito.create)
  .get(carrito.read)
  .put(carrito.updateCarrito)
  .delete(carrito.deleteCarrito)

module.exports = router
