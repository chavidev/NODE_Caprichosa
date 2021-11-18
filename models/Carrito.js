const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historialSchema = new Schema(
  {
    variacion: Number,
    accion: {
      type: String,
      enum: ['CREATE', 'DELETE']
    }
  },
  { timestamps: true }
)

const variacionCarritoSchema = new Schema(
  {
    id_padre: String, //{ type: Schema.Types.ObjectId, ref: 'producto' },
    id_variacion: { type: String }, //aquí va un populate de la variación
    pedido: { type: Number },
    stock: { type: Number }
  },
  { timestamps: true }
)

const carritoSchema = new Schema(
  {
    id_carrito: { type: Number, required: true, unique: true }, //&& CONSIGUE QUE no se puedA actualizar
    id_cliente: { type: Schema.Types.ObjectId, ref: 'cliente' }, // id de mongo
    state: {
      type: String,
      enum: ['OPEN', 'CLOSED'],
      required: true
    },
    variaciones: {
      type: [variacionCarritoSchema],
      required: false
    },
    historial: [historialSchema]
  },
  { timestamps: true }
)

const Carrito = mongoose.model('carrito', carritoSchema)

module.exports = Carrito
