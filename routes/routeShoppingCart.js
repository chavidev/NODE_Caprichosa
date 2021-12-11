const express = require('express')
const router = express.Router()
const shoppingCart = require('../controllers/shoppingCart.controller')
const { checkToken } = require('../middlewaree/autenticarCliente.js')

router.route('/deleteShopping').delete(checkToken, shoppingCart.deleteShopping)
router
  .route('/')
  .get(checkToken, shoppingCart.read)
  .post(checkToken, shoppingCart.add)
  .delete(checkToken, shoppingCart.deleteVariacion)

module.exports = router
