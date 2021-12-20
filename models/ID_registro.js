const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ID_registroSchema = new Schema({
  id_variacion: { type: Number, required: false },
  id_cliente: { type: Number, required: false },
  id_carrito: { type: Number, required: false },
  id_pedido: { type: Number, required: false }
})

const ID_registro = mongoose.model('ID_registro', ID_registroSchema)

module.exports = ID_registro
