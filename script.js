// Lista de posts
const posts = [
  { title: "Bienvenido a mi blog", file: "posts/post1.md" },
  { title: "Segundo post retro", file: "posts/post2.md" }
];

const container = document.getElementById("posts");

async function loadPosts() {
  for (let post of posts) {
    const res = await fetch(post.file);
    const md = await res.text();
    const html = marked.parse(md); // Convierte Markdown a HTML

    const article = document.createElement("article");
    article.classList.add("post");
    article.innerHTML = `<h2>${post.title}</h2>${html}`;
    container.appendChild(article);
  }
}

// Cargar biblioteca de Markdown y luego posts
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
script.onload = loadPosts;
document.body.appendChild(script);

function setTheme(theme) {
  document.body.className = theme; // "theme-synthwave" o "theme-hacker"
}

// Opcional: establecer un tema inicial
setTheme(""); // Retro 2000 por defecto
