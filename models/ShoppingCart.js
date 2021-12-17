const mongoose = require('mongoose')
const Schema = mongoose.Schema

const variacionesShoppingSchema = new Schema(
  {
    id_producto: { type: Schema.Types.ObjectId, ref: 'producto' },
    id_variacion: { type: Number },
    cantidad: { type: Number }
  },
  { timestamps: true }
)

const ShoppingCartSchema = new Schema(
  {
    id_cliente: { type: Schema.Types.ObjectId, ref: 'cliente' },
    state: { type: String, enum: ['OPENED', 'CLOSED'], required: true, default: 'OPENED' },
    variaciones: [variacionesShoppingSchema]
  },
  { timestamps: true }
)

const ShoppingCart = mongoose.model('ShoppingCart', ShoppingCartSchema)

module.exports = ShoppingCart
