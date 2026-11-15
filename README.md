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

> **Estado atual:** o front-end funciona com conteúdo escrito diretamente nos arquivos HTML. A API, o banco de dados e a dashboard fazem parte das próximas etapas e **ainda não estão implementados**.

## 🛠️ Tecnologias utilizadas

- **HTML5:** estrutura semântica e conteúdo das páginas.
- **CSS3:** estilos, responsividade e temas das plataformas.
- **JavaScript:** interatividade dos cards, busca, contagem e imagens de reserva.

Nesta etapa, o projeto não depende de frameworks, instalação de pacotes ou servidor back-end.

## 📁 Estrutura do projeto

```text
memorycard/
├── index.html                 # Página inicial e os cinco capítulos
├── paginas/
│   ├── ps2.html               # Jogos e memórias do PlayStation 2
│   ├── ps3.html               # Modelo do PlayStation 3
│   ├── ps4.html               # Modelo do PlayStation 4
│   ├── ps5.html               # Modelo do PlayStation 5
│   └── pc.html                # Modelo do PC
├── css/
│   ├── style.css              # Estilos gerais e da Home
│   ├── plataformas.css        # Componentes comuns das páginas
│   ├── ps2.css                # Tema do PS2
│   ├── ps3.css                # Tema do PS3
│   ├── ps4.css                # Tema do PS4
│   ├── ps5.css                # Tema do PS5
│   └── pc.css                 # Tema do PC
├── js/
│   └── script.js              # Interações compartilhadas
├── imagens/                   # Ilustrações e capas dos jogos
├── LEIA-ME.txt                # Instruções rápidas da versão inicial
└── README.md                  # Documentação do projeto
```

## 🚀 Como executar

1. Baixe ou clone os arquivos do projeto.
2. Abra a pasta `memorycard` no **Visual Studio Code** ou em outro editor.
3. Abra `index.html` no navegador. Se preferir, use a extensão **Live Server** do VS Code.
4. Na Home, escolha um capítulo e clique em **“Entrar na era”**.

**Não é necessário instalar Node.js ou configurar um banco de dados para executar esta versão.**

## 📝 Como adicionar um jogo

1. Abra a página desejada, por exemplo, `paginas/ps3.html`.
2. Localize a seção `<div class="grade-jogos">`.
3. Copie um bloco completo `<article class="cartao-jogo"> ... </article>` e cole dentro dessa grade.
4. Substitua a capa, o gênero, o nome, o resumo e sua memória.
5. Salve o arquivo e atualize o navegador.

Modelo de card:

```html
<article class="cartao-jogo">
  <img
    class="imagem-jogo"
    src="../imagens/meu-jogo.jpg"
    alt="Capa do meu jogo"
    loading="lazy"
  >

  <div class="conteudo-jogo">
    <span class="genero">Aventura</span>
    <h3>Nome do jogo</h3>
    <p class="resumo">Uma descrição curta sobre o jogo.</p>

    <button class="botao-memoria" type="button" aria-expanded="false">
      Ler minha memória +
    </button>
    <p class="memoria" hidden>
      Minha lembrança especial com esse jogo.
    </p>
  </div>
</article>
```

A imagem `meu-jogo.jpg` deve estar na pasta `imagens/`. Como as páginas dos consoles estão dentro de `paginas/`, o caminho utiliza `../imagens/`.

A busca, a contagem e o botão de memória continuam funcionando ao adicionar cards com essas classes. **Não é necessário alterar o `script.js` a cada novo jogo.**

### Personalizando uma plataforma

Os estilos compartilhados estão em `css/plataformas.css`, enquanto as cores e os detalhes de cada geração ficam nos arquivos `css/ps2.css`, `css/ps3.css`, `css/ps4.css`, `css/ps5.css` e `css/pc.css`.

Isso permite modificar o tema do PS3, por exemplo, sem alterar o visual das demais páginas.

## 💙 Sobre o projeto

O MemoryCard nasceu da ideia de que videogames são mais do que entretenimento: eles também fazem parte da nossa história. Uma partida com a família, uma tarde com amigos ou um jogo que parecia impossível de terminar podem se tornar lembranças para a vida inteira.

**Cada plataforma é uma era. Cada jogo é uma memória salva.**

---

*Projeto individual em desenvolvimento para fins de aprendizado e apresentação acadêmica.*
