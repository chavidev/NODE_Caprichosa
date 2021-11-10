const  Cliente = require('../models/Cliente') 
const ID_registro = require('../models/ID_registro')


// lectura de todos los producto
// GET http://localhost:5001/api/cliente   body vacío
const read = async (req, res) => {
  try {
      const todosClientes = await Cliente.find()
      res.status(200).json(todosClientes)
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error READ todosClientes' });
  }
}


// ver un cliente
//GET http://localhost:5001/api/cliente/1022  body vacío
const readOne = async (req, res) => {
  try {
      const params_id = req.params.id
      const clienteEncontrado = await Cliente.findOne({"id_cliente": params_id}) 
      res.status(200).json(clienteEncontrado)
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error en readOne clienteEncontrado' }); 
  }
}

//creando un nuevo cliente
// POST http://localhost:5001/api/cliente   body con todo
const create = async (req, res) => {
  try {

    //refactorizar id_variación   y si no hay datos en la base de datos, que salte un error
    //validar que no exista en clientes ni en productos
      const cliente = req.body;
      let id_registro = await ID_registro.findOne() 
      if(!id_registro)  id_registro = await ID_registro.create({ id_variacion: 1000});  //renombrarlo por ¿id_unico?
      cliente.id_cliente = id_registro.id_variacion  //&& renombrar id_variación por id_unico
      id_registro.id_variacion += 1
      id_registro.save()
      const clienteCreado = await Cliente.create(cliente); // &&¿create es de mongoose? se crea el producto, mediante el metodo Producto.create()
      res.status(200).json({ message: 'success', cliente:clienteCreado  }); // se le envia al front el producto creado y un menasaje de exitoso
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al crear el cliente' }); 
  }
}

// update
// PUT  http://localhost:5001/api/cliente/1022  Ej body: {{"id": "id_único","nombre":"nombre_cliente","email":"email_cliente","telefono":"telefono_cliente","pass":"contraseña_encriptada"}} Sólo lo qeu hay qeu actualizar
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

// delete  http://localhost:5001/api/cliente/1022
const deleteCliente = async (req, res) => {
  try {
      const params_id = req.params.id //en el caso de recibir el id/EAN por url
      //let cliente = await Cliente.findOne({"id_cliente":eliminar.id_cliente})  //en el caso de pasarselo por el body
      let cliente = await Cliente.findOne({"id_cliente":params_id})
      let response =  await Cliente.findByIdAndDelete(cliente._id)         
      res.status(200).json(response); 
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error en deleteCliente...' }); 
  }
}

// Cliente.remove()   ###  peligro!!!!  limpieza de toda la base de datos    
// DELETE  http://localhost:5001/api/cliente/removed/user/admin_1/pass/pass_1
const removedAllCliente = async (req, res) => {
  try {
      const userName = req.params.user  
      const password = req.params.pass
      if(userName === "admin_1" && password === "pass_1"){
          let removedAll = await Cliente.remove() 
          res.status(200).json({removedAll , msg:"acabas de limpiar la Base de datos todos los clientes  removedAllCliente"});
      } else {
          res.status(200).json("Ups, algo falló en removedAllCliente");
      }
  } catch (err){
      res.status(500).json({ message: 'Error   al eliminar todos los clientes... removedAllCliente()  Cliente.remove()' });
  }
}


module.exports = {
    create,
    read,
    readOne,
    update,
    deleteCliente,
    removedAllCliente,
};

