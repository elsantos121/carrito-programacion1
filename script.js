//lista de producto simulada
const productos = [
    { id: 1, nombre: "Remera", precio: 100 },
    { id: 2, nombre: "Pantalon", precio: 200 },
    { id: 3, nombre: "Suete", precio: 300 },
];

let carrito = [];

//renderizar productos
const contenedorProductos = document.getElementById("contenedor-productos");
productos.forEach(producto => {
    const btn = document.createElement("button");
    btn.textContent = `Agregar ${producto.nombre} - $${producto.precio}`;
    btn.onclick = () => agregarAlCarrito(producto.id);
    contenedorProductos.appendChild(btn);
});

//funcion para agregar al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const itemEnCarrito = carrito.find(p => p.id === productoId);
    
    if (itemEnCarrito) {
        // Si ya existe, aumentar cantidad
        itemEnCarrito.cantidad++;
    } else {
        // Si no existe, agregarlo con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
    }
    MostrarCarrito();
}

//funcion para mostrar el carrito
function MostrarCarrito() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = "<li>El carrito está vacío</li>";
        document.getElementById("total-carrito").textContent = "Total: $0";
        return;
    }

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.padding = "10px";
        li.style.borderBottom = "1px solid #eee";
        
        const info = document.createElement("span");
        info.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${subtotal}`;
        
        const botones = document.createElement("div");
        
        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        btnMenos.style.marginRight = "5px";
        btnMenos.onclick = () => modificarCantidad(producto.id, producto.cantidad - 1);
        
        const btnMas = document.createElement("button");
        btnMas.textContent = "+";
        btnMas.style.marginRight = "5px";
        btnMas.onclick = () => modificarCantidad(producto.id, producto.cantidad + 1);
        
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.style.backgroundColor = "#ff6b6b";
        btnEliminar.style.color = "white";
        btnEliminar.onclick = () => eliminarDelCarrito(producto.id);
        
        botones.appendChild(btnMenos);
        botones.appendChild(btnMas);
        botones.appendChild(btnEliminar);
        
        li.appendChild(info);
        li.appendChild(botones);
        lista.appendChild(li);
        
        total += subtotal;
    });
    
    document.getElementById("total-carrito").textContent = `Total: $${total}`;
}

//eliminar productos del carrito
function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(p => p.id !== productoId);
    MostrarCarrito();
}

//modificar cantidad de productos
function modificarCantidad(productoId, cantidad) {
    if (cantidad <= 0) {
        eliminarDelCarrito(productoId);
        return;
    }
    
    const producto = carrito.find(p => p.id === productoId);
    if (producto) {
        producto.cantidad = cantidad;
        MostrarCarrito();
    }
}
