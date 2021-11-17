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

//¿cómo es eso del singular y el plural?
const carritoSchema = new Schema(
  {
    id_carrito: { type: Number, required: true, unique: true }, //&& CONSIGUE QUE no se puedA actualizar
    id_cliente: { type: Schema.Types.ObjectId, ref: 'cliente' }, // id de mongo
    id_producto: { type: Schema.Types.ObjectId, ref: 'producto' }, // id de mongo
    state: {
      type: String,
      enum: ['OPEN', 'CLOSED'],
      required: true
    },
    variaciones: {
      //&&ha de enlazar con la variación del producto
      type: [Number], //{ type: Schema.Types.ObjectId, ref: 'producto' }
      required: true
    },
    historial: [historialSchema]
  },
  { timestamps: true }
)

const Carrito = mongoose.model('carrito', carritoSchema)

module.exports = Carrito
