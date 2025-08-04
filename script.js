// -------------------
// Inicialización de tema con persistencia
// -------------------
function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem('selectedTheme', theme);
}

function initTheme() {
  const saved = localStorage.getItem('selectedTheme') || '';
  document.body.className = saved;
}

// -------------------
// Creación de tarjetas para index.html
// -------------------
function createPostCard(post) {
  const card = document.createElement("a");
  card.href = `post.html?id=${post.slug}`;
  card.className = "card";
  card.innerHTML = `
    <img src="${post.thumbnail}" alt="${post.title}">
    <div class="card-content">
      <h2>${post.title}</h2>
      <p class="date">${post.date}</p>
      <p class="excerpt">Haz clic para leer más...</p>
    </div>
  `;
  return card;
}

function renderPostCards(posts) {
  const container = document.getElementById("post-list");
  if (!container) return; // Evita ejecutar en post.html
  posts.forEach(post => container.appendChild(createPostCard(post)));
}

// -------------------
// Renderizado de un post individual en post.html
// -------------------
async function renderSinglePost(posts) {
  const container = document.getElementById("post-content");
  if (!container) return; // Evita ejecutar en index.html

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("id");
  const post = posts.find(p => p.slug === slug);

  if (post) {
    document.getElementById("post-title").textContent = post.title;
    const res = await fetch(post.file);
    const md = await res.text();
    container.innerHTML = marked.parse(md);
  } else {
    document.getElementById("post-container").innerHTML = "<p>Post no encontrado.</p>";
  }
}

// -------------------
// Carga inicial
// -------------------
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();

  // Cargar datos desde posts.json
  const res = await fetch("posts.json");
  const posts = await res.json();

  renderPostCards(posts);
  renderSinglePost(posts);
});

document.addEventListener("DOMContentLoaded", () => {
  // Activa el fade-in
  requestAnimationFrame(() => {
    document.body.classList.add("visible");
  });
});
