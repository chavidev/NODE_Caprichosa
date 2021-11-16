const express = require('express');
const router = express.Router();
const cliente = require('../controllers/cliente.controller');
const { checkToken } = require('../middlewaree/autenticarCliente.js')

//zona de peligro limpieza de todos los clientes
router.delete('/removed/user/:user/pass/:pass', cliente.removedAllCliente);

//router.get('/:id', checkToken, cliente.readOne)

router.route('/')
.post(cliente.create)
.get(cliente.read)

router.route('/:id')
//.get(cliente.readOne)
.get(checkToken , cliente.readOne)
.put(cliente.update)
.delete(cliente.deleteCliente)

module.exports = router; //&&  ¿no tendría qeu ser routerProducto?  ¿dónde lo importo?