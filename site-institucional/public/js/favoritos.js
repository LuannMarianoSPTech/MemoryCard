// Favoritar jogos (estrela nos cards das páginas ps2, ps3, ps4 e ps5)
// Os favoritos ficam salvos no banco, na tabela "favorito" (N:N usuario x jogo).

const idUsuarioLogado = sessionStorage.ID_USUARIO;
const botoesFavoritar = document.querySelectorAll(".botao-favoritar");

function mostrarAvisoFavorito(htmlMensagem) {
  let aviso = document.querySelector(".aviso-favorito");
  if (!aviso) {
    aviso = document.createElement("div");
    aviso.className = "aviso-favorito";
    aviso.setAttribute("role", "status");
    document.body.appendChild(aviso);
  }
  aviso.innerHTML = htmlMensagem;
  aviso.hidden = false;
  clearTimeout(aviso.timer);
  aviso.timer = setTimeout(() => (aviso.hidden = true), 3500);
}

function pintarEstrela(botao, favoritado) {
  const titulo = botao.closest(".cartao-jogo").querySelector("h3").textContent;
  botao.setAttribute("aria-pressed", String(favoritado));
  botao.textContent = favoritado ? "★" : "☆";
  botao.title = favoritado ? "Remover dos favoritos" : "Favoritar";
  botao.setAttribute(
    "aria-label",
    (favoritado ? "Remover dos favoritos: " : "Favoritar ") + titulo
  );
}

// Ao abrir a página, marca as estrelas dos jogos que o usuário já favoritou
function carregarFavoritos() {
  if (!idUsuarioLogado) return;

  fetch(`/favoritos/listar/${idUsuarioLogado}`)
    .then((resposta) => (resposta.ok ? resposta.json() : []))
    .then((favoritos) => {
      const ids = favoritos.map((jogo) => String(jogo.idJogo));
      botoesFavoritar.forEach((botao) => {
        const idJogo = botao.closest(".cartao-jogo").dataset.idJogo;
        pintarEstrela(botao, ids.includes(idJogo));
      });
    })
    .catch((erro) => console.log("#ERRO ao carregar favoritos:", erro));
}

botoesFavoritar.forEach(function (botao) {
  botao.addEventListener("click", function () {
    if (!idUsuarioLogado) {
      mostrarAvisoFavorito(
        'Entre na sua conta para favoritar jogos. <a href="login.html">Fazer login</a>'
      );
      return;
    }

    const idJogo = botao.closest(".cartao-jogo").dataset.idJogo;
    const jaFavoritado = botao.getAttribute("aria-pressed") == "true";

    botao.disabled = true;

    fetch(`/favoritos/${jaFavoritado ? "remover" : "adicionar"}`, {
      method: jaFavoritado ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idUsuarioServer: idUsuarioLogado,
        idJogoServer: idJogo,
      }),
    })
      .then(function (resposta) {
        if (!resposta.ok) throw new Error("Status " + resposta.status);
        pintarEstrela(botao, !jaFavoritado);
        mostrarAvisoFavorito(
          jaFavoritado
            ? "Jogo removido dos favoritos."
            : 'Jogo favoritado! Veja na sua <a href="dashboard.html">dashboard</a>.'
        );
      })
      .catch(function (erro) {
        console.log("#ERRO ao favoritar:", erro);
        mostrarAvisoFavorito("Não foi possível salvar o favorito. Tente novamente.");
      })
      .finally(() => (botao.disabled = false));
  });
});

carregarFavoritos();
