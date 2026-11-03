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