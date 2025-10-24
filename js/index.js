const inputNombre = document.getElementById("nombre-cliente");
const boton = document.getElementById("btn-ingresar");

boton.addEventListener("click", () => {
  const nombre = inputNombre.value.trim();
  if (nombre) {
    localStorage.setItem("cliente", nombre);
    window.location.href = "productos.html";
  } else {
    alert("Por favor, ingresá tu nombre antes de continuar");
  }
});
