const cambiarTemaBtn = document.getElementById("cambiar-tema");

const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

cambiarTemaBtn?.addEventListener("click", () => {
  const actual = document.documentElement.getAttribute("data-theme") || "light";
  const siguiente = actual === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", siguiente);
  localStorage.setItem("theme", siguiente);
});
