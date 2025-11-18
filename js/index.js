const API_BASE = "http://localhost:4000/api";

const inputNombre = document.getElementById("nombre-cliente");
const boton = document.getElementById("btn-ingresar");

async function crearCliente(nombre) {
  try {
    const res = await fetch(`${API_BASE}/clientes`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ nombre })
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    localStorage.setItem("cliente", nombre);
  } catch (error) {
    console.error("Error al crear cliente:", error.message);
  }
}

boton.addEventListener("click", async () => {
  const nombre = inputNombre.value.trim();
  if (nombre) {
    await crearCliente(nombre);
    window.location.href = "productos.html";
  } else {
    alert("Por favor, ingresá tu nombre antes de continuar");
  }
});
