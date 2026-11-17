// Imagem de reserva: se a capa de um jogo não for encontrada, mostra um controle genérico
document.querySelectorAll(".imagem-jogo").forEach(function (imagem) {
  imagem.addEventListener("error", function () {
    if (!imagem.src.includes("capa-reserva.svg")) imagem.src = "./assets/capa-reserva.svg";
  });
  if (imagem.complete && imagem.naturalWidth === 0) imagem.src = "./assets/capa-reserva.svg";
});

const botoesMemoria = document.querySelectorAll(".botao-memoria");
botoesMemoria.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const memoria = botao.nextElementSibling;
    const abrir = memoria.hidden;
    memoria.hidden = !abrir;
    botao.textContent = abrir ? "Esconder memória −" : "Ler minha memória +";
    botao.setAttribute("aria-expanded", String(abrir));
  });
});

const campoBusca = document.querySelector("#busca-jogo");
const cartoes = document.querySelectorAll(".cartao-jogo");
const contador = document.querySelector("#total-jogos");
const avisoSemResultados = document.querySelector("#sem-resultados");

if (campoBusca && contador) {
  contador.textContent = cartoes.length;

  campoBusca.addEventListener("input", function () {
    const pesquisa = campoBusca.value.trim().toLowerCase();
    let encontrados = 0;

    cartoes.forEach(function (cartao) {
      const nome = cartao.querySelector("h3").textContent.toLowerCase();
      const genero = cartao.querySelector(".genero").textContent.toLowerCase();
      const corresponde = nome.includes(pesquisa) || genero.includes(pesquisa);
      cartao.hidden = !corresponde;
      if (corresponde) encontrados++;
    });

    contador.textContent = encontrados;
    avisoSemResultados.hidden = encontrados !== 0;
  });
}