const API_BASE = "http://localhost:3000/api";
const token = localStorage.getItem("token");

if (!token) location.href = "admin-login.html";

// DOM
const tabla = document.getElementById("tabla-productos");
const paginador = document.getElementById("paginador");
const busqueda = document.getElementById("busqueda");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroActivo = document.getElementById("filtro-activo");
const btnRefrescar = document.getElementById("btn-refrescar");
const btnLogout = document.getElementById("btn-logout");

// form
const form = document.getElementById("form-producto");
const fId = document.getElementById("prod-id");
const fNombre = document.getElementById("prod-nombre");
const fPrecio = document.getElementById("prod-precio");
const fStock = document.getElementById("prod-stock");
const fTipo = document.getElementById("prod-tipo");
const fImg = document.getElementById("prod-img");
const btnReset = document.getElementById("form-reset");

let page = 1, pages = 1, limit = 10;

// helpers
const authHeaders = () => ({ "Authorization": `Bearer ${token}` });

async function cargarTipos(){
  // const res = await fetch(`${API_BASE}/tipos`, { headers: authHeaders() });
  // const tipos = await res.json();
  // mock mínimo si no hay endpoint:
  const tipos = [{id:1, nombre:"Remera"}, {id:2, nombre:"Buzo"}];
  fTipo.innerHTML = tipos.map(t=>`<option value="${t.id}">${t.nombre}</option>`).join("");
  filtroTipo.innerHTML += tipos.map(t=>`<option value="${t.id}">${t.nombre}</option>`).join("");
}

async function listar(p=1){
  page = p;
  const q = new URLSearchParams();
  q.set("page", page);
  q.set("limit", limit);
  if (busqueda.value.trim()) q.set("search", busqueda.value.trim());
  if (filtroTipo.value) q.set("tipoId", filtroTipo.value);
  if (filtroActivo.value !== "") q.set("activo", filtroActivo.value);

  const res = await fetch(`${API_BASE}/productos?${q.toString()}`, { headers: authHeaders() });
  const data = await res.json(); // {items,page,pages,total}
  renderTabla(data.items || []);
  renderPaginado(data.page || 1, data.pages || 1);
}

function renderTabla(items){
  if (!items.length){
    tabla.innerHTML = `<div class="empty">No hay productos</div>`;
    return;
  }
  tabla.innerHTML = `
    <div id="contenedor-productos" style="grid-template-columns: repeat(3, minmax(0,1fr))">
      ${items.map(p => `
        <div class="card-producto">
          <img src="${p.imagenUrl || 'img/placeholder.png'}" alt="${p.nombre}">
          <h3>${p.nombre}</h3>
          <p class="price">$${p.precio}</p>
          <p class="muted">Stock: ${p.stock ?? 0} · ${p.activo ? 'Activo' : 'Inactivo'}</p>
          <div class="actions">
            <button data-edit="${p.id}" class="outline">Editar</button>
            ${p.activo
              ? `<button data-desact="${p.id}" class="ghost">Desactivar</button>`
              : `<button data-react="${p.id}" class="outline">Reactivar</button>`}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderPaginado(p, totalPages){
  pages = totalPages;
  let html = "";
  for (let i=1; i<=pages; i++){
    html += `<button class="outline" data-page="${i}" ${i===p?'disabled':''}>${i}</button>`;
  }
  paginador.innerHTML = html;
}

// crear/editar
form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const fd = new FormData();
  fd.append("nombre", fNombre.value.trim());
  fd.append("precio", fPrecio.value);
  fd.append("stock", fStock.value);
  fd.append("tipoId", fTipo.value);
  if (fImg.files[0]) fd.append("imagen", fImg.files[0]);

  // create o update
  const url = fId.value ? `${API_BASE}/productos/${fId.value}` : `${API_BASE}/productos`;
  const method = fId.value ? "PUT" : "POST";
  const res = await fetch(url, { method, headers: authHeaders(), body: fd });
  if (!res.ok) { alert("Error al guardar"); return; }

  form.reset(); fId.value = "";
  listar(page);
});

btnReset.addEventListener("click", ()=>{
  form.reset(); fId.value = "";
});

// activar/desactivar/editar/paginador/búsqueda
tabla.addEventListener("click", async (e)=>{
  const idEdit = e.target.dataset.edit;
  const idDesact = e.target.dataset.desact;
  const idReact = e.target.dataset.react;

  if (idEdit){
    // cargar el producto para editar
    const r = await fetch(`${API_BASE}/productos/${idEdit}`, { headers: authHeaders() });
    const p = await r.json();
    fId.value = p.id;
    fNombre.value = p.nombre;
    fPrecio.value = p.precio;
    fStock.value = p.stock ?? 0;
    fTipo.value = p.tipoId ?? "";
    window.scrollTo({ top: form.offsetTop - 20, behavior: 'smooth' });
  }

  if (idDesact){
    await fetch(`${API_BASE}/productos/${idDesact}/desactivar`, { method:"POST", headers: authHeaders() });
    listar(page);
  }
  if (idReact){
    await fetch(`${API_BASE}/productos/${idReact}/reactivar`, { method:"POST", headers: authHeaders() });
    listar(page);
  }
});

paginador.addEventListener("click", (e)=>{
  const p = +e.target.dataset.page;
  if (p) listar(p);
});

btnRefrescar.addEventListener("click", ()=> listar(1));
busqueda.addEventListener("input", ()=> listar(1));
filtroTipo.addEventListener("change", ()=> listar(1));
filtroActivo.addEventListener("change", ()=> listar(1));

btnLogout.addEventListener("click", ()=>{
  localStorage.removeItem("token");
  location.href = "admin-login.html";
});

// init
(async function init(){
  await cargarTipos();
  await listar(1);
})();
