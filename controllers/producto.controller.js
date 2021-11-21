const Producto = require('../models/Producto') //import Producto from '../models/Producto'
const ID_registro = require('../models/ID_registro')
const { crear_variaciones } = require('../utils/utils')

// lectura de todos los producto
// GET http://localhost:5001/api/producto   body vacío
const read = async (req, res) => {
  try {
    const todosProductos = await Producto.find()
    res.status(200).json(todosProductos)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al LEER producto...' })
  }
}

// leer un producto
//GET http://localhost:5001/api/producto/1022  body vacío
const readOne = async (req, res) => {
  try {
    const params_id = req.params.id

    const productoEncontrado = await Producto.findOne({ id_producto: params_id }) //¿que ocurre si no le paso función?
    // const productoEncontrado = await Producto.find({"price":{$and:[{$gt:500},{$lt:1000}]}})
    res.status(200).json(productoEncontrado)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error en readOne producto...', error: err }) //&& quiero poner el error que me viene, err.message
  }
}

//creando un nuevo producto
// POST http://localhost:5001/api/producto   body con todo
const create = async (req, res) => {
  try {
    const producto = req.body // objeto que viene desde el front
    let id_registro = await ID_registro.findOne()
    if (!id_registro) id_registro = await ID_registro.create({ id_variacion: 1000 })
    id_registro.id_variacion += 1
    producto.id_producto = id_registro.id_variacion
    await id_registro.save() // solución para evitar qeu el primer hijo tenga el mismo id qpe el padre

    //producto.id_variacion = crear_variaciones(producto.atributos[0],producto.atributos[1])
    //producto.variaciones = "12345"
    //console.log(crear_variaciones)
    producto.variaciones = await crear_variaciones(producto.atributos, id_registro.id_variacion)
    const productoCreado = await Producto.create(producto) // se crea el producto, mediante el metodo Producto.create()
    res.status(200).json({ message: 'success', producto: productoCreado }) // se le envia al front el producto creado y un menasaje de exitoso
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al crear producto...', producto })
  }
}

// update
// PUT  http://localhost:5001/api/producto/1022  Ej body: {{"nombre": "nombre 10 actualizado","P_V_P": 3.5}} Sólo lo qeu hay qeu actualizar
const update = async (req, res) => {
  try {
    let modificacion = req.body
    const params_id = req.params.id
    let producto = await Producto.findOne({ id_producto: params_id })
    let response = await Producto.findByIdAndUpdate(producto._id, modificacion, { new: true })
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al actualizar un producto...', modificacion })
  }
}

// delete  http://localhost:5001/api/producto/1022
const deleteProducto = async (req, res) => {
  try {
    const params_id = req.params.id //en el caso de recibir el id/EAN por url
    //let producto = await Producto.findOne({"id_producto":eliminar.id_producto})  //en el caso de pasarselo por el body
    let producto = await Producto.findOne({ id_producto: params_id })
    let response = await Producto.findByIdAndDelete(producto._id)
    res.status(200).json({
      msg: 'producto eliminado',
      response
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al eliminar el  producto...' })
  }
}

// Producto.remove()   ###  peligro!!!!  limpieza de toda la base de datos
// DELETE  http://localhost:5001/api/producto/removed/user/admin_1/pass/pass_1
const removedAllProducto = async (req, res) => {
  try {
    const userName = req.params.user
    const password = req.params.pass
    if (userName === 'admin_1' && password === 'pass_1') {
      let removedAll = await Producto.remove()
      res.status(200).json({ removedAll, msg: 'acabas de ELIMINAR TODOS LOS PRODUCTOS' })
    } else {
      res.status(200).json('Ups, algo falló')
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error  removedAllProducto()  Producto.remove() al eliminar todos los producto...'
    })
  }
}

//&& or and y not   (un mismo atributo color and talla)
const filtro = async (req, res) => {
  try {
    const { categoria, talla, color } = req.query
    console.log(req.query)
    const todosProductos = await Producto.find({
      categoria,
      'atributos.valores.valor': color,
      'variaciones.atributo_2': talla
    })
    res.status(200).json(todosProductos) //&&modificar por filtro productos
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al LEER producto...' })
  }
}

/*    TENGO QEU CONSEGUIR QUE FUNCIONE CON DOS PARÁMETROS 
const filtro__fallo = async (req, res) => {
  try {
    const { categoria, talla, color } = req.query
    console.log(req.query)
    const todosProductos = await Producto.find({
      categoria,
      'atributos.valores.valor': color,
      'atributos.valores.valor': talla //genera error aquí
    })
    res.status(200).json(todosProductos) //&&modificar por filtro productos
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al LEER producto...' })
  }
} */

module.exports = {
  create,
  read,
  readOne,
  update,
  deleteProducto,
  removedAllProducto,
  filtro
}

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
