const express = require('express');
const router = express.Router();
const producto = require('../controllers/producto.controller');

//router.get('/productos', producto.getAll);
router.route('/producto')
.post( producto.create) // llama a la funcion create, que esta en controllers/producto.controller
.get( producto.read);
//.get( producto.gett)
//router.route('/cliente/:id')


//router.get('/producto', producto.gett);


module.exports = router;