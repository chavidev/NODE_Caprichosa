const express = require('express')
const router = express.Router()
const shoppingCart = require('../controllers/shoppingCart.controller')
const { checkToken } = require('../middlewaree/autenticarCliente.js')

router
  .route('/')
  .get(checkToken, shoppingCart.read)
  .post(checkToken, shoppingCart.add)
  .delete(checkToken, shoppingCart.deleteVariacion)

router.route('/:id').delete(checkToken, shoppingCart.deleteShopping)

module.exports = router
