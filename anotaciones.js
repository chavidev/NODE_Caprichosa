npm install cloudinary-core --save
var cl = new cloudinary.Cloudinary({ cloud_name: 'javier-casta-eda', secure: true })

let producto = {
  _id: '61892c3c45d4879aac313d72',
  id_producto: 1023,
  ref: 'ref 7',
  nombre: 'nombre 6',
  precio_coste: 20.05,
  P_V_P: 30.5,
  atributos: [
    {
      valores: [],
      default: '1',
      _id: '61892c3c45d4879aac313d73'
    },
    {
      valores: [],
      default: '1',
      _id: '61892c3c45d4879aac313d74'
    }
  ],
  variaciones: [
    {
      id_padre: 3,
      id_variacion: 6,
      atributo_1: 'color',
      atributo_2: 'talla',
      stock: 3,
      etiquetas: 3,
      _id: '61892c3c45d4879aac313d75'
    }
  ],
  categoria: ['CAMISA'],
  __v: 0
}

let cliente = {
  nombre: 'nombre nuevo cliente',
  email: 'email@gmail.comes',
  telefono: 123456789,
  pass: 'pass_cliente'
}

let producto = {
  nombre: 'falda 1157',
  precio_coste: 20.05,
  P_V_P: 30.5,
  atributos: [
    {
      nombre: 'color',
      valores: [{ valor: 'verde' }, { valor: 'rojo' }],
      default: '1'
    },
    {
      nombre: 'talla',
      valores: [{ valor: 'M' }, { valor: 'L' }],
      default: '1'
    }
  ],
  variaciones: [],
  categoria: ['CINTURON']
}

let carrito = {
  id_cliente: '',
  id_producto: '',
  state: 'OPEN',
  variaciones: ['']
}
let carrito = {
  id_cliente: '61953145ae8b3c31578f06c4',
  id_producto: '6195374be6d4b7c20122d116',
  state: 'OPEN',
  variaciones: [
    '6195374be6d4b7c20122d119',
    '6195374be6d4b7c20122d11a',
    '6195374be6d4b7c20122d11b',
    '6195374be6d4b7c20122d11b'
  ]
}
