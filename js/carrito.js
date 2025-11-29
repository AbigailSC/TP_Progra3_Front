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


async function confirmarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  try {
    // Enviar al backend para registrar la venta
    const response = await fetch('http://localhost:4000/api/ventas/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: carrito, metodoPago: 'efectivo' })
    });

    if (response.ok) {
      // Guardar en ticket igual que antes para mostrar
      localStorage.setItem("ticket", JSON.stringify(carrito));
      carrito = [];
      localStorage.removeItem("carrito");
      window.location.href = "ticket.html";
    } else {
      const result = await response.json();
      alert(result.message || 'Error al procesar la compra');
    }
  } catch (error) {
    console.error(error);
    alert('Error de conexión');
  }
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
