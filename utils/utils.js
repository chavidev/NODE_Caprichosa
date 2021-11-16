const ID_registro = require('../models/ID_registro')

// aquí pongo funciiones genéricas para usarlas en cualquier sítio, 
//falta de un nombre mejor ¿utils? no me termina de convencer
/* 
export const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
} */

//&& faltan mas datos en cada variación nº del padre n_variación id del atributo(por si se modifica)

const crear_variaciones =async (atributos,id_padre) => {
  let atributo_1 = atributos[0]
  let atributo_2 = atributos[1]
  let variaciones = [];
  //const [atributo_1, atributo_2] = this.tot[j1].atributo;
  for (let k = 0; k <  atributo_1.valores.length; k++) {
    for (let j = 0; j <  atributo_2.valores.length; j++) {
      let id_registro = await ID_registro.findOne() 
      id_registro.id_variacion += 1
     await id_registro.save()

      let combinacion = {
       id_variacion: id_registro.id_variacion,
       atributo_1: atributo_1.valores[k].valor,
       atributo_2: atributo_2.valores[j].valor,
       stock: 2,
       etiquetas: 1,
       id_padre
    }
    variaciones.push(combinacion)
   }
  }
  // atributo_1.valores.forEach( async atr_1 => {
  //   //let atr_2 = [...atributo_2.valores];
  //   atributo_2.valores.forEach(async atr_2 => {

  //        let id_registro = await ID_registro.findOne() 
  //        id_registro.id_variacion += 1
  //        id_registro.save()

  //        let combinacion = {
  //         id_variacion: id_registro,
  //         atributo_1: atr_1.valor,
  //         atributo_2: atr_2.valor,
  //         stock: 2,
  //         etiquetas: 1,
  //         id_padre
  //       };       
  //      variaciones.push(combinacion)
  //    })
  // });
  return variaciones
}

 //const crear_variaciones_2 = "1234"  //¿por qué fala si le intneto poner el export al principio?
 module.exports = {crear_variaciones}  //
/* 
export const crear_variaciones_anulado(i,j1){
  let variacionesTallaColor = [];
  const [todosLosColores, tallas] = this.tot[j1].atributo;
  
  tallas.valores.forEach(talla => {
    let colores = [...todosLosColores.valores];

     colores.forEach(color => {
         let combinacion = {
          a: talla.valor,
          b: color.valor,
          stock: 0,
          etiquetas: 0
        };
       
       variacionesTallaColor.push(combinacion)
     })
  });


  this.tot[j1].variaciones = [...variacionesTallaColor]
  console.log('Variaciones -->', variacionesTallaColor);
  this.tot[j1].atributo["0"].visible = false
  this.tot[j1].atributo["1"].visible = false
  console.log("atributo")
  console.log(this.tot[j1].atributo[0].visible)
} */