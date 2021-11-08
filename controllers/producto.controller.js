const  Producto = require('../models/Producto') // modelo producto
const ID_registro = require('../models/ID_registro')

const create = async (req, res) => {
    try {
        const producto = req.body; // objeto que viene desde el front 
        let id_registro = await ID_registro.findOne() 
        if(!id_registro)  id_registro = await ID_registro.create({ id_variacion: 1000});
        producto.id_producto = id_registro.id_variacion
        id_registro.id_variacion += 1
        id_registro.save()
        const productoCreado = await Producto.create(producto); // se crea el producto, mediante el metodo Producto.create()
        res.status(200).json({ message: 'success', producto:productoCreado  }); // se le envia al front el producto creado y un menasaje de exitoso
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al crear producto...' }); 
    }
}


module.exports = {create,};