//lista de productos con categorías
const productos = [
    { id: 1, nombre: "Remera Premium", precio: 6999, imagen: "img/1.jpg", categoria: "remeras", descripcion: "Remera 100% algodón" },
    { id: 2, nombre: "Gorra Street", precio: 14999, imagen: "img/2.jpg", categoria: "accesorios", descripcion: "Gorra ajustable" },
    { id: 3, nombre: "Buzo Deportivo", precio: 29999, imagen: "img/3.jpg", categoria: "buzos", descripcion: "Buzo cómodo" },
    { id: 4, nombre: "Buzo Premium", precio: 44999, imagen: "img/4.jpg", categoria: "buzos", descripcion: "Buzo deluxe" },
    { id: 5, nombre: "Conjunto Femenino", precio: 75999, imagen: "img/5.jpg", categoria: "especiales", descripcion: "Conjunto elegante" },
    { id: 6, nombre: "Sueter Clásico", precio: 34999, imagen: "img/6.jpg", categoria: "buzos", descripcion: "Sueter de lana" },
    { id: 7, nombre: "Campera Impermeable", precio: 49999, imagen: "img/7.jpg", categoria: "especiales", descripcion: "Campera resistente" },
    { id: 8, nombre: "Remera Corta Femenina", precio: 4999, imagen: "img/8.jpg", categoria: "remeras", descripcion: "Remera ajustada" },
    { id: 9, nombre: "Buzo Blanco-Negro", precio: 14999, imagen: "img/9.jpg", categoria: "buzos", descripcion: "Diseño exclusivo" },
    { id: 10, nombre: "Jordan Limited", precio: 79999, imagen: "img/10.jpg", categoria: "especiales", descripcion: "Edición limitada" },
];

let carrito = [];
let filtroActivo = "todos";

//Renderizar productos
const contenedorProductos = document.getElementById("contenedor-productos");

function renderizarProductos(productsToRender = productos) {
    contenedorProductos.innerHTML = "";
    
    productsToRender.forEach(producto => {
        const card = document.createElement("div");
        card.className = "producto-card";
        
        const imgContainer = document.createElement("div");
        imgContainer.className = "producto-img-container";
        
        const img = document.createElement("img");
        img.src = producto.imagen;
        img.alt = producto.nombre;
        
        const badge = document.createElement("div");
        badge.className = "producto-badge";
        badge.textContent = "NUEVO";
        
        imgContainer.appendChild(img);
        imgContainer.appendChild(badge);
        
        const info = document.createElement("div");
        info.className = "producto-info";
        
        const categoria = document.createElement("div");
        categoria.className = "producto-categoria";
        categoria.textContent = producto.categoria.toUpperCase();
        
        const nombre = document.createElement("div");
        nombre.className = "producto-nombre";
        nombre.textContent = producto.nombre;
        
        const descripcion = document.createElement("div");
        descripcion.className = "producto-descripcion";
        descripcion.textContent = producto.descripcion;
        
        const precioContainer = document.createElement("div");
        precioContainer.className = "precio-container";
        
        const precio = document.createElement("div");
        precio.className = "producto-precio";
        precio.textContent = `$${producto.precio.toLocaleString('es-AR')}`;
        
        precioContainer.appendChild(precio);
        
        const btnAgregar = document.createElement("button");
        btnAgregar.className = "btn-agregar";
        btnAgregar.innerHTML = '<i class="fas fa-shopping-cart"></i> Agregar al Carrito';
        btnAgregar.onclick = (e) => {
            e.stopPropagation();
            agregarAlCarrito(producto.id);
        };
        
        info.appendChild(categoria);
        info.appendChild(nombre);
        info.appendChild(descripcion);
        info.appendChild(precioContainer);
        info.appendChild(btnAgregar);
        
        card.appendChild(imgContainer);
        card.appendChild(info);
        
        contenedorProductos.appendChild(card);
    });
}

//Función para filtrar productos
document.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        document.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        
        filtroActivo = e.target.dataset.filtro;
        
        if (filtroActivo === "todos") {
            renderizarProductos(productos);
        } else {
            const productosFiltr = productos.filter(p => p.categoria === filtroActivo);
            renderizarProductos(productosFiltr);
        }
    });
});

