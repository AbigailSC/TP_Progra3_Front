
// URL DEl BACKEND
const API_BASE = "http://localhost:3000/api";

const contenedorProductos = document.getElementById("contenedor-productos");
const barraBusqueda = document.getElementById("barra-busqueda");
const contadorCarrito = document.getElementById("contador-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Productos simulados

// productos cambiarlo al backend despues
// let productos = [];
const productos = [
  { id: 1, nombre: "Remera Negra", tipo: "Remera", precio: 5000, ruta_img: "img/Remera_Negra.jpg", cantidad: 0 },
  { id: 2, nombre: "Remera Blanca", tipo: "Remera", precio: 4800, ruta_img: "img/Remera_Blanca.jpg", cantidad: 0 },
  { id: 3, nombre: "Remera Azul", tipo: "Remera", precio: 5200, ruta_img: "img/Remera_Azul.jpg", cantidad: 0 },
  { id: 4, nombre: "Buzo Negro", tipo: "Buzo", precio: 9000, ruta_img: "img/Buzo_Negro.jpg", cantidad: 0 },
  { id: 5, nombre: "Buzo Gris", tipo: "Buzo", precio: 9500, ruta_img: "img/Buzo_Gris.jpg", cantidad: 0 },
  { id: 6, nombre: "Buzo Rojo", tipo: "Buzo", precio: 10000, ruta_img: "img/Buzo_Rojo.jpg", cantidad: 0 }
];


/*
// cargar productos desde la API
async function cargarProductos() {
  try {
    const res = await fetch("${API_BASE}/productos");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    productos = data.filter(p => (p.activo === true) || (p.stock === undefined || p.stock > 0));
  } finally {
    mostrarLista(productos);
    actualizarContador();
  }
}*/


// Mostrar productos
function mostrarLista(array) {
  contenedorProductos.innerHTML = "";
  array.forEach(prod => {
    contenedorProductos.innerHTML += `
      <div class="card-producto">
        <img src="${prod.ruta_img}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>$${prod.precio}</p>
        <button onclick="agregarACarrito(${prod.id})">Agregar</button>
      </div>`;
  });
}

// Filtrar
barraBusqueda.addEventListener("input", () => {
  let valor = barraBusqueda.value.toLowerCase();
  let filtrados = productos.filter(p => p.nombre.toLowerCase().includes(valor));
  mostrarLista(filtrados);
});

// Agregar al carrito
function agregarACarrito(id) {
  let producto = productos.find(p => p.id === id);
  let enCarrito = carrito.find(p => p.id === id);

  if (enCarrito) {
    enCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarContador();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Contador del carrito
function actualizarContador() {
  let total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  contadorCarrito.innerText = `Carrito: ${total}`;
}

// Mostrar nombre del cliente
document.getElementById("nombre-cliente").innerText = localStorage.getItem("cliente") || "Cliente";


//Filtros por prenda de ropa
document.getElementById("filtro-todo").addEventListener("click", () => mostrarLista(productos));
document.getElementById("filtro-remeras").addEventListener("click", () => mostrarLista(productos.filter(p => p.tipo === "Remera")));
document.getElementById("filtro-buzos").addEventListener("click", () => mostrarLista(productos.filter(p => p.tipo === "Buzo")));



// cargarProductos();
mostrarLista(productos);
actualizarContador();
