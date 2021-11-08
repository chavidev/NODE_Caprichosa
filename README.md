# Modas la caprichosa
##### descripción:

> En Este proyecto voy a crear una base de datos 
para manejar el stock de una tienda de ropa de muger, pudiendo introducir con facilidad nuevos productos , actualizarlos y poder comprar.


``` Constará de los siguientes modelos ``` 


##### PRODUCTOS:
- ref(para ayudar a hacer debugging)
- Nombre
- precio Coste
- PVP
- Atributo (Color y talla, que a su vez serán  modelos propios)
- Variaciones (a partid de todas las combinaciones posibles de color y talla)
- Categoría


##### CARRITO
- id_cliente
- dirección
- productos [variación y cantidad]
- importe total


##### Clientes
- id_cliente
- ref: 
- nombre
- email
- teléfono
- contraseña


``` mas información en:   ```
[figma]
![](./img/modeloDatos.PNG){width='100px'}




[figma]: <https://www.figma.com/file/B9OXv0ezwkKf9i32PyH2yf/modas-la-caprichosa?node-id=0%3A1 "TENGO QUE CONSEGUIR COLOCAR EL TÍTULO AQUÍ">