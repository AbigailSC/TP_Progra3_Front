const ticketDiv = document.getElementById("ticket");
const carrito = JSON.parse(localStorage.getItem("ticket")) || [];
const cliente = localStorage.getItem("cliente");

let total = 0;
let html = `<p>Cliente: <strong>${cliente}</strong></p><ul>`;

carrito.forEach(p => {
<<<<<<< HEAD
  html += `<li>${p.titulo} x${p.cantidad} = $${p.precio * p.cantidad}</li>`;
=======
  html += `<li>${p.titulo || p.nombre} x${p.cantidad} = $${p.precio * p.cantidad}</li>`;
>>>>>>> 4530bbf5a1910889b3d4d08309a5f7304cf57e0a
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
