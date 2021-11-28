const Cliente = require('../models/Cliente')
const ID_registro = require('../models/ID_registro')
const jwt = require('jsonwebtoken')

const loginCliente = async (req, res) => {
  try {
    const { email, pass } = req.body
    console.log(req)
    console.log(email, pass)
    const cliente = await Cliente.findOne({ email })
    if (cliente) {
      if (cliente.pass === pass) {
        const token = jwt.sign({ id: cliente._id }, 'HOLA', { expiresIn: '10h' })
        res.status(200).json({ message: 'Autenticado', token: token })
      } else {
        res.status(404).json({ message: 'Datos incorrectos' })
      }
    } else {
      res.status(404).json({ message: 'Datos incorrectos' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error autenticando cliente' })
  }
}

module.exports = {
  loginCliente
}
