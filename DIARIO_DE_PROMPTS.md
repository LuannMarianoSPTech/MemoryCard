# Diário de Prompts – MemoryCard

Registro de como usei assistentes de IA no projeto individual: o que pedi, o que usei e o que mudei.
Regra que sigo: só entra no projeto o que eu sei explicar.

## Assistentes utilizados

| Assistente | Para quê |
| --- | --- |
| Claude (Anthropic) – app Claude | Documentação, revisão do projeto contra os requisitos da Aula 09 e ajustes finais |
| _(preencher: outros assistentes usados antes, se houver)_ | |

---

## Registros

### 19/11/2026 – Documentação do projeto
- **Assistente:** Claude
- **Link da conversa:** https://claude.ai/code/session_01PYrYDPxtCXpeWAbWMhVSKf
- **O que pedi:** "gere uma documentação que não seja muitas páginas para meu projeto individual".
- **O que a IA fez:** leu o código (rotas, controllers, models, script SQL e páginas) e escreveu um documento curto com visão geral, tecnologias, arquitetura, banco de dados, rotas da API, funcionalidades, como executar e limitações.
- **O que eu usei / mudei:** usei o documento como base da documentação do projeto. Nenhum arquivo de código foi alterado nesta etapa.

### 19/11/2026 – Revisão contra os requisitos (Aula 09)
- **Assistente:** Claude (mesma conversa)
- **O que pedi:** conferir se o projeto atende ao PDF "Aula 09 – Pesquisa e Inovação – Projeto Individual".
- **O que a IA fez:** comparou cada item do PDF com o projeto e apontou o que faltava: Diário de Prompts, Trello do MemoryCard, VM Linux com o banco, cálculo matemático na dashboard, modelo lógico, apresentação e partes do documento.
- **O que eu usei / mudei:** usei a lista como checklist das últimas entregas.

### 19/11/2026 – Ajustes finais
- **Assistente:** Claude (mesma conversa)
- **O que pedi:** "faça o que ainda precisa ser ajustado".
- **O que mudou no projeto:**
  - `public/js/dashboard.js`: nova função `calcularPorcentagens(dados)`, que soma os totais com um `for` e calcula a porcentagem de cada item em um vetor (`total / soma * 100`, arredondado para 1 casa). A porcentagem aparece no tooltip dos gráficos e numa nova coluna das tabelas.
  - `public/dashboard.html`: coluna "% do total" nas duas tabelas de dados.
  - `public/css/dashboard.css`: números das tabelas alinhados à direita.
  - `README.md`: status atualizado (API, banco e dashboard já funcionam), tecnologias e passo a passo para executar.
  - `.gitignore`: passa a ignorar o `.env.dev`; criado `site-institucional/.env.example` sem senha.
  - `banco-de-dados/modelo-logico.png`: diagrama do modelo lógico gerado a partir do `script-tabelas.sql`.
  - Trello: cartões do cronograma do MemoryCard no quadro do projeto.
  - Documento do projeto: seção de contexto, objetivo e justificativa.
- **Como eu explico o cálculo:** primeiro um `for` percorre o vetor que veio do banco e soma todos os totais. Depois outro `for` divide o total de cada plataforma (ou gênero) pela soma e multiplica por 100. Se a soma for 0, a porcentagem é 0, para não dividir por zero.

### 19/11/2026 – Apresentação para a banca
- **Assistente:** Claude (mesma conversa)
- **O que pedi:** montar os slides da apresentação. Escrevi as respostas das perguntas do socioemocional (interesse pelo tema, valores, dificuldade, superação e gratidão).
- **O que a IA fez:** organizou 14 slides com o projeto (capítulos, site, dashboard, arquitetura, banco, disciplinas, uso de IA) e as minhas respostas, com notas de fala em cada slide.
- **O que eu usei / mudei:** _(preencher depois de revisar: o que você mudou nos slides)_

---

## Modelo para novos registros

### DD/MM/AAAA – Título
- **Assistente:**
- **Link da conversa (se houver):**
- **O que pedi:**
- **O que a IA fez:**
- **O que eu usei / mudei:**
- **Como eu explico:**
