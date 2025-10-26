// URL del backend (para conectar más adelante)
const API_BASE = "http://localhost:3000/api";

// DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const barraBusqueda = document.getElementById("barra-busqueda");
const contadorCarrito = document.getElementById("contador-carrito");
const spanCliente = document.getElementById("nombre-cliente");

//estado del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Productos simulados , para ver nomas 
const productos = [
  { id: 1, nombre: "Remera Negra",  tipo: "Remera", precio: 5000,  ruta_img: "img/Remera_Negra.jpg",  cantidad: 0 },
  { id: 2, nombre: "Remera Blanca", tipo: "Remera", precio: 4800,  ruta_img: "img/Remera_Blanca.jpg", cantidad: 0 },
  { id: 3, nombre: "Remera Azul",   tipo: "Remera", precio: 5200,  ruta_img: "img/Remera_Azul.jpg",   cantidad: 0 },
  { id: 4, nombre: "Buzo Negro",    tipo: "Buzo",   precio: 9000,  ruta_img: "img/Buzo_Negro.jpg",    cantidad: 0 },
  { id: 5, nombre: "Buzo Gris",     tipo: "Buzo",   precio: 9500,  ruta_img: "img/Buzo_Gris.jpg",     cantidad: 0 },
  { id: 6, nombre: "Buzo Rojo",     tipo: "Buzo",   precio: 10000, ruta_img: "img/Buzo_Rojo.jpg",     cantidad: 0 }
];

// Mostrar lista de productos
function mostrarLista(array) {
  contenedorProductos.innerHTML = "";
  array.forEach(prod => {
    contenedorProductos.innerHTML += `
      <div class="card-producto">
        <img src="${prod.ruta_img}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>$${prod.precio}</p>
        <button class="btn-agregar" data-id="${prod.id}">Agregar</button>
      </div>`;
  });
}

// Agregar producto al carrito
function agregarACarrito(id) {
  const producto = productos.find(p => p.id === id);
  const enCarrito = carrito.find(p => p.id === id);

  if (enCarrito) {
    enCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

// Actualizar contador del carrito
function actualizarContador() {
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  contadorCarrito.innerText = `Carrito: ${total}`;
}

// Filtro de búsqueda
barraBusqueda.addEventListener("input", () => {
  const valor = barraBusqueda.value.toLowerCase();
  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(valor));
  mostrarLista(filtrados);
});

// Eventos de botones agregar al carrito
contenedorProductos.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-agregar")) {
    const id = parseInt(e.target.dataset.id);
    agregarACarrito(id);
  }
});

// Mostrar nombre del cliente guardado
spanCliente.innerText = localStorage.getItem("cliente") || "Cliente";


mostrarLista(productos);
actualizarContador();

/* 
// Carga de productos desde backend

async function cargarProductos() {
  try {
    const res = await fetch(`${API_BASE}/productos`);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const visibles = data.filter(p => p.activo || p.stock > 0 || p.stock === undefined);
    mostrarLista(visibles);
  } catch (error) {
    console.error("Error al cargar productos:", error.message);
    mostrarLista([]); // opcional, deja vacio si hay error
  } finally {
    actualizarContador();
  }
}

// Y en lugar de mostrarLista(productos), llamar a:
// cargarProductos();
*/
