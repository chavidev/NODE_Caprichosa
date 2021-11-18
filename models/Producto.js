const mongoose = require('mongoose')
const Schema = mongoose.Schema

const atributoSchema = new Schema({
  nombre: { type: String },
  valores: { type: Array },
  default: { type: String, default: 1 }
})

const variacionSchema = new Schema({
  id_padre: { type: Number, required: false },
  id_variacion: { type: Number },
  atributo_1: { type: String },
  atributo_2: { type: String }, //quitar el error es un array de atributos
  stock: { type: Number },
  etiquetas: { type: Number }
})

const productoSchema = new Schema({
  id_producto: { type: Number, required: false, unique: true }, //¿FontFaceSetLoadEvent? qwue hacia el ejemplo aquí
  ref: { type: String },
  nombre: { type: String, required: false },
  precio_coste: { type: Number, required: false }, //sólo tiene qeu admitir dos decimales
  P_V_P: { type: Number, required: false },
  atributos: [atributoSchema],
  variaciones: [variacionSchema],
  categoria: {
    type: [String],
    enum: ['CAMISA', 'PANTALON', 'CINTURON'],
    required: false
  }
})

const Producto = mongoose.model('producto', productoSchema) // con este modelo se puede ejecutar metodos como:
// Producto.create(), Producto.updateOne(), Producto.deleteOne() ... ( ver documentacion )

module.exports = Producto
