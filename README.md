<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f325f,100:123d72&height=120&section=header" alt="" width="100%" />

# 🎮 MemoryCard

**A vida passa. Os jogos ficam.**

O **MemoryCard** é um projeto pessoal e acadêmico que transforma minha trajetória com videogames em uma máquina do tempo interativa. Cada plataforma representa um capítulo da minha história e reúne os jogos, as descobertas e as memórias que marcaram diferentes fases da minha vida.

Mais do que listar títulos, a proposta é mostrar como os jogos também guardam lembranças de pessoas, lugares e momentos especiais.

## 🕹️ Explore os capítulos

A página inicial apresenta cinco capítulos em sequência vertical. Ao clicar em **“Entrar na era”**, o visitante acessa a página da plataforma escolhida:

| Capítulo | Plataforma | Tema |
| --- | --- | --- |
| 01 | PlayStation 2 | Onde tudo começou |
| 02 | PlayStation 3 | Uma nova geração |
| 03 | PlayStation 4 | Histórias que cresceram |
| 04 | PlayStation 5 | O próximo nível |
| 05 | PC | Um universo sem limites |

Cada plataforma tem uma identidade visual própria, enquanto os componentes de navegação e os cards mantêm um padrão de uso.

## ✨ Funcionalidades atuais

- **Home com capítulos verticais:** navegação entre PS2, PS3, PS4, PS5 e PC.
- **Páginas individuais:** apresentação e galeria de jogos em cada plataforma.
- **Cards de jogos:** imagem, nome, gênero, descrição e memória pessoal.
- **Memórias expansíveis:** botão para mostrar ou esconder uma lembrança.
- **Busca em tempo real:** filtro de jogos por nome ou gênero dentro de cada plataforma.
- **Contador automático:** informa quantos cards correspondem à busca.
- **Identidade visual por plataforma:** cores e atmosfera próprias, com CSS separado.
- **Layout responsivo:** adaptação para diferentes tamanhos de tela.
- **Cadastro e login:** formulários com validação em JavaScript, gravando e consultando o banco pela API.
- **Favoritos:** estrela ☆/★ nos cards para salvar os jogos que marcaram a sua vida.
- **Dashboard:** indicadores e gráficos dos favoritos por plataforma e por gênero, com a porcentagem de cada um no total.

## 🛠️ Tecnologias utilizadas

- **HTML5:** estrutura semântica e conteúdo das páginas.
- **CSS3:** estilos, responsividade e temas das plataformas.
- **JavaScript:** interatividade dos cards, busca, contagem, validações e imagens de reserva.
- **Node.js + Express:** API com rotas, controllers e models (arquitetura do web-data-viz).
- **MySQL:** banco `memorycard` com usuários, plataformas, gêneros, jogos e favoritos.
- **Chart.js:** gráficos da dashboard.

## ▶️ Como executar

1. Rode o script `banco-de-dados/script-tabelas.sql` no MySQL.
2. Copie `site-institucional/.env.example` para `.env` (e `.env.dev`) e preencha os dados do seu banco.
3. Na pasta `site-institucional`, rode `npm install` e depois `npm start` (ou `npm run dev`).

## 💙 Sobre o projeto

O MemoryCard nasceu da ideia de que videogames são mais do que entretenimento: eles também fazem parte da nossa história. Uma partida com a família, uma tarde com amigos ou um jogo que parecia impossível de terminar podem se tornar lembranças para a vida inteira.

**Cada plataforma é uma era. Cada jogo é uma memória salva.**

---

*Projeto individual em desenvolvimento para fins de aprendizado e apresentação acadêmica.*

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:123d72,100:0f325f&height=110&section=footer" alt="" width="100%" />
