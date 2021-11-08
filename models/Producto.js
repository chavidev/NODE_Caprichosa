const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const atributoSchema = new Schema({
    nombre: { type: String },
    valores: { type: Array },
    default: { type: String, default: 1 } 
});

const variacionSchema = new Schema({
    id_padre: { type: Number, required: true },
    id_variacion: { type: Number },
    atributo_1: { type: String },
    atributo_2: { type: String },
    stock: { type: Number },
    etiquetas: { type: Number }
});

const productoSchema = new Schema({
    id_producto: { type: Number, required: true },
    ref: { type: String },
    nombre: { type: String, required: true },
    precio_coste: { type: Number, required: true },
    P_V_P: { type: Number, required: true },
    atributos: [atributoSchema],
    variaciones: [variacionSchema],
    categoria: { 
        type: [String],
        enum: ['CAMISA', 'PANTALON', 'CORREA'], 
        required: true
    },
});

const Producto = mongoose.model('producto', productoSchema); // con este modelo se puede ejecutar metodos como:
// Producto.create(), Producto.updateOne(), Producto.deleteOne() ... ( ver documentacion )

module.exports = Producto;