// Dashboard: busca os favoritos do usuário no banco (rotas /favoritos)
// e monta os indicadores, os dois gráficos e a lista de jogos.

const idUsuario = sessionStorage.ID_USUARIO;

// Cores da identidade do site (uma cor só: cada gráfico tem uma única série)
const COR_BARRA = "#79c9ff";
const COR_BARRA_HOVER = "#a9dcff";
const COR_TEXTO = "#abb8d1";
const COR_GRADE = "#2a375166";

// Nomes curtos das plataformas (eixo do gráfico e cards da lista)
const SIGLAS = {
  "PlayStation 2": "PS2",
  "PlayStation 3": "PS3",
  "PlayStation 4": "PS4",
  "PlayStation 5": "PS5",
  "PC": "PC",
};

let graficoPlataformas = null;
let graficoGeneros = null;

document.getElementById("nome-usuario").textContent =
  (sessionStorage.NOME_USUARIO || "player").split(" ")[0];

function sair() {
  sessionStorage.clear();
  window.location = "index.html";
}

function buscarJson(url) {
  return fetch(url).then(function (resposta) {
    if (!resposta.ok) throw new Error(`Erro ${resposta.status} em ${url}`);
    return resposta.json();
  });
}

function carregarDashboard() {
  Promise.all([
    buscarJson(`/favoritos/listar/${idUsuario}`),
    buscarJson(`/favoritos/plataformas/${idUsuario}`),
    buscarJson(`/favoritos/generos/${idUsuario}`),
  ])
    .then(function ([favoritos, porPlataforma, porGenero]) {
      const semFavoritos = favoritos.length == 0;
      document.getElementById("dash-vazio").hidden = !semFavoritos;
      document.getElementById("dash-graficos").hidden = semFavoritos;
      document.getElementById("dash-lista").hidden = semFavoritos;

      atualizarKpis(favoritos, porPlataforma, porGenero);
      if (!semFavoritos) {
        desenharGraficoPlataformas(porPlataforma);
        desenharGraficoGeneros(porGenero);
        preencherTabela("tabela-plataformas", porPlataforma, "plataforma");
        preencherTabela("tabela-generos", porGenero, "genero");
        mostrarListaFavoritos(favoritos);
      }
    })
    .catch(function (erro) {
      console.log("#ERRO na dashboard:", erro);
      document.getElementById("kpi-total").textContent = "!";
      document.getElementById("kpi-plataforma").textContent = "Erro ao carregar";
      document.getElementById("kpi-genero").textContent = "Erro ao carregar";
    });
}

function atualizarKpis(favoritos, porPlataforma, porGenero) {
  document.getElementById("kpi-total").textContent = favoritos.length;

  if (favoritos.length == 0) {
    document.getElementById("kpi-plataforma").textContent = "–";
    document.getElementById("kpi-genero").textContent = "–";
    return;
  }

  // Plataforma com mais favoritos (em empate, vale a primeira na linha do tempo)
  let maior = porPlataforma[0];
  porPlataforma.forEach((item) => {
    if (Number(item.total) > Number(maior.total)) maior = item;
  });
  document.getElementById("kpi-plataforma").textContent = maior.plataforma;

  // porGenero já vem ordenado do maior para o menor pelo SQL
  document.getElementById("kpi-genero").textContent = porGenero[0].genero;
}

// Calcula quanto cada item representa do total de favoritos, em porcentagem.
// Ex.: 3 favoritos de um total de 10 = 30%.
function calcularPorcentagens(dados) {
  let soma = 0;
  for (let i = 0; i < dados.length; i++) {
    soma += Number(dados[i].total);
  }

  const porcentagens = [];
  for (let i = 0; i < dados.length; i++) {
    if (soma == 0) {
      porcentagens.push(0);
    } else {
      // arredonda para 1 casa decimal (ex.: 33.3)
      porcentagens.push(Math.round((Number(dados[i].total) / soma) * 1000) / 10);
    }
  }
  return porcentagens;
}

