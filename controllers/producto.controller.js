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

// a partir de aquí paso el :id desde la url

// leer un producto
//http://localhost:5001/api/producto/1022 (metodo: GET) body vacío
const readOne = async (req, res) => {
    try {
        const params_id = req.params.id
        const productoEncontrado = await Producto.findOne({"id_producto": params_id}) //¿que ocurre si no le paso función?
        res.status(200).json(productoEncontrado)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error en readOne producto...' }); //&& quiero poner el error que me viene, err.message
    }
}

// put  http://localhost:5001/api/producto/1022  Ej body: {{"nombre": "nombre 10 actualizado","P_V_P": 3.5}} 
const update = async (req, res) => {
    try { 
        let modificacion = req.body
        const params_id = req.params.id
        let producto = await Producto.findOne({"id_producto":params_id})
        let response =  await Producto.findByIdAndUpdate(producto._id,modificacion, {new: true})
        res.status(200).json(response); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al crear producto...' }); 
    }
}

// delete  http://localhost:5001/api/producto/1022
const deleteProducto = async (req, res) => {
    try { 
        //let eliminar = req.body
        const params_id = req.params.id //en el caso de recibir el id/EAN por url
        //let producto = await Producto.findOne({"id_producto":eliminar.id_producto})  //en el caso de pasarselo por el body
        let producto = await Producto.findOne({"id_producto":params_id})
        let response =  await Producto.findByIdAndDelete(producto._id)         
        res.status(200).json(response); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar el  producto...' }); 
    }
}

// peligro!!!!  limpieza de toda la base de datos
// Producto.remove()  http://localhost:5001/api/producto/removed/user/:user/pass/:pass 
//http://localhost:5001/api/producto/removed/user/admin_1/pass/pass_1
const removedAllProducto = async (req, res) => {
    try {
        const userName = req.params.user  
        const password = req.params.pass
        if(userName === "admin_1" && password === "pass_1"){
            let removedAll = await Producto.remove()                                    //confirmar que el await es necesario y analizar la respuesta
            res.status(200).json({removedAll , msg:"acabas de limpiar la Base de datos"});
        } else {
            res.status(200).json("Ups, algo falló");
        }
    } catch (err){
        res.status(500).json({ message: 'Error  removedAllProducto()  Producto.remove() al eliminar todos los producto...' });
    }
}

//limpieza  clean
//Producto.remove()

module.exports = {
    create,
    read,
    readOne,
    update,
    deleteProducto,
    removedAllProducto,
};


//####  ojo no borrar, algún dia me va a hacer falta
// con ésta función se lo paso todo por el body
/* 
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
} */