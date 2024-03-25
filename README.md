# Tienda

1. Explique cada una de las funciones definidas por el usuario en el código JavaScript presentado en el paso 2.
- document.addEventListener("DOMContentLoaded", function () añade código que se corre al cargar la página crea tarjetas por cada elemento que exista en el catalogo
- agregarProductoAlCarrito verifica si el producto ya esta en el carrito y agrega el número seleccionado  al carrito y si todavía no existe el producto en el carrito lo agrega al arreglo.
- actualizarResumenCompra elimina el código dentro de la sección de resumen de compra que se encuentra dentro de una tabla y genera una fila con 3 columnas por cada producto y hace el recalculo del subtotal y lo actualiza en la etiqueta que muestra el total.
2. En el código js, ¿qué tipo de variable es "catalogo"? ¿Como se manipula?
- Es un arreglo.
3. ¿Que hace const card = document.createElement("div") ?
- Genera una etiqueta HTML de tipo div y la almacena en la variable llamada card.
4. ¿Que hace card.innerHTML ?
- Sustituye el código HTML contenido dentro de la etiqueta *card*.
5. ¿Que hace catalogoContainer.appendChild(card) ?
- Agrega a la etiqueta catalogoContainer una etiqueta llamada card. Esto sirve para agregar elementos dentros de otro en JavaScript.