function opcoesBase(eixoValoresHorizontal, porcentagens) {
  const eixoValores = {
    beginAtZero: true,
    ticks: { color: COR_TEXTO, precision: 0, stepSize: 1 },
    grid: { color: COR_GRADE },
    border: { display: false },
  };
  const eixoCategorias = {
    ticks: { color: COR_TEXTO, font: { size: 12 } },
    grid: { display: false },
    border: { color: COR_GRADE },
  };

  return {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: eixoValoresHorizontal ? "y" : "x",
    plugins: {
      legend: { display: false }, // uma série só: o título do painel já diz o que é
      tooltip: {
        backgroundColor: "#0b1426",
        borderColor: "#354560",
        borderWidth: 1,
        titleColor: "#f3f6ff",
        bodyColor: "#f3f6ff",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (ctx) => {
            const valor = eixoValoresHorizontal ? ctx.parsed.x : ctx.parsed.y;
            return `${valor} ${valor == 1 ? "jogo favorito" : "jogos favoritos"} (${porcentagens[ctx.dataIndex]}%)`;
          },
        },
      },
    },
    scales: eixoValoresHorizontal
      ? { x: eixoValores, y: eixoCategorias }
      : { x: eixoCategorias, y: eixoValores },
  };
}

function estiloBarras() {
  return {
    backgroundColor: COR_BARRA,
    hoverBackgroundColor: COR_BARRA_HOVER,
    borderRadius: 4,
    borderSkipped: "start", // arredonda só a ponta da barra
    maxBarThickness: 46,
  };
}

// Gráfico 1: barras verticais, na ordem da linha do tempo (PS2 -> PC)
function desenharGraficoPlataformas(dados) {

  if (graficoPlataformas) graficoPlataformas.destroy();

  graficoPlataformas = new Chart(document.getElementById("grafico-plataformas"), {
    type: "bar",
    data: {
      labels: dados.map((d) => SIGLAS[d.plataforma] || d.plataforma),
      datasets: [{ label: "Favoritos", data: dados.map((d) => Number(d.total)), ...estiloBarras() }],
    },
    options: opcoesBase(false, calcularPorcentagens(dados)),
  });
}

// Gráfico 2: barras horizontais em ranking (do gênero mais jogado para o menos)
function desenharGraficoGeneros(dados) {
  if (graficoGeneros) graficoGeneros.destroy();

  graficoGeneros = new Chart(document.getElementById("grafico-generos"), {
    type: "bar",
    data: {
      labels: dados.map((d) => d.genero),
      datasets: [{ label: "Favoritos", data: dados.map((d) => Number(d.total)), ...estiloBarras() }],
    },
    options: opcoesBase(true, calcularPorcentagens(dados)),
  });
}

function preencherTabela(idTabela, dados, campoNome) {
  const corpo = document.getElementById(idTabela);
  const porcentagens = calcularPorcentagens(dados);
  corpo.innerHTML = "";
  dados.forEach(function (item, indice) {
    const linha = document.createElement("tr");
    const nome = document.createElement("td");
    const total = document.createElement("td");
    const porcentagem = document.createElement("td");
    nome.textContent = item[campoNome];
    total.textContent = item.total;
    porcentagem.textContent = `${porcentagens[indice]}%`;
    linha.append(nome, total, porcentagem);
    corpo.appendChild(linha);
  });
}

function mostrarListaFavoritos(favoritos) {
  const lista = document.getElementById("lista-favoritos");
  lista.innerHTML = "";

  favoritos.forEach(function (jogo) {
    const card = document.createElement("article");
    card.className = "favorito-card";

    // Faixa com a sigla da plataforma (o banco não guarda imagem dos jogos)
    const faixa = document.createElement("div");
    faixa.className = "favorito-faixa";
    faixa.textContent = SIGLAS[jogo.plataforma] || jogo.plataforma;
    faixa.title = jogo.plataforma;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "favorito-remover";
    botao.textContent = "★";
    botao.title = "Remover dos favoritos";
    botao.setAttribute("aria-label", `Remover ${jogo.titulo} dos favoritos`);
    botao.addEventListener("click", () => removerFavorito(jogo.idJogo, botao));

    const info = document.createElement("div");
    info.className = "favorito-info";
    const titulo = document.createElement("h3");
    titulo.textContent = jogo.titulo;
    const detalhes = document.createElement("p");
    detalhes.className = "tag-genero";
    detalhes.textContent = jogo.genero;
    info.append(titulo, detalhes);

    card.append(faixa, botao, info);
    lista.appendChild(card);
  });
}

function removerFavorito(idJogo, botao) {
  botao.disabled = true;
  fetch("/favoritos/remover", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idUsuarioServer: idUsuario, idJogoServer: idJogo }),
  })
    .then(function (resposta) {
      if (!resposta.ok) throw new Error("Status " + resposta.status);
      carregarDashboard(); // busca tudo de novo no banco e redesenha os gráficos
    })
    .catch(function (erro) {
      console.log("#ERRO ao remover favorito:", erro);
      botao.disabled = false;
    });
}

if (idUsuario) {
  carregarDashboard();
}
