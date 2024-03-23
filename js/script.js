// script.js
document.addEventListener("DOMContentLoaded", function () {
    const catalogo = [
        { id: "Small Talk", autor:"Soda Blonde", imagen: "sodablonde1.jpg", precio: 10, tipo: "CD" },
        { id: "Dream Big", autor:"Soda Blonde", imagen: "sodablonde2.jpg", precio: 15, tipo: "CD"},
        { id: "Jeff Buckley", autor:"Jeff Buckley", imagen: "jeffbuckley.jpg", precio: 20, tipo: "CD" },
        // Agrega más productos aquí
    ];

    const catalogoContainer = document.getElementById("catalogo");
    const resumenCompra = document.getElementById("resumenCompra");
    const total = document.getElementById("total");

    // Genera las tarjetas de productos en el catálogo
    catalogo.forEach((producto) => {
        const card = document.createElement("div");
        //card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
        <div class="card-container">
            <div class="card">
                <div><img src="img/products/${producto.imagen}" class="card-img-top" alt="${producto.id}"></div>
                <div class="card-body">
                    <h5 class="card-title">${producto.id}</h5>
                    <p class="card-text">by ${producto.autor}</p>
                    <p class="card-text">$${producto.precio}</p>
                
                <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default" id="decreaseBtn">-</button>
                    </span>
                    <input type="text" class="form-control" id="numberInput" data-id="cantidadProducto" value="1">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default" id="increaseBtn">+</button>
                    </span>
                    <div><button class="btn btn-primary mt-2" data-id="${producto.id}">Add to Cart</button></div>
                    
                </div>

            </div>
        </div>
        `;
        catalogoContainer.appendChild(card);

        // Agrega un evento de clic al botón de "Agregar al Carrito"
        const botonAgregar = card.querySelector("button");
        botonAgregar.addEventListener("click", function () {
            const cantidad = parseInt(document.getElementById(`cantidadProducto${producto.id}`).value);

            if (cantidad > 0) {
                agregarProductoAlCarrito(producto, cantidad);
            }
        });
    });

    const carrito = [];

    function agregarProductoAlCarrito(producto, cantidad) {
        // Busca si el producto ya está en el carrito
        const productoEnCarrito = carrito.find((item) => item.producto.id === producto.id);

        if (productoEnCarrito) {
            // Si ya está en el carrito, actualiza la cantidad
            productoEnCarrito.cantidad += cantidad;
        } else {
            // Si no está en el carrito, agrega un nuevo elemento al carrito
            carrito.push({ producto, cantidad });
        }

        // Actualiza el resumen de la compra
        actualizarResumenCompra();
    }

    function actualizarResumenCompra() {
        // Limpia el resumen de compra
        resumenCompra.innerHTML = "";
        let subtotalTotal = 0;

        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>Producto ${item.producto.id}</td>
                <td>${item.cantidad}</td>
                <td>$${item.producto.precio * item.cantidad}</td>
            `;
            resumenCompra.appendChild(fila);

            subtotalTotal += item.producto.precio * item.cantidad;
        });

        // Actualiza el total
        total.textContent = `$${subtotalTotal}`;
    }
});