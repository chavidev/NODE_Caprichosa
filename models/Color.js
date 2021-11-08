const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
    id: { type: Number, required: true },
    nombre: { type: String },
    default: {type: String },
    codigo_color: { type: String },
});

const Color = mongoose.model('color', colorSchema);

module.exports = Color;