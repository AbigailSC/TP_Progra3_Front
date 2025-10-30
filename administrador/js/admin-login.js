const API_BASE = "http://localhost:3000/api";

const form = document.getElementById("form-login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const msg = document.getElementById("msg");
const btnFast = document.getElementById("acceso-rapido");

// botón de acceso rápido (autocompleta)
btnFast.addEventListener("click", () => {
  email.value = "admin@demo.local";
  password.value = "admin123";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "Ingresando…";

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ email: email.value.trim(), password: password.value })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error("Credenciales inválidas");

    // guardo token y voy al panel
    localStorage.setItem("token", data.token);
    location.href = "admin.html";
  } catch (err) {
    msg.textContent = err.message || "Error de login";
  }
});
