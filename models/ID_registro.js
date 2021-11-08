const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ID_registroSchema = new Schema({
    id_variacion: { type: Number, required: true },
});

const ID_registro = mongoose.model('ID_registro', ID_registroSchema);

module.exports = ID_registro;