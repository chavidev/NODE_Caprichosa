const  Producto = require('../models/Producto') // modelo producto
const ID_registro = require('../models/ID_registro')

//creando un nuevo producto
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

// update   con put desde postman y set desde mongoose
const update = async (req, res) => {
    try {
        //const producto = req.body; // objeto que viene desde el front 
        let artículo = await Producto.find({"id_producto":1026}) 
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
// lectura de todos los producto
const read = async (req, res) => {
    try {
        const todosProductos = await Producto.find()
        res.status(200).json(todosProductos)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al LEER producto...' });
    }
}

module.exports = {
    create,
    read,
};