const ticketDiv = document.getElementById("ticket");
const carrito = JSON.parse(localStorage.getItem("ticket")) || [];
const clienteData = JSON.parse(localStorage.getItem("cliente") || "{}");
const nombreCliente = clienteData.nombre || "Cliente";

let total = 0;
let html = `<p>Cliente: <strong>${nombreCliente}</strong></p><ul>`;

carrito.forEach(p => {
  html += `<li>${p.titulo || p.nombre} x${p.cantidad} = $${p.precio * p.cantidad}</li>`;
  total += p.precio * p.cantidad;
});

html += `</ul><h3>Total: $${total}</h3>`;
ticketDiv.innerHTML = html;

document.getElementById('btn-pdf')?.addEventListener('click', ()=> window.print());

function volverInicio() {
  // Solo borrar datos de compra, NO el tema
  localStorage.removeItem("ticket");
  localStorage.removeItem("cliente");
  localStorage.removeItem("carrito");
  window.location.href = "index.html";
}