//Función para agregar al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const itemEnCarrito = carrito.find(p => p.id === productoId);
    
    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    actualizarCarrito();
}

//Función para eliminar del carrito
function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(p => p.id !== productoId);
    actualizarCarrito();
}

//Función para modificar cantidad
function modificarCantidad(productoId, cantidad) {
    if (cantidad <= 0) {
        eliminarDelCarrito(productoId);
        return;
    }
    
    const producto = carrito.find(p => p.id === productoId);
    if (producto) {
        producto.cantidad = cantidad;
        actualizarCarrito();
    }
}

//Función para actualizar el carrito
function actualizarCarrito() {
    mostrarCarrito();
    actualizarContador();
}

//Función para mostrar el carrito
function mostrarCarrito() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = '<div class="carrito-vacio"><i class="fas fa-shopping-bag"></i><p>Tu carrito está vacío</p></div>';
        document.getElementById("total-carrito").textContent = "$0";
        return;
    }

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        const li = document.createElement("li");
        li.className = "carrito-item";
        
        const info = document.createElement("div");
        info.className = "carrito-item-info";
        
        const nombre = document.createElement("div");
        nombre.className = "carrito-item-nombre";
        nombre.textContent = producto.nombre;
        
        const precio = document.createElement("div");
        precio.className = "carrito-item-precio";
        precio.textContent = `$${subtotal.toLocaleString('es-AR')}`;
        
        info.appendChild(nombre);
        info.appendChild(precio);
        
        const cantidadDiv = document.createElement("div");
        cantidadDiv.className = "carrito-item-cantidad";
        
        const btnMenos = document.createElement("button");
        btnMenos.className = "btn-cantidad";
        btnMenos.textContent = "-";
        btnMenos.onclick = () => modificarCantidad(producto.id, producto.cantidad - 1);
        
        const cantidadInput = document.createElement("input");
        cantidadInput.className = "cantidad-input";
        cantidadInput.type = "number";
        cantidadInput.value = producto.cantidad;
        cantidadInput.min = "1";
        cantidadInput.onchange = (e) => {
            const valor = parseInt(e.target.value);
            if (valor > 0) {
                modificarCantidad(producto.id, valor);
            } else {
                e.target.value = producto.cantidad;
            }
        };
        
        const btnMas = document.createElement("button");
        btnMas.className = "btn-cantidad";
        btnMas.textContent = "+";
        btnMas.onclick = () => modificarCantidad(producto.id, producto.cantidad + 1);
        
        cantidadDiv.appendChild(btnMenos);
        cantidadDiv.appendChild(cantidadInput);
        cantidadDiv.appendChild(btnMas);
        
        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn-eliminar";
        btnEliminar.innerHTML = '<i class="fas fa-trash"></i>';
        btnEliminar.onclick = () => eliminarDelCarrito(producto.id);
        
        li.appendChild(info);
        li.appendChild(cantidadDiv);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
        
        total += subtotal;
    });
    
    document.getElementById("total-carrito").textContent = `$${total.toLocaleString('es-AR')}`;
}

//Función para actualizar contador del carrito
function actualizarContador() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById("contador-carrito").textContent = totalItems;
}

//Abrir y cerrar modal del carrito
const modalCarrito = document.getElementById("modal-carrito");
const btnCarrito = document.getElementById("btn-carrito");
const btnCerrarCarrito = document.getElementById("btn-cerrar-carrito");
const btnSeguirComprando = document.getElementById("btn-seguir-comprando");
const btnComprar = document.querySelector(".btn-comprar");

btnCarrito.addEventListener("click", () => {
    modalCarrito.classList.add("active");
});

btnCerrarCarrito.addEventListener("click", () => {
    modalCarrito.classList.remove("active");
});

btnSeguirComprando.addEventListener("click", () => {
    modalCarrito.classList.remove("active");
});

btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de continuar.");
        return;
    }
    
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalMonto = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    alert(`¡Gracias por su compra de: $${totalMonto.toLocaleString('es-AR')}!\nVuelva pronto lo esperamos!!`);
    
    carrito = [];
    actualizarCarrito();
    modalCarrito.classList.remove("active");
});

modalCarrito.addEventListener("click", (e) => {
    if (e.target === modalCarrito) {
        modalCarrito.classList.remove("active");
    }
});

//Inicializar productos
renderizarProductos();
