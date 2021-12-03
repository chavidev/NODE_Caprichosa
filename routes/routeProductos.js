const express = require('express')
const router = express.Router()
const producto = require('../controllers/producto.controller')

//zona de peligro limpieza de todos los productos
router.delete('/removed/user/:user/pass/:pass', producto.removedAllProducto)

router
  .route('/filtro') //
  .get(producto.filtro)

router
  .route('/filtro_function') //
  .get(producto.filtro_function)

//router.get('/productos', producto.getAll);
router
  .route('/')
  .post(producto.create) // llama a la funcion create, que esta en controllers/producto.controller
  .get(producto.read)

router
  .route('/:id')
  .get(producto.readOne) //&&crear y actualizar
  .put(producto.update)
  .delete(producto.deleteProducto)

//router.get('/producto', producto.gett); //otro sistema, pero éste es mas limpio

module.exports = router //&&  ¿no tendría qeu ser routerProducto?  ¿dónde lo importo?
