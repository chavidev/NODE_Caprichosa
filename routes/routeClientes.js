const express = require('express')
const router = express.Router()
const cliente = require('../controllers/cliente.controller')
const { checkToken } = require('../middlewaree/autenticarCliente.js')

//zona de peligro limpieza de todos los clientes
router.delete('/removed/user/:user/pass/:pass', cliente.removedAllCliente)

//router.get('/:id', checkToken, cliente.readOne)  //sistema estandard del token

//router.route(checkAdmin , '/admin')   // como admin no tengo limitaciones
router
  .route('/admin') // pendiente middeware
  .post(cliente.create)
  .get(cliente.read)

router
  .route('/admin/:id') //pendiente middleware
  .get(cliente.readOne) // ojo, lo busco por id_cliente no por el de mongo  ¡¡ RIESGO DE FALLO !! nadie lo hace así
  .put(cliente.update)
  .delete(cliente.deleteCliente)

router.route('/').post(cliente.create).get(cliente.read)

router
  .route('/:id')
  //.get(cliente.readOne) //con token cliente
  .get(checkToken, cliente.readOne_id) // con id de mongo   //checkToken,
  .put(cliente.update)
  .delete(cliente.deleteCliente)

module.exports = router
