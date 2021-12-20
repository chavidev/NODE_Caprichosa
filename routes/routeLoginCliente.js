const express = require('express');
const router = express.Router();
const { loginCliente } = require('../controllers/autenticacion.controller');

router.post('/login', loginCliente)

module.exports = router; //&&  ¿no tendría qeu ser routerProducto?  ¿dónde lo importo?