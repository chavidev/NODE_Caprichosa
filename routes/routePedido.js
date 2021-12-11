const express = require('express')
const router = express.Router()
const pedido = require('../controllers/pedido.controller.js')
const { checkToken } = require('../middlewaree/autenticarCliente.js')

router.route('/').get(checkToken, pedido.readPedido).post(checkToken, pedido.createPedido)

module.exports = router
