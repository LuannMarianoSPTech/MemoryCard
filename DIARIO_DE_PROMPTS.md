# Diário de Prompts – MemoryCard

---

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
