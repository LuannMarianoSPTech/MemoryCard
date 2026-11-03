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