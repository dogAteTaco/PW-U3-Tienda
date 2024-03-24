// script.js
const catalogoCompleto = [
    { id: "Small Talk", autor: "Soda Blonde", imagen: "sodablonde1.jpg", precio: 10, tipo: "CD" },
    { id: "Dream Big", autor: "Soda Blonde", imagen: "sodablonde2.jpg", precio: 15, tipo: "CD" },
    { id: "Jeff Buckley", autor: "Jeff Buckley", imagen: "jeffbuckley.jpg", precio: 20, tipo: "CD" },
    { id: "Primal Heart", autor: "Kimbra", imagen: "primarheart.jpg", precio: 12, tipo: "CD" },
    { id: "L'enfant Sauvage", autor: "Gojira", imagen: "lenfantsauvage.jpg", precio: 14, tipo: "CD" },
    { id: "The Way of All Flesh", autor: "Gojira", imagen: "wayofallflesh.jpg", precio: 18, tipo: "CD" },
    { id: "Magma", autor: "Gojira", imagen: "magma.jpg", precio: 15, tipo: "CD" },
    { id: "Fortitude", autor: "Gojira", imagen: "fortitude.jpg", precio: 13, tipo: "CD" },
    { id: "The Long Dark Blue", autor: "Swain", imagen: "longdarkblue.jpg", precio: 18, tipo: "CD" },
    { id: "Adele", autor: "30", imagen: "30.jpg", precio: 19, tipo: "CD" },
];

let added = 0;
let total = 0;
let tipoFiltro = "";
class CartItem {
    constructor(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}
let cart = [];



document.addEventListener("DOMContentLoaded", function () {

    cargarProductos(catalogoCompleto);
    const searchButton = document.getElementById("searchbutton");
    const searchBar = document.getElementById("searchbar");
    const allItems = document.getElementById("allItems");
    const cdItems = document.getElementById("allItems");
    const bookItems = document.getElementById("allItems");
    allItems.addEventListener("click",function(){
        tipoFiltro = None;
        filtrar(searchBar.value,tipoFiltro);
    });

    cdItems.addEventListener("click",function(){
        tipoFiltro = "cd";
        filtrar(searchBar.value,tipoFiltro);
    });

    bookItems.addEventListener("click",function(){
        tipoFiltro = "book";
        filtrar(searchBar.value,tipoFiltro);
    });

    searchButton.addEventListener("click", function () {
        filtrar(searchBar.value, tipoFiltro);
    });
    
    searchBar.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            filtrar(searchBar.value, tipo);
        }
    });
    const buttons = document.querySelectorAll('.cantidadField');

    const cartTag = document.getElementById("cart");
    const cartTotal = document.getElementById("totalSpan");
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonValue = this.getAttribute('data-id');
            const cardContainer = this.closest('.card-container');

            const inputField = cardContainer.querySelector('input[data-id="cantidadProducto"]');

            const inputValue = inputField.value;
            console.log(`Input value: ${inputValue}`);
            // Get the sibling <h5> element
            const h5Element = cardContainer.querySelector('.card-title');
            const h5Value = h5Element.textContent; // Retrieve the text content

            console.log(`Product ID: ${h5Value}`);
            if (!cart.some(e => e.id === h5Value)) {
                cart.push(new CartItem(buttonValue, inputValue));
                added = added + 1;
            }
            else
            {
                const product = cart.find(producto => producto.id === buttonValue);
                console.log(product);
                console.log(inputValue);
                product.quantity = Number.parseInt(product.quantity)+Number.parseInt(inputValue);
            }
            //Resets the total
            total = 0;
            const items = document.getElementById("cartItems");
            items.innerHTML = "";
            let itemDiv = document.createElement("div");
            // Recalculates the total of the cart
            cart.forEach((item)=>{
                const product = catalogoCompleto.find(producto => producto.id === item.id);
                const precio = Number.parseInt(product.precio);
                console.log(precio);
                total = total + Number.parseInt(item.quantity)*precio;
                itemDiv = document.createElement("div");
                console.log(item.id);
                let currentItem = catalogoCompleto.find((p) => p.id===item.id);
                itemDiv.innerHTML = `
                <div class="cartItem" style="width: 280px; display: flex; align-items: center;">
                    <div style="display: inline; margin-right:10px;"><img src="img/products/${currentItem.imagen}"></div>
                    <span style="flex-grow: 1; padding-right: 15px;">${currentItem.id}</span>
                    <span style="text-align: right;">$${currentItem.precio}x${item.quantity}</span>
                </div>
                `;
                items.appendChild(itemDiv);
            });
            
            
            cartTotal.textContent = "$"+total+".00";
            cartTag.textContent = added;
        });
    });

});

function cargarProductos(catalogo) {
    const catalogoContainer = document.getElementById("catalogo");
    catalogoContainer.innerHTML = "";
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
                        <p class="card-author">by ${producto.autor}</p>
                        <p class="card-text">$${producto.precio}</p>
                        <input type="number" min="0" class="form-control" data-id="cantidadProducto" value="1">
                        <button class="cantidadField btn btn-primary mt-2" data-id="${producto.id}">Add to Cart</button>
                    </div>
                    </div>
                </div>
            </div>
            `;
        catalogoContainer.appendChild(card);

    });
}

// Filtra los productos basados en tipo, autor o id
function filtrar(filter, tipo = "") {
    const lowerCaseFilter = filter.toLowerCase(); 

    const filteredItems = catalogoCompleto.filter(item => {
        const lowerCaseId = item.id.toLowerCase(); 
        const lowerCaseAutor = item.autor.toLowerCase(); 
        const lowerCaseTipo = item.tipo.toLowerCase(); 
        console.log(filter);
        return (lowerCaseId.includes(lowerCaseFilter) || lowerCaseAutor.includes(lowerCaseFilter) || filter===None || filter.trim() ==="") && (tipo.toLowerCase() === "" || lowerCaseTipo === tipo.toLowerCase());
    });

    cargarProductos(filteredItems);
}