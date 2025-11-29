const ticketDiv = document.getElementById("ticket");
const carrito = JSON.parse(localStorage.getItem("ticket")) || [];
const cliente = localStorage.getItem("cliente");

let total = 0;
let html = `<p>Cliente: <strong>${cliente}</strong></p><ul>`;

carrito.forEach(p => {
  html += `<li>${p.titulo || p.nombre} x${p.cantidad} = $${p.precio * p.cantidad}</li>`;
  total += p.precio * p.cantidad;
});

html += `</ul><h3>Total: $${total}</h3>`;
ticketDiv.innerHTML = html;

document.getElementById('btn-pdf')?.addEventListener('click', ()=> window.print());

function volverInicio() {
  localStorage.clear();
  window.location.href = "index.html";
}
