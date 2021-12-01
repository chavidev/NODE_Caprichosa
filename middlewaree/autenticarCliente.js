const jwt = require('jsonwebtoken')

let checkToken = async (req, res, next) => {
  try {
    let token = req.headers['x-access-token'] || req.headers['authorization']
    console.log(token)
    if (token && token.startsWith('Bearer')) {
      // Remove Bearer from string
      token = token.slice(7, token.length)
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token not provided'
      })
    }
    console.log('token: ', token)
    console.log('secret_key: ', process.env.JWT_SECRET)
    const decoded = await jwt.verify(token, 'HOLA')

    console.log(decoded)

    req.user = decoded
    next()
  } catch (err) {
    console.log(err)
    console.log('Ups el token falló en: middlewaree-autenticarCliente.js')
    return res.status(401).json({
      comentario: 'Ups el token falló en: middlewaree-autenticarCliente.js', //&&quiero ver el error cuando falla
      success: false,
      message: err.message || err._message
    })
  }
}

module.exports = { checkToken }

//const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "30s" });
