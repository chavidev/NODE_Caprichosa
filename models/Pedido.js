const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pedidoSchema = new Schema(
  {
    id_pedido: { type: Number, required: true, unique: true },
    id_carrito: { type: Schema.Types.ObjectId, ref: 'carrito' }, //&& CONSIGUE QUE no se puedA actualizar
    id_cliente: { type: Schema.Types.ObjectId, ref: 'cliente' }, // id de mongo
    state: {
      type: Enum,
      enum: ['RECIBIDO', 'PREPARADO', 'ENVIADO', 'ENTREGADO'],
      required: true
    },
    formaPago: {
      type: Enum,
      enum: ['EFECTIVO', 'TARGETA', 'CREDITO', 'CONTRAREEMBOLSO'],
      required: true
    },
    lugarEntrega: { type: String }, //hay que poner mas datos aquí
    segumiento: [string]
  },
  { timestamps: true }
)

const Pedido = mongoose.model('carrito', pedidoSchema)

module.exports = Pedido
