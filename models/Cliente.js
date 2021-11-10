const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4,5,6,7})+$/;
    return re.test(email)
};

const clienteSchema = new Schema({
    //ha de ser único en producto y clientes    (carrito tendrá números independientes)
    id_cliente: { type: Number, required: false, unique: true }, 
    nombre: { type: String, required: false },
    email: { 
        type: Number, 
        required: false, 
        validate: [validateEmail, 'por favor introduzca un email válido'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4,5})+$/, 'Please fill a valid email address'], //otro sistema alternativo a validate
        unique: true 
    }, //&& pendiente de introducir la validación
    telefono: { 
        type: Number, 
        required: true,
        match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,"el número de teléfono es incorrecto"]
    },
    pass: { type: String, required: false},
    //pendiente de introducir las medidas
});

const Cliente = mongoose.model('cliente', clienteSchema); 

module.exports = Cliente;