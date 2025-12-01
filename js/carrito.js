const contenedorCarrito = document.getElementById("contenedor-carrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const idCarrito = parseInt(localStorage.getItem("carrito_id")) || null;

const textError = document.querySelector(".msg-error");

// Mostrar carrito
function mostrarCarrito() {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((p, i) => {
    contenedorCarrito.innerHTML += `
      <div class="bloque-item">
        <p>${p.titulo} x${p.cantidad} - $${p.precio * p.cantidad}</p>
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
  if (carrito.length > 0) {
    const transaccionCompleta = await crearVenta(idCarrito);
    localStorage.setItem("ticket", JSON.stringify(carrito));
    if (transaccionCompleta) {
      window.location.href = "ticket.html";
    }
  } else {
    alert("El carrito está vacío");
  }
}

async function crearVenta(idCarrito) {
  try {
    const response = await fetch(`http://localhost:4000/api/ventas`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ idCarrito, metodoPago: "efectivo" })
    });
    const data = await response.json();

    if (data.status !== 201) {
      textError.textContent = data.data.errors.join(", ");
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
