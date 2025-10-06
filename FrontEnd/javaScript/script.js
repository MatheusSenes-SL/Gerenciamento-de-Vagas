// Função que carrega o header em qualquer página
function carregarHeader() {
  fetch("essenciais/header.html")
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML("afterbegin", data);
    })
    .catch(error => console.error("Erro ao carregar header:", error));
}

// Executa quando a página terminar de carregar
window.addEventListener("DOMContentLoaded", carregarHeader);

function carregarFooter() {
  fetch("essenciais/footer.html")
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML("beforeend", data);
    })
    .catch(error => console.error("Erro ao carregar footer:", error));
}

// Executa quando a página terminar de carregar
window.addEventListener("DOMContentLoaded", carregarFooter);