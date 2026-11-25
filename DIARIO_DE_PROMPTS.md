# Diário de Prompts – MemoryCard

---

### 03/11 – Botão "Ler minha memória"
- **Pedi:** ajuda para fazer o texto da memória de cada jogo abrir e fechar com um botão.
- **Mudou:** função no `script.js` que mostra e esconde a memória ao clicar em `.botao-memoria`, trocando o texto do botão.
- **Como explico:** a memória fica logo depois do botão (`nextElementSibling`). Ao clicar, eu inverto o `hidden` e o texto muda entre "Ler minha memória +" e "Esconder memória −".

### 03/11 – Busca de jogos
- **Pedi:** ajuda para criar uma busca que filtrasse os jogos da página.
- **Mudou:** campo `#busca-jogo` no `script.js` que filtra os cards por nome ou gênero, mostra quantos jogos apareceram (`#total-jogos`) e um aviso quando nenhum é encontrado.
- **Como explico:** a cada letra digitada (evento `input`), passo por todos os cards com `forEach`. Se o nome ou o gênero tem o texto pesquisado (`includes`), o card aparece e o contador soma 1. Uso `toLowerCase()` para não diferenciar maiúscula de minúscula.

### 13/11 – Projeto dentro do web-data-viz
- **Pedi:** ajuda para colocar meu site dentro da estrutura do web-data-viz da aula.
- **Mudou:** as páginas foram para `site-institucional/public`, as imagens de `img/` para `public/assets` e os CSS e JS para `public/css` e `public/js`. Os caminhos no HTML foram ajustados, e o login e o registro do modelo entraram no projeto.
- **Como explico:** o `app.js` usa o Express para servir a pasta `public`, então todo o front fica lá. O back fica no `src`, dividido em routes, controllers e models.

### 16/11 – Favoritar jogos (estrela)
- **Pedi:** ajuda para trocar a estrela fixa no título dos jogos por um botão que salva o favorito no banco.
- **Mudou:**
  - `favoritos.js` no front: a estrela vira ★/☆, e quem não está logado recebe um aviso com link para o login;
  - rotas em `routes/favoritos.js` (listar, adicionar, remover e contagens da dashboard), com `favoritoController.js` e `favoritoModel.js`;
  - tabela `favorito`, ligando usuário e jogo (N:N).
- **Como explico:** quando a página abre, o `carregarFavoritos()` busca os favoritos do usuário pelo `ID_USUARIO` do `sessionStorage` e pinta as estrelas. Ao clicar, ele faz um `POST` para adicionar ou um `DELETE` para remover.

### 16/11 – CSS das telas de login e registro
- **Pedi:** ajuda no CSS porque o card do registro ficava cortado e precisava rolar a tela.
- **Mudou:**
  - o registro ocupa a altura da tela (`height: 100vh`) e o card fica centralizado, sem rolagem (`style.css`);
  - o formulário do registro ficou em duas colunas com `grid`; os campos maiores e o botão ocupam a linha inteira (`grid-column: 1 / -1`);
  - `@media` para notebooks com tela baixa, que deixa o card mais compacto;
  - popup de aviso (`.auth-popup`) com as cores do site, no lugar do popup antigo do modelo (`login.html`, `registro.html`).
- **Como explico:** o `:has(.auth-area-registro)` aplica o estilo só na página de registro. O grid divide o formulário em duas colunas, e o popup só aparece quando ganha a classe `ativo`.

### 16/11 – Botão "Acessar Dashboard" no cabeçalho
- **Pedi:** ajuda para destacar o link da dashboard no menu.
- **Mudou:** classe `.botao-dashboard` em `style.css`, com fundo na cor principal e efeito de subir no hover. Também entrou um `@media` para o menu quebrar linha no celular.
- **Como explico:** o `transform: translateY(-2px)` sobe o botão um pouco quando passo o mouse, e o `filter: brightness` deixa ele mais claro.

### 17/11 – Funções JS do registro
- **Pedi:** ajuda para trocar as funções do `registro.js`, que ainda eram do modelo da aula (empresa, CNPJ, CPF).
- **Mudou:**
  - os campos agora são nome, e-mail, telefone, senha e confirmação, e o `fetch` manda `nomeServer`, `emailServer`, `telefoneServer` e `senhaServer`;
  - o nome precisa ter nome e sobrenome (`split(' ')`);
  - o telefone precisa ter 11 dígitos e só números, conferidos com um `for`;
  - corrigi a validação de maiúscula/minúscula, que estava invertida;
  - se o e-mail já existe, o back devolve status 409 (`usuarioController.js`) e aparece o popup "Já existe uma conta cadastrada com este e-mail".
- **Como explico:** cada campo tem uma mensagem embaixo. Se algum dá erro, o `flagError` vira `true` e o `cadastrar()` não é chamado. Para a senha, se `senha !== senha.toLowerCase()`, é porque tem pelo menos uma letra maiúscula.

### 17/11 – Funções JS do login
- **Pedi:** ajuda para ajustar o `login.js` ao meu banco, porque ele salvava dados que não existem no projeto (`NOME_CLIENTE`, `FK_CLIENTE`).
- **Mudou:** o login salva `ID_USUARIO`, `EMAIL_USUARIO`, `NOME_USUARIO` e `TELEFONE_USUARIO` no `sessionStorage` e redireciona para `dashboard.html` (antes era `dashboard-geral.html`). Os avisos de erro aparecem no popup (`mostrarPopup`).
- **Como explico:** quando o `/usuarios/autenticar` responde OK, eu leio o JSON e guardo os dados do usuário no `sessionStorage`. A dashboard e os favoritos usam o `ID_USUARIO` para saber quem está logado.

### 19/11 – Documentação
- **Pedi:** ajuda para fazer ajustes da documentação do projeto.
- **Usei:** o documento que saiu, como base da documentação.
- **Mudou no código:** nada.

### 19/11 – Requisitos da Aula 09
- **Pedi:** que conferisse o projeto com o PDF da Aula 09.
- **Usei:** a lista do que faltava, como checklist das últimas entregas.
- **Mudou no código:** nada.

### 19/11 – Últimos ajustes
- **Pedi:** ajuda com os ajustes que ainda faltavam.
- **Mudou:**
  - porcentagem de cada plataforma e gênero na dashboard (`dashboard.js`, `dashboard.html`, `dashboard.css`);
  - README atualizado, `.env.example` criado e `.env.dev` no `.gitignore`;
- **Como explico:** um `for` soma os totais e outro divide cada total pela soma e multiplica por 100. Se a soma for 0, fica 0%.


### 19/11 – Favoritos sem aparecer na dashboard
- **Pedi:** ajuda porque os favoritos não apareciam na dashboard.
- **Descobri:** o banco não tinha os jogos, e o `INSERT IGNORE` escondia o erro.
- **Mudou:** `INSERT IGNORE` virou `INSERT`; o controller trata favorito repetido e jogo que não existe; o aviso na tela mostra o erro. Rodei o script do banco de novo.
- **Como explico:** antes o erro do banco era ignorado. Agora o controller confere o código do erro do MySQL e o front mostra a mensagem.

---

## Modelo para novos registros

### DD/MM – Título
- **Pedi:**
- **Usei:**
- **Mudou:**
- **Como explico:**
