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

// update   con put desde postman y set desde mongoose
const update = async (req, res) => {
    try {
        //const producto = req.body; // objeto que viene desde el front 
        let modificacion = req.body
        let producto = await Producto.findOne({"id_producto":modificacion.id_producto})  //&& se puede evitar ésta línea
        // let response =  await Producto.updateOne({_id:producto._id},modificacion) //otra forma de hacerlo, pero no devuelve nada INTERESANTE
        let response =  await Producto.findByIdAndUpdate(producto._id,modificacion, {new: true}) // por default false, así nos da el valor nuevo
        //producto = {...producto,...modificacion}  //cargo todos los atributos y después modifico lo que quiera
        //let response = await producto.save()  //Ups algo salió mal en la operación
        res.status(200).json(response); // se le envia al front el producto creado y un menasaje de exitoso
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al crear producto...' }); 
    }
}

// delete
const deleteProducto = async (req, res) => {
    try {
        //const producto = req.body; // objeto que viene desde el front 
        let eliminar = req.body
        let producto = await Producto.findOne({"id_producto":eliminar.id_producto})  
        let response =  await Producto.findByIdAndDelete(producto._id)         
        res.status(200).json(response); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar el  producto...' }); 
    }
}

//limpieza  clean
//Producto.remove()

module.exports = {
    create,
    read,
    update,
    deleteProducto,
};