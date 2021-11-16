const express = require('express')
const router = express.Router()
const carrito = require('../controllers/carrito.controller')

//zona de peligro limpieza de todos los productos
//router.delete('/removed/user/:user/pass/:pass', producto.removedAllProducto);

router.route('/readone').get(carrito.readOne)

router
  .route('/')
  .post(carrito.create) // llama a la funcion create, que esta en controllers/carrito.controller
  .get(carrito.read)
//.put( carrito.update)
//.delete(carrito.deleteProducto)

//router.get('/producto', producto.gett); //otro sistema, pero éste es mas limpio

module.exports = router //&&  ¿no tendría qeu ser routerProducto?  ¿dónde lo importo?
