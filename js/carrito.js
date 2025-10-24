const contenedorCarrito = document.getElementById("contenedor-carrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar carrito
function mostrarCarrito() {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((p, i) => {
    contenedorCarrito.innerHTML += `
      <div class="bloque-item">
        <p>${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}</p>
        <button onclick="eliminar(${i})">❌</button>
      </div>`;
  });
}


function eliminar(i) {
  carrito.splice(i, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
}


function confirmarCompra() {
  if (carrito.length > 0) {
    localStorage.setItem("ticket", JSON.stringify(carrito));
    window.location.href = "ticket.html";
  } else {
    alert("El carrito está vacío");
  }
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
