const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pedidoSchema = new Schema(
  {
    id_pedido: { type: Number, required: true, unique: true },
    id_carrito: { type: Schema.Types.ObjectId, ref: 'carrito' }, //&& CONSIGUE QUE no se puedA actualizar
    id_cliente: { type: Schema.Types.ObjectId, ref: 'cliente' }, // id de mongo
    state: {
      type: String,
      enum: ['RECIBIDO', 'PREPARADO', 'ENVIADO', 'ENTREGADO'],
      required: false
    },
    formaPago: {
      type: String,
      enum: ['EFECTIVO', 'TARGETA', 'CREDITO', 'CONTRAREEMBOLSO'],
      required: false
    },
    lugarEntrega: { type: String }, //hay que poner mas datos aquí
    seguimiento: [String]
  },
  { timestamps: true }
)

const Pedido = mongoose.model('pedido', pedidoSchema)

module.exports = Pedido
