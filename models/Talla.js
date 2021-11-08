const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tallaSchema = new Schema({
    id: { type: Number, required: true },
    nombre: { type: String },
    default: {type: String },
    valores: { type: Array },
});

const Talla = mongoose.model('talla', tallaSchema);

module.exports = Talla;